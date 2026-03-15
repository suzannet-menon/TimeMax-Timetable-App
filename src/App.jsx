import { useState, useMemo } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Alert from "@mui/material/Alert"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import { motion } from "framer-motion"
import FocusPicker from "./components/FocusPicker"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import Schedule from "./components/Schedule"
import CommitmentsForm from "./components/CommitmentsForm"
import { fetchSchedule } from "./utils/api"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" }
  })
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
  const [darkMode, setDarkMode] = useState(false)

  const now = new Date()
  const todayStr = now.toISOString().split("T")[0]
  const defaultStartTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
  const [startTime, setStartTime] = useState(defaultStartTime)
  const [dateFrom, setDateFrom] = useState(todayStr)
  const [dateTo, setDateTo] = useState(todayStr)

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#2563eb" },
      background: {
        default: darkMode ? "#0f172a" : "#ffffff",
        paper: darkMode ? "#1e293b" : "#ffffff",
      }
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: "16px",
            paddingRight: "16px",
          }
        }
      }
    }
  }), [darkMode])

  const addtask = () => {
    if (!taskname) return
    const newtask = { taskname, deadline, effort, energy }
    setTasks([...tasks, newtask])
    setTaskname("")
    setDeadline("")
  }

  const removetask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  const edittask = (index, updatedTask) => {
    const updated = [...tasks]
    updated[index] = updatedTask
    setTasks(updated)
  }

  const generateschedule = async () => {
    if (loading) return
    setLoading(true)
    setError(null)
    setSchedule(null)
    try {
      const result = await fetchSchedule(
        tasks,
        focusminutes,
        commitments,
        startTime,
        { from: dateFrom, to: dateTo }
      )
      setSchedule(result)
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          "&::before": {
            content: '""',
            position: "fixed",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            opacity: darkMode ? 0.04 : 0.025,
            pointerEvents: "none",
            zIndex: 0,
          }
        }}
      >
        <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 }, position: "relative", zIndex: 1 }}>

          {/* HEADER */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
              <Box>
                <Typography
                  fontWeight="700"
                  sx={{
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: "-1px",
                    fontSize: { xs: "28px", md: "40px" }
                  }}
                >
                  TimeMax
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  AI-powered scheduling around your real day.
                </Typography>
              </Box>
              <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ mt: 1 }}>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>
          </motion.div>

          {/* DATE RANGE + START TIME */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "12px",
                p: { xs: 2, md: 2.5 },
                mt: 3,
                mb: 3,
                bgcolor: darkMode ? "#1e293b" : "#f8fafc"
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight="600"
                display="block"
                mb={1.5}
                sx={{ fontFamily: "'Space Mono', monospace", letterSpacing: "1px" }}
              >
                PLANNING PERIOD
              </Typography>
              <Box
                display="flex"
                flexWrap="wrap"
                gap={2}
                alignItems="center"
              >
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                    From
                  </Typography>
                  <TextField
                    type="date"
                    size="small"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    sx={{ width: { xs: "100%", sm: "160px" } }}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                    To
                  </Typography>
                  <TextField
                    type="date"
                    size="small"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    sx={{ width: { xs: "100%", sm: "160px" } }}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                    Start time on first day
                  </Typography>
                  <TextField
                    type="time"
                    size="small"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    sx={{ width: { xs: "100%", sm: "140px" } }}
                  />
                </Box>
              </Box>
            </Box>
          </motion.div>

          {/* FOCUS PICKER */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            <FocusPicker focusminutes={focusminutes} setFocusminutes={setFocusminutes} />
          </motion.div>

          {/* TASK FORM */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            <TaskForm
              taskname={taskname} setTaskname={setTaskname}
              deadline={deadline} setDeadline={setDeadline}
              effort={effort} setEffort={setEffort}
              energy={energy} setEnergy={setEnergy}
              addtask={addtask}
            />
          </motion.div>

          {/* TASK LIST */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}>
            <TaskList
              tasks={tasks}
              removetask={removetask}
              edittask={edittask}
              generateschedule={generateschedule}
              loading={loading}
            />
          </motion.div>

          {/* COMMITMENTS */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}>
            <CommitmentsForm
              commitments={commitments}
              setCommitments={setCommitments}
            />
          </motion.div>

          {/* BUILD SCHEDULE BUTTON */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={6}
          >
            {tasks.length > 0 && (
              <motion.div whileTap={{ scale: 0.97 }}>
                <Box
                  component="button"
                  onClick={generateschedule}
                  disabled={loading}
                  sx={{
                    width: "100%",
                    py: 2,
                    border: "none",
                    borderRadius: "12px",
                    bgcolor: loading ? "#93c5fd" : "#2563eb",
                    color: "white",
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: "700",
                    fontFamily: "'Space Mono', monospace",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                    "&:hover": {
                      bgcolor: loading ? "#93c5fd" : "#1d4ed8"
                    }
                  }}
                >
                  {loading ? "⏳ Generating your schedule..." : "✨ Build My Schedule"}
                </Box>
              </motion.div>
            )}
          </motion.div>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Schedule schedule={schedule} />

        <Box
  sx={{
    mt: 8,
    pt: 3,
    borderTop: "1px solid",
    borderColor: "divider",
    textAlign: "center"
  }}
>
  <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "'Space Mono', monospace" }}>
    © 2026 TimeMax — Built by Suzanne Daniel Thomas
  </Typography>
  <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
    A learning project · All rights reserved · Not for commercial use
  </Typography>
</Box>

        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App