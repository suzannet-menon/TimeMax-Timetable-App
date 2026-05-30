import { startTransition, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import FocusPicker from "../components/FocusPicker"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"
import CommitmentsForm from "../components/CommitmentsForm"
import AvailabilityForm from "../components/AvailabilityForm"
import Schedule from "../components/Schedule"
import { fetchSchedule } from "../utils/api"

function PremiumSection({ title, subtitle, children, action }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.4, md: 3 },
        borderRadius: 6,
        border: "1px solid rgba(226,232,240,0.95)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%)",
        boxShadow: "0 22px 50px rgba(15,23,42,0.05)",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={1.5}
        sx={{ mb: 2.4 }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, mb: 0.5 }}
          >
            {title}
          </Typography>
          <Typography sx={{ color: "text.secondary", lineHeight: 1.7 }}>{subtitle}</Typography>
        </Box>
        {action}
      </Stack>
      {children}
    </Paper>
  )
}

function toDateInputValue(date) {
  const timezoneOffset = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 10)
}

function formatTimeForSchedule(date) {
  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

function formatDateLabel(date) {
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  })
}

function parseDateInput(value) {
  if (!value) return null
  const date = new Date(`${value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? null : date
}

function addDays(date, days) {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + days)
  return nextDate
}

function roundUpToNextQuarter(date) {
  const nextDate = new Date(date)
  nextDate.setSeconds(0, 0)
  const minutes = nextDate.getMinutes()
  const remainder = minutes % 15
  if (remainder) nextDate.setMinutes(minutes + (15 - remainder))
  return nextDate
}

function normalizeTime(hourText, minuteText, periodText) {
  let hour = Number(hourText)
  const minute = minuteText ? Number(minuteText) : 0
  const period = periodText?.toLowerCase()

  if (period === "pm" && hour < 12) hour += 12
  if (period === "am" && hour === 12) hour = 0
  if (hour > 23 || minute > 59) return null

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
}

function findExplicitStartTime(text) {
  const startPattern =
    /\b(?:start|begin|commence)\b(?:\s+(?:my|the|this|schedule|plan|tasks|task|study|work|day|from|at|after|around))*\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/i
  const match = text.match(startPattern)
  return match ? normalizeTime(match[1], match[2], match[3]) : null
}

function getPlanningStart(commitments, availability) {
  const combinedContext = [commitments, availability].filter(Boolean).join("\n")
  const explicitStartTime = findExplicitStartTime(combinedContext)

  if (explicitStartTime) {
    return {
      startTime: explicitStartTime,
      source: "explicit",
    }
  }

  const currentStart = roundUpToNextQuarter(new Date())
  return {
    startTime: `${String(currentStart.getHours()).padStart(2, "0")}:${String(currentStart.getMinutes()).padStart(2, "0")}`,
    source: "current",
  }
}

function getDateRange(tasks) {
  const today = new Date()
  const todayValue = toDateInputValue(today)
  const futureDeadlines = tasks
    .map((task) => parseDateInput(task.deadline))
    .filter((date) => date && date >= parseDateInput(todayValue))

  if (!futureDeadlines.length) {
    return {
      from: todayValue,
      to: toDateInputValue(addDays(today, 6)),
    }
  }

  const latestDeadline = new Date(Math.max(...futureDeadlines.map((date) => date.getTime())))
  return {
    from: todayValue,
    to: toDateInputValue(latestDeadline),
  }
}

function getDatesInRange(dateRange) {
  const startDate = parseDateInput(dateRange.from)
  const endDate = parseDateInput(dateRange.to)
  if (!startDate || !endDate) return []

  const days = []
  for (let date = new Date(startDate); date <= endDate; date = addDays(date, 1)) {
    days.push(new Date(date))
  }
  return days
}

function addMinutesToTime(time, minutesToAdd) {
  const [hours, minutes] = time.split(":").map(Number)
  const date = new Date()
  date.setHours(hours, minutes + minutesToAdd, 0, 0)
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
}

function getTaskPriority(task, currentDate) {
  const deadlineDate = parseDateInput(task.deadline)
  const daysLeft = deadlineDate
    ? Math.ceil((deadlineDate.getTime() - currentDate.getTime()) / 86400000)
    : 99

  const effortScore = {
    high: 0,
    medium: 1,
    low: 2,
  }[task.effort] ?? 1

  return daysLeft * 10 + effortScore
}

function getTasksForDay(tasks, date, dayIndex) {
  return [...tasks]
    .sort((firstTask, secondTask) => getTaskPriority(firstTask, date) - getTaskPriority(secondTask, date))
    .filter((task, taskIndex) => {
      const deadlineDate = parseDateInput(task.deadline)
      if (!deadlineDate) return taskIndex < 5
      const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - date.getTime()) / 86400000)
      return daysUntilDeadline >= 0 && (daysUntilDeadline <= 2 || (taskIndex + dayIndex) % 2 === 0)
    })
    .slice(0, 6)
}

function createFallbackSchedule(tasks, focusminutes, commitments, availability, startTime, dateRange, startSource, failureMessage) {
  const dates = getDatesInRange(dateRange)
  const days = dates.map((date, dayIndex) => {
    const dayTasks = getTasksForDay(tasks, date, dayIndex)
    const blocks = dayTasks.map((task, index) => ({
      time: formatTimeForSchedule(
        parseTimeOnDate(date, addMinutesToTime(dayIndex === 0 ? startTime : "09:00", index * (focusminutes + 15)))
      ),
      duration: `${focusminutes} min`,
      task: task.taskname,
      tip:
        task.energy === "tired"
          ? "Keep this block lighter and give yourself a short reset after it."
          : "Use this as a focused work block and avoid context switching.",
    }))

    return {
      date: formatDateLabel(date),
      schedule: blocks.length
        ? blocks
        : [
            {
              time: formatTimeForSchedule(parseTimeOnDate(date, dayIndex === 0 ? startTime : "09:00")),
              duration: "15 min",
              task: "Review and buffer",
              tip: "Use this space for spillover work, recovery, or checking what changed.",
            },
          ],
    }
  })

  const startMessage =
    startSource === "explicit"
      ? `The preview starts at the time you explicitly mentioned: ${startTime}.`
      : `The preview starts from your current time, rounded to the next planning slot: ${startTime}.`

  return {
    riskSummary: `This preview schedule was generated locally because Gemini was unavailable${failureMessage ? `: ${failureMessage}` : ""}. ${startMessage} It covers ${dateRange.from} to ${dateRange.to}.`,
    warnings: [
      commitments.trim() ? "Your commitments were considered in the summary." : "Add commitments for tighter planning.",
      availability.trim() ? "Availability windows were included in the preview context." : "Add availability windows for more precise time placement.",
    ],
    days,
  }
}

function parseTimeOnDate(date, time) {
  const [hours, minutes] = time.split(":").map(Number)
  const nextDate = new Date(date)
  nextDate.setHours(hours, minutes, 0, 0)
  return nextDate
}

function TimetableApp() {
  const navigate = useNavigate()
  const sessionUser = useMemo(() => {
    const raw = localStorage.getItem("timemax-session-user")
    return raw ? JSON.parse(raw) : null
  }, [])

  const [taskname, setTaskname] = useState("")
  const [deadline, setDeadline] = useState("")
  const [effort, setEffort] = useState("medium")
  const [energy, setEnergy] = useState("moderate")
  const [tasks, setTasks] = useState([])
  const [commitments, setCommitments] = useState("")
  const [availability, setAvailability] = useState("")
  const [focusminutes, setFocusminutes] = useState(45)
  const [schedule, setSchedule] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const addtask = () => {
    if (!taskname.trim()) {
      setError("Add a task name before continuing.")
      return
    }

    const nextTask = {
      taskname: taskname.trim(),
      deadline,
      effort,
      energy,
    }

    setTasks((current) => [...current, nextTask])
    setTaskname("")
    setDeadline("")
    setEffort("medium")
    setEnergy("moderate")
    setError("")
  }

  const removetask = (index) => {
    setTasks((current) => current.filter((_, itemIndex) => itemIndex !== index))
  }

  const edittask = (index, nextTask) => {
    setTasks((current) => current.map((task, itemIndex) => (itemIndex === index ? nextTask : task)))
  }

  const handleLogout = () => {
    localStorage.removeItem("timemax-auth")
    localStorage.removeItem("timemax-session-user")
    navigate("/", { replace: true })
  }

  const generateSchedule = async () => {
    if (!tasks.length) {
      setError("Add at least one task before generating a schedule.")
      return
    }

    setLoading(true)
    setError("")

    const dateRange = getDateRange(tasks)
    const { startTime, source: startSource } = getPlanningStart(commitments, availability)

    try {
      const result = await fetchSchedule(
        tasks,
        focusminutes,
        [commitments, availability].filter(Boolean).join("\n\n"),
        startTime,
        dateRange,
        startSource
      )
      startTransition(() => setSchedule(result))
    } catch (requestError) {
      setError(requestError.message || "TimeMax could not reach Gemini, so a local preview was created instead.")
      startTransition(() =>
        setSchedule(
          createFallbackSchedule(
            tasks,
            focusminutes,
            commitments,
            availability,
            startTime,
            dateRange,
            startSource,
            requestError.message
          )
        )
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #ffffff 0%, #f7faff 42%, #eef4ff 100%)",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(18px)",
          backgroundColor: "rgba(255,255,255,0.76)",
          borderBottom: "1px solid rgba(226,232,240,0.92)",
        }}
      >
        <Container maxWidth="xl" sx={{ py: 1.8 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Box>
              <Typography
                component={Link}
                to="/"
                sx={{
                  fontFamily: '"Space Mono", monospace',
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "#2563eb",
                }}
              >
                TimeMax
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: "0.95rem" }}>
                Premium timetable workspace
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.2} alignItems="center">
              {sessionUser?.name ? (
                <Chip
                  label={`Hi, ${sessionUser.name}`}
                  sx={{
                    bgcolor: "rgba(37,99,235,0.08)",
                    color: "#1d4ed8",
                    fontWeight: 700,
                  }}
                />
              ) : null}
              <Button
                variant="outlined"
                startIcon={<LogoutRoundedIcon />}
                onClick={handleLogout}
                sx={{ borderRadius: 999 }}
              >
                Logout
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 5 } }}>
        <Stack spacing={3}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3.2 },
              borderRadius: 7,
              border: "1px solid rgba(226,232,240,0.95)",
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.96) 100%)",
              color: "white",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at top right, rgba(37,99,235,0.3), transparent 30%)",
              }}
            />
            <Stack
              direction={{ xs: "column", lg: "row" }}
              justifyContent="space-between"
              spacing={3}
              sx={{ position: "relative", zIndex: 1 }}
            >
              <Box sx={{ maxWidth: 900 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Space Mono", monospace',
                    fontWeight: 650,
                    letterSpacing: "-0.04em",
                    mb: 1.4,
                  }}
                >
                  Build a timetable that actually fits your life
                </Typography>
                <Typography sx={{ color: "rgba(226,232,240,0.82)", lineHeight: 1.2 }}>
                  Add tasks, commitments, and focus length and let TimeMax map everything into a polished day-by-day schedule.
                </Typography>
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
                <Chip
                  icon={<TaskAltRoundedIcon />}
                  label={`${tasks.length} task${tasks.length === 1 ? "" : "s"} added`}
                  sx={{ bgcolor: "rgba(255,255,255,0.08)", color: "white" }}
                />
                <Chip
                  icon={<CalendarMonthRoundedIcon />}
                  label={`${focusminutes} min focus blocks`}
                  sx={{ bgcolor: "rgba(255,255,255,0.08)", color: "white" }}
                />
              </Stack>
            </Stack>
          </Paper>

          {error ? <Alert severity="warning">{error}</Alert> : null}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", xl: "1.2fr 0.8fr" },
              gap: 3,
            }}
          >
            <Stack spacing={3}>
              <PremiumSection
                title="Focus settings"
                subtitle="Choose how long a good work session should feel for this plan."
              >
                <FocusPicker focusminutes={focusminutes} setFocusminutes={setFocusminutes} />
              </PremiumSection>

              <PremiumSection
                title="Tasks"
                subtitle="Describe your workload clearly so the schedule can prioritize it well."
              >
                <Stack spacing={3}>
                  <TaskForm
                    taskname={taskname}
                    setTaskname={setTaskname}
                    deadline={deadline}
                    setDeadline={setDeadline}
                    effort={effort}
                    setEffort={setEffort}
                    energy={energy}
                    setEnergy={setEnergy}
                    addtask={addtask}
                  />
                  <Divider />
                  <TaskList tasks={tasks} removetask={removetask} edittask={edittask} />
                </Stack>
              </PremiumSection>

            </Stack>

            <Stack spacing={3}>
              <PremiumSection
                title="Commitments"
                subtitle="Tell TimeMax what parts of the day are already spoken for."
              >
                <CommitmentsForm commitments={commitments} setCommitments={setCommitments} />
              </PremiumSection>

              <PremiumSection
                title="Availability"
                subtitle="Optional detail for tighter scheduling and better placement."
              >
                <AvailabilityForm availability={availability} setAvailability={setAvailability} />
              </PremiumSection>
            </Stack>
          </Box>

          <PremiumSection
            title="Generated schedule"
            subtitle="Generate a full day-by-day plan. TimeMax starts from your current time unless you explicitly write a start time such as 'start at 2 pm'."
            action={
              <Button
                variant="contained"
                onClick={generateSchedule}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <AutoAwesomeRoundedIcon />}
                sx={{
                  borderRadius: 999,
                  px: 2.6,
                  py: 1.15,
                  fontFamily: '"Space Mono", monospace',
                  boxShadow: "0 14px 26px rgba(37,99,235,0.22)",
                }}
              >
                {loading ? "Generating..." : "Generate schedule"}
              </Button>
            }
          >
            <Schedule schedule={schedule} />
            {!schedule ? (
              <Box
                sx={{
                  p: 3.2,
                  borderRadius: 5,
                  border: "1px dashed rgba(148,163,184,0.35)",
                  bgcolor: "rgba(248,250,252,0.72)",
                }}
              >
                <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                  Your generated schedule will use this full-width space once you add a few tasks and click
                  generate.
                </Typography>
              </Box>
            ) : null}
          </PremiumSection>
        </Stack>
      </Container>
    </Box>
  )
}

export default TimetableApp
