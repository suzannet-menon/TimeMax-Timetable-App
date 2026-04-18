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

function createFallbackSchedule(tasks, focusminutes, commitments, availability) {
  const today = new Date()
  const dateLabel = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  })

  const blocks = tasks.slice(0, 5).map((task, index) => ({
    time: `${9 + index * 2}:00`,
    duration: `${focusminutes} min`,
    task: task.taskname,
    tip:
      task.energy === "tired"
        ? "Keep this block lighter and give yourself a short reset after it."
        : "Use this as a focused work block and avoid context switching.",
  }))

  if (!blocks.length) {
    blocks.push(
      {
        time: "09:00",
        duration: `${focusminutes} min`,
        task: "Planning block",
        tip: "Add a few tasks and regenerate to see a fuller AI schedule.",
      },
      {
        time: "10:00",
        duration: "15 min",
        task: "Break",
        tip: "Small resets help keep the rest of the plan sustainable.",
      }
    )
  }

  return {
    riskSummary:
      "This preview schedule was generated locally because no Gemini response was available. The structure still reflects your current tasks and focus settings.",
    warnings: [
      commitments.trim() ? "Your commitments were considered in the summary." : "Add commitments for tighter planning.",
      availability.trim() ? "Availability windows were included in the preview context." : "Add availability windows for more precise time placement.",
    ],
    days: [
      {
        date: dateLabel,
        schedule: blocks,
      },
    ],
  }
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

    const today = new Date().toISOString().slice(0, 10)

    try {
      const result = await fetchSchedule(
        tasks,
        focusminutes,
        [commitments, availability].filter(Boolean).join("\n\n"),
        "09:00",
        { from: today, to: today }
      )
      startTransition(() => setSchedule(result))
    } catch (requestError) {
      setError(requestError.message || "TimeMax could not reach Gemini, so a local preview was created instead.")
      startTransition(() =>
        setSchedule(createFallbackSchedule(tasks, focusminutes, commitments, availability))
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
              <Box sx={{ maxWidth: 760 }}>
                <Chip
                  icon={<AutoAwesomeRoundedIcon sx={{ color: "#60a5fa !important" }} />}
                  label="AI-powered day design"
                  sx={{
                    mb: 2.2,
                    bgcolor: "rgba(96,165,250,0.12)",
                    color: "#bfdbfe",
                    fontWeight: 700,
                  }}
                />
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Space Mono", monospace',
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    mb: 1.4,
                  }}
                >
                  Build a timetable that actually fits your life
                </Typography>
                <Typography sx={{ color: "rgba(226,232,240,0.82)", lineHeight: 1.85 }}>
                  Add tasks, commitments, and focus length. Then let TimeMax map everything into a
                  polished daily schedule.
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

              <PremiumSection
                title="Generated schedule"
                subtitle="Create a day plan with AI, or fall back to a polished local preview if the API is unavailable."
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
                      Your generated schedule will appear here once you add a few tasks and click
                      generate.
                    </Typography>
                  </Box>
                ) : null}
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
        </Stack>
      </Container>
    </Box>
  )
}

export default TimetableApp
