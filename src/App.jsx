import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useMemo, useState } from "react"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import Chip from "@mui/material/Chip"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import Alert from "@mui/material/Alert"
import Divider from "@mui/material/Divider"
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded"
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import BoltRoundedIcon from "@mui/icons-material/BoltRounded"
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded"
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded"
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import { motion } from "framer-motion"

import FocusPicker from "./components/FocusPicker"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import CommitmentsForm from "./components/CommitmentsForm"
import AvailabilityForm from "./components/AvailabilityForm"
import Schedule from "./components/Schedule"
import { fetchSchedule } from "./utils/api"

import "./App.css"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" },
  }),
}

function MotionSection({ children, custom = 0 }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={custom}>
      {children}
    </motion.div>
  )
}

function App() {
  const [taskname, setTaskname] = useState("")
  const [deadline, setDeadline] = useState("")
  const [effort, setEffort] = useState("medium")
  const [energy, setEnergy] = useState("moderate")
  const [tasks, setTasks] = useState([])
  const [focusminutes, setFocusminutes] = useState(45)
  const [schedule, setSchedule] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [commitments, setCommitments] = useState("")
  const [availability, setAvailability] = useState("")
  const [darkMode, setDarkMode] = useState(false)

  const now = new Date()
  const todayStr = now.toISOString().split("T")[0]
  const defaultStartTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`

  const [startTime, setStartTime] = useState(defaultStartTime)
  const [dateFrom, setDateFrom] = useState(todayStr)
  const [dateTo, setDateTo] = useState(todayStr)

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: "#2563eb" },
          background: {
            default: darkMode ? "#0b1220" : "#f6f9ff",
            paper: darkMode ? "#111827" : "#ffffff",
          },
          text: {
            primary: darkMode ? "#e5e7eb" : "#0f172a",
            secondary: darkMode ? "#94a3b8" : "#475569",
          },
        },
        shape: {
          borderRadius: 18,
        },
        typography: {
          fontFamily: "'Roboto', sans-serif",
          h1: { fontFamily: "'Space Mono', monospace", fontWeight: 700 },
          h2: { fontFamily: "'Space Mono', monospace", fontWeight: 700 },
          h3: { fontFamily: "'Space Mono', monospace", fontWeight: 700 },
          h4: { fontFamily: "'Space Mono', monospace", fontWeight: 700 },
          h5: { fontFamily: "'Space Mono', monospace", fontWeight: 700 },
          h6: { fontFamily: "'Space Mono', monospace", fontWeight: 700 },
          button: { textTransform: "none", fontWeight: 700 },
        },
        components: {
          MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
              root: {
                borderRadius: 999,
                fontFamily: "'Space Mono', monospace",
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
          MuiTextField: {
            defaultProps: {
              fullWidth: true,
              size: "small",
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 999,
              },
            },
          },
        },
      }),
    [darkMode]
  )

  const addtask = () => {
    if (!taskname.trim()) return
    const newTask = { taskname, deadline, effort, energy }
    setTasks((prev) => [...prev, newTask])
    setTaskname("")
    setDeadline("")
  }

  const removetask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index))
  }

  const edittask = (index, updatedTask) => {
    setTasks((prev) => {
      const next = [...prev]
      next[index] = updatedTask
      return next
    })
  }

  const generateschedule = async () => {
    if (loading || tasks.length === 0) return

    const combinedContext = [commitments, availability ? `Availability:\n${availability}` : ""]
      .filter(Boolean)
      .join("\n\n")

    setLoading(true)
    setError(null)
    setSchedule(null)

    try {
      const result = await fetchSchedule(tasks, focusminutes, combinedContext, startTime, {
        from: dateFrom,
        to: dateTo,
      })
      setSchedule(result)
    } catch (err) {
      console.error(err)
      setError(err.message || "Something went wrong while generating your schedule.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className="app-shell">
        <div className="app-frame">
          <MotionSection custom={0}>
            <div className="app-topbar">
              <div className="app-brand-card">
                <div className="app-brand-row">
                  <Box>
                    <Stack direction="row" spacing={1.1} alignItems="center" flexWrap="wrap">
                      <Chip
                        label="AI timetable manager"
                        sx={{
                          bgcolor: darkMode ? "rgba(37,99,235,0.18)" : "#dbeafe",
                          color: "#2563eb",
                          fontWeight: 700,
                          fontFamily: "'Space Mono', monospace",
                        }}
                      />
                      <Chip
                        label={darkMode ? "Dark mode" : "Light mode"}
                        variant="outlined"
                        sx={{ fontFamily: "'Space Mono', monospace" }}
                      />
                    </Stack>

                    <Typography className="app-title">TimeMax</Typography>

                    <Typography className="app-subtitle">
                      Build practical schedules around your real day. Add tasks, enter deadlines,
                      describe commitments, set focus windows, and let AI plan something realistic.
                    </Typography>
                  </Box>

                  <IconButton
                    onClick={() => setDarkMode((prev) => !prev)}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "background.paper",
                      width: 48,
                      height: 48,
                    }}
                  >
                    {darkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
                  </IconButton>
                </div>
              </div>

              <div className="app-stat-card">
                <Typography
                  sx={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.85rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    opacity: 0.82,
                    mb: 1.5,
                  }}
                >
                  Session overview
                </Typography>

                <Stack spacing={1.25}>
                  <Paper elevation={0} sx={{ p: 1.5, bgcolor: "rgba(255,255,255,0.12)", color: "white" }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography>Tasks</Typography>
                      <Typography fontWeight={700}>{tasks.length}</Typography>
                    </Stack>
                  </Paper>

                  <Paper elevation={0} sx={{ p: 1.5, bgcolor: "rgba(255,255,255,0.12)", color: "white" }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography>Focus block</Typography>
                      <Typography fontWeight={700}>{focusminutes} min</Typography>
                    </Stack>
                  </Paper>

                  <Paper elevation={0} sx={{ p: 1.5, bgcolor: "rgba(255,255,255,0.12)", color: "white" }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography>Planning range</Typography>
                      <Typography fontWeight={700}>{dateFrom === dateTo ? "1 day" : "Custom"}</Typography>
                    </Stack>
                  </Paper>
                </Stack>
              </div>
            </div>
          </MotionSection>

          <div className="app-grid">
            <div className="app-main-column">
              <MotionSection custom={1}>
                <div className="panel-card">
                  <div className="panel-card-inner">
                    <div className="panel-eyebrow">Planning period</div>
                    <div className="panel-heading-row">
                      <CalendarMonthRoundedIcon sx={{ color: "#2563eb" }} />
                      <Typography variant="h6">Set the time window</Typography>
                    </div>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                      <Box flex={1}>
                        <Typography variant="caption" color="text.secondary" display="block" mb={0.75}>
                          From
                        </Typography>
                        <TextField type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                      </Box>

                      <Box flex={1}>
                        <Typography variant="caption" color="text.secondary" display="block" mb={0.75}>
                          To
                        </Typography>
                        <TextField type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                      </Box>

                      <Box flex={1}>
                        <Typography variant="caption" color="text.secondary" display="block" mb={0.75}>
                          Start time on first day
                        </Typography>
                        <TextField type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                      </Box>
                    </Stack>
                  </div>
                </div>
              </MotionSection>

              <MotionSection custom={2}>
                <div className="panel-card">
                  <div className="panel-card-inner">
                    <div className="panel-eyebrow">Focus setup</div>
                    <div className="panel-heading-row">
                      <BoltRoundedIcon sx={{ color: "#2563eb" }} />
                      <Typography variant="h6">Choose how you work best</Typography>
                    </div>
                    <FocusPicker focusminutes={focusminutes} setFocusminutes={setFocusminutes} />
                  </div>
                </div>
              </MotionSection>

              <MotionSection custom={3}>
                <div className="panel-card">
                  <div className="panel-card-inner">
                    <div className="panel-eyebrow">Tasks</div>
                    <div className="panel-heading-row">
                      <AssignmentRoundedIcon sx={{ color: "#2563eb" }} />
                      <Typography variant="h6">Add what needs to get done</Typography>
                    </div>
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
                  </div>
                </div>
              </MotionSection>

              <MotionSection custom={4}>
                <div className="panel-card">
                  <div className="panel-card-inner">
                    <div className="panel-eyebrow">Current workload</div>
                    <div className="panel-heading-row">
                      <ChecklistRoundedIcon sx={{ color: "#2563eb" }} />
                      <Typography variant="h6">Review and edit tasks</Typography>
                    </div>
                    <TaskList tasks={tasks} removetask={removetask} edittask={edittask} />
                  </div>
                </div>
              </MotionSection>
            </div>

            <div className="app-side-column">
              <div className="sticky-panel">
                <MotionSection custom={5}>
                  <div className="panel-card">
                    <div className="panel-card-inner">
                      <div className="panel-eyebrow">AI context</div>
                      <div className="panel-heading-row">
                        <AutoAwesomeRoundedIcon sx={{ color: "#2563eb" }} />
                        <Typography variant="h6">Give the planner more context</Typography>
                      </div>

                      <Stack spacing={3}>
                        <CommitmentsForm commitments={commitments} setCommitments={setCommitments} />
                        <Divider />
                        <AvailabilityForm availability={availability} setAvailability={setAvailability} />
                      </Stack>
                    </div>
                  </div>
                </MotionSection>

                <MotionSection custom={6}>
                  <div className="panel-card" style={{ marginTop: 24 }}>
                    <div className="panel-card-inner">
                      <div className="panel-eyebrow">Generate</div>
                      <div className="panel-heading-row">
                        <AccessTimeRoundedIcon sx={{ color: "#2563eb" }} />
                        <Typography variant="h6">Before you build the schedule</Typography>
                      </div>

                      <div className="quick-list">
                        <div className="quick-item">Add at least one task with realistic deadlines.</div>
                        <div className="quick-item">Tell TimeMax what parts of your day are already blocked.</div>
                        <div className="quick-item">Choose a focus duration you can actually sustain.</div>
                        <div className="quick-item">Keep the date range small if you want a tighter plan.</div>
                      </div>

                      <Button
                        fullWidth
                        variant="contained"
                        onClick={generateschedule}
                        disabled={loading || tasks.length === 0}
                        sx={{
                          mt: 3,
                          py: 1.45,
                          bgcolor: "#2563eb",
                          "&:hover": { bgcolor: "#1d4ed8" },
                        }}
                      >
                        {loading ? "Generating your schedule..." : "Build my schedule"}
                      </Button>

                      {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                          {error}
                        </Alert>
                      )}
                    </div>
                  </div>
                </MotionSection>
              </div>
            </div>
          </div>

          <MotionSection custom={7}>
            <div className="schedule-wrap">
              <Schedule schedule={schedule} />
            </div>
          </MotionSection>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App