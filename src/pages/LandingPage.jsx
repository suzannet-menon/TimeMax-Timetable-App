import React from "react"
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  CssBaseline,
  Divider,
  GlobalStyles,
  IconButton,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material"
import {
  AutoAwesomeRounded,
  DarkModeRounded,
  GitHub,
  LightModeRounded,
  PsychologyAltRounded,
  ScheduleRounded,
  TimelineRounded,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const MotionBox = motion.create(Box)
const MotionCard = motion.create(Card)

const githubUrl = "https://github.com/suzannet-menon/TimeMax-Timetable-App"

const features = [
  {
    title: "Adaptive planning",
    description:
      "TimeMax balances deadlines, energy levels, and fixed commitments into schedules that still feel human.",
    icon: <AutoAwesomeRounded sx={{ fontSize: 22 }} />,
    note: "Deadlines, workload, and real-life constraints stay in sync.",
  },
  {
    title: "Focus-aware blocks",
    description:
      "Deep work, quick wins, and recovery time are laid out with realistic pacing instead of generic time slots.",
    icon: <ScheduleRounded sx={{ fontSize: 22 }} />,
    note: "Better pacing means less burnout and fewer impossible plans.",
  },
  {
    title: "AI reasoning",
    description:
      "Gemini helps prioritize what matters today and surfaces risks before your calendar becomes overwhelming.",
    icon: <PsychologyAltRounded sx={{ fontSize: 22 }} />,
    note: "You get suggestions that feel thoughtful, not robotic.",
  },
]

const steps = [
  {
    index: "01",
    title: "Add the shape of your day",
    description:
      "Classes, deadlines, commitments, and free windows become the raw material for your timetable.",
    meta: "Tasks + commitments + energy",
  },
  {
    index: "02",
    title: "Generate a practical plan",
    description:
      "TimeMax creates focus blocks, buffers, and a realistic order of work instead of just listing tasks.",
    meta: "Smart sequencing + buffers",
  },
  {
    index: "03",
    title: "Move with clarity",
    description:
      "You see what to do next, when to rest, and which deadlines need attention without mental clutter.",
    meta: "Daily guidance + momentum",
  },
]

const workflowHighlights = [
  { value: "45 min", label: "Smart focus window" },
  { value: "Daily", label: "AI schedule refresh" },
  { value: "Real-life", label: "Commitment aware" },
]

const laptopBlocks = [
  { time: "09:00", title: "College lectures", tone: "#2563eb", width: "76%" },
  { time: "13:45", title: "Essay writing sprint", tone: "#14b8a6", width: "66%" },
  { time: "15:45", title: "Chemistry revision", tone: "#8b5cf6", width: "58%" },
  { time: "18:00", title: "Gym and recovery", tone: "#f97316", width: "54%" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function buildTheme(mode) {
  return createTheme({
    palette: {
      mode,
      primary: { main: "#2563eb" },
      background: {
        default: mode === "light" ? "#f8fbff" : "#08111f",
        paper: mode === "light" ? "#ffffff" : "#0f172a",
      },
      text: {
        primary: mode === "light" ? "#0f172a" : "#f8fafc",
        secondary: mode === "light" ? "#475569" : "#94a3b8",
      },
    },
    shape: { borderRadius: 22 },
    typography: {
      fontFamily: '"Roboto", sans-serif',
      h1: {
        fontFamily: '"Space Mono", monospace',
        fontWeight: 700,
        letterSpacing: "-0.05em",
      },
      h2: {
        fontFamily: '"Space Mono", monospace',
        fontWeight: 700,
        letterSpacing: "-0.04em",
      },
      h3: {
        fontFamily: '"Space Mono", monospace',
        fontWeight: 700,
      },
      h4: {
        fontFamily: '"Space Mono", monospace',
        fontWeight: 700,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
  })
}

function LaptopMockup({ darkMode }) {
  const screenBackground = darkMode
    ? "linear-gradient(180deg, rgba(9,14,26,0.98) 0%, rgba(15,23,42,1) 100%)"
    : "linear-gradient(180deg, #fcfdff 0%, #eef5ff 100%)"
  const shellBackground = darkMode
    ? "linear-gradient(180deg, #4b5563 0%, #1f2937 100%)"
    : "linear-gradient(180deg, #dde5ef 0%, #b5c0cd 100%)"

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 620,
        mx: "auto",
        perspective: "2000px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: "14% 8% -12% 8%",
          background:
            "radial-gradient(circle at center, rgba(37,99,235,0.22) 0%, rgba(37,99,235,0.08) 44%, rgba(37,99,235,0) 76%)",
          filter: "blur(22px)",
          zIndex: 0,
        }}
      />

      <MotionBox
        initial={{ opacity: 0, y: 36, rotateX: -10, rotateY: -8 }}
        animate={{ opacity: 1, y: 0, rotateX: -3, rotateY: -5 }}
        transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        sx={{ position: "relative", zIndex: 1, transformStyle: "preserve-3d" }}
      >
        <Box
          sx={{
            p: { xs: 1, sm: 1.15 },
            borderRadius: "28px",
            background: shellBackground,
            boxShadow:
              "0 42px 110px rgba(15,23,42,0.22), inset 0 1px 0 rgba(255,255,255,0.4)",
          }}
        >
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "20px",
              aspectRatio: "16 / 10",
              background: screenBackground,
              border: `1px solid ${darkMode ? "rgba(148,163,184,0.18)" : "rgba(148,163,184,0.22)"}`,
              px: { xs: 1.1, sm: 1.5 },
              pt: { xs: 1.3, sm: 1.6 },
              pb: { xs: 1.2, sm: 1.4 },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 82,
                height: 14,
                borderRadius: 999,
                bgcolor: darkMode ? "#020617" : "#d5dfeb",
              }}
            />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "minmax(0,1.5fr) minmax(170px,0.9fr)" },
                gap: 1.3,
                mt: 1.6,
                height: "calc(100% - 16px)",
                alignItems: "stretch",
              }}
            >
              <Box
                sx={{
                  minWidth: 0,
                  p: { xs: 1.1, sm: 1.35 },
                  borderRadius: 4,
                  bgcolor: darkMode ? "rgba(15,23,42,0.76)" : "rgba(255,255,255,0.84)",
                  border: `1px solid ${darkMode ? "rgba(148,163,184,0.14)" : "rgba(226,232,240,0.96)"}`,
                  backdropFilter: "blur(12px)",
                  overflow: "hidden",
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{ mb: 1.35 }}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontFamily: '"Space Mono", monospace',
                        fontWeight: 700,
                        fontSize: { xs: "0.74rem", sm: "0.88rem" },
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Saturday | April 18
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "0.66rem", sm: "0.76rem" },
                        color: "text.secondary",
                      }}
                    >
                      AI-generated daily flow
                    </Typography>
                  </Box>

                  <Chip
                    size="small"
                    label="AI Generated"
                    sx={{
                      maxWidth: { xs: 88, sm: 108 },
                      bgcolor: "rgba(37,99,235,0.14)",
                      color: "#2563eb",
                      fontWeight: 700,
                      borderRadius: "10px",
                      flexShrink: 0,
                      "& .MuiChip-label": {
                        px: { xs: 0.7, sm: 1 },
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: { xs: "0.62rem", sm: "0.7rem" },
                      },
                    }}
                  />
                </Stack>

                <Stack spacing={0.95}>
                  {laptopBlocks.map((block, index) => (
                    <motion.div
                      key={block.time}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.42, delay: 0.2 + index * 0.08 }}
                    >
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: { xs: "54px minmax(0,1fr)", sm: "62px minmax(0,1fr) auto" },
                          gap: 1,
                          alignItems: "center",
                          px: { xs: 1, sm: 1.15 },
                          py: { xs: 0.95, sm: 1.05 },
                          borderRadius: 3,
                          bgcolor: darkMode ? "rgba(15,23,42,0.84)" : "rgba(248,250,252,0.92)",
                          border: `1px solid ${darkMode ? "rgba(148,163,184,0.12)" : "rgba(226,232,240,0.95)"}`,
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: '"Space Mono", monospace',
                            fontSize: { xs: "0.66rem", sm: "0.76rem" },
                            color: "text.secondary",
                          }}
                        >
                          {block.time}
                        </Typography>

                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontSize: { xs: "0.72rem", sm: "0.84rem" },
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {block.title}
                          </Typography>
                          <Box
                            sx={{
                              mt: 0.7,
                              height: 7,
                              borderRadius: 999,
                              bgcolor: darkMode ? "rgba(51,65,85,0.74)" : "rgba(226,232,240,0.92)",
                              overflow: "hidden",
                            }}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: block.width }}
                              transition={{ duration: 0.95, delay: 0.35 + index * 0.1 }}
                              style={{
                                height: "100%",
                                borderRadius: 999,
                                background: block.tone,
                              }}
                            />
                          </Box>
                        </Box>

                        <Typography
                          sx={{
                            display: { xs: "none", sm: "block" },
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            color: block.tone,
                          }}
                        >
                          Focus
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </Box>

              <Stack spacing={1.2} sx={{ minWidth: 0 }}>
                <Box
                  sx={{
                    p: { xs: 1.1, sm: 1.35 },
                    borderRadius: 4,
                    bgcolor: darkMode ? "rgba(15,23,42,0.78)" : "rgba(255,255,255,0.84)",
                    border: `1px solid ${darkMode ? "rgba(148,163,184,0.14)" : "rgba(226,232,240,0.96)"}`,
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: "0.72rem",
                      color: "text.secondary",
                      mb: 0.65,
                    }}
                  >
                    Focus duration
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: { xs: "1.15rem", sm: "1.6rem" },
                      lineHeight: 1,
                    }}
                  >
                    45 min
                  </Typography>
                  <Typography sx={{ mt: 0.7, fontSize: "0.72rem", color: "text.secondary" }}>
                    Deep work selected
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      height: 6,
                      borderRadius: 999,
                      bgcolor: darkMode ? "rgba(51,65,85,0.7)" : "rgba(226,232,240,0.95)",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: ["-100%", "120%"] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        width: "38%",
                        height: "100%",
                        borderRadius: 999,
                        background: "linear-gradient(90deg, rgba(37,99,235,0.15), #2563eb, rgba(37,99,235,0.15))",
                      }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    p: { xs: 1.1, sm: 1.35 },
                    borderRadius: 4,
                    bgcolor: darkMode ? "rgba(15,23,42,0.78)" : "rgba(255,255,255,0.84)",
                    border: `1px solid ${darkMode ? "rgba(148,163,184,0.14)" : "rgba(226,232,240,0.96)"}`,
                    overflow: "hidden",
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.1 }}>
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: "rgba(37,99,235,0.12)",
                        color: "#2563eb",
                      }}
                    >
                      <TimelineRounded sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.84rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Momentum score
                      </Typography>
                      <Typography sx={{ fontSize: "0.72rem", color: "text.secondary" }}>
                        84% aligned
                      </Typography>
                    </Box>
                  </Stack>

                  <Box
                    sx={{
                      mb: 1,
                      height: 34,
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 0.6,
                    }}
                  >
                    {[44, 72, 58, 88, 68, 94].map((height, index) => (
                      <motion.div
                        key={height}
                        animate={{ height: [`${Math.max(26, height - 18)}%`, `${height}%`, `${Math.max(22, height - 12)}%`] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          delay: index * 0.12,
                          ease: "easeInOut",
                        }}
                        style={{
                          width: "12%",
                          borderRadius: 999,
                          background: index > 3 ? "#2563eb" : "rgba(37,99,235,0.45)",
                        }}
                      />
                    ))}
                  </Box>

                  <Stack spacing={0.9}>
                    {[
                      "Hard tasks placed earlier",
                      "Commute buffers included",
                      "Evening workload softened",
                    ].map((line, index) => (
                      <motion.div
                        key={line}
                        animate={{ opacity: [0.55, 1, 0.55] }}
                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                          delay: index * 0.35,
                        }}
                      >
                        <Stack direction="row" spacing={0.8} alignItems="center">
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              bgcolor: "#2563eb",
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "0.72rem",
                              color: "text.secondary",
                              lineHeight: 1.45,
                            }}
                          >
                            {line}
                          </Typography>
                        </Stack>
                      </motion.div>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            mx: "auto",
            width: "90%",
            height: 14,
            borderRadius: "0 0 18px 18px",
            background: shellBackground,
            boxShadow: "0 16px 40px rgba(15,23,42,0.18)",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 3,
              left: "50%",
              transform: "translateX(-50%)",
              width: 88,
              height: 6,
              borderRadius: 999,
              bgcolor: darkMode ? "rgba(248,250,252,0.24)" : "rgba(15,23,42,0.12)",
            }}
          />
        </Box>
      </MotionBox>
    </Box>
  )
}

export default function LandingPage() {
  const [darkMode, setDarkMode] = React.useState(false)
  const theme = React.useMemo(() => buildTheme(darkMode ? "dark" : "light"), [darkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles="@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap');"
      />

      <Box
        sx={{
          minHeight: "100vh",
          color: "text.primary",
          background: darkMode
            ? "linear-gradient(180deg, #08111f 0%, #0b1528 40%, #09111d 100%)"
            : "linear-gradient(180deg, #ffffff 0%, #f8fbff 44%, #f3f8ff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: darkMode
              ? "radial-gradient(circle at 10% 10%, rgba(37,99,235,0.14), transparent 28%), radial-gradient(circle at 88% 18%, rgba(59,130,246,0.1), transparent 24%)"
              : "radial-gradient(circle at 10% 10%, rgba(37,99,235,0.08), transparent 28%), radial-gradient(circle at 88% 18%, rgba(59,130,246,0.07), transparent 24%)",
          }}
        />

        <AppBar
          position="sticky"
          elevation={0}
          color="transparent"
          sx={{
            backdropFilter: "blur(18px)",
            backgroundColor: darkMode ? "rgba(8,17,31,0.72)" : "rgba(255,255,255,0.72)",
            borderBottom: `1px solid ${darkMode ? "rgba(148,163,184,0.12)" : "rgba(226,232,240,0.92)"}`,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ py: 1.4, gap: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Space Mono", monospace',
                  fontWeight: 700,
                  color: "#2563eb",
                  letterSpacing: "-0.04em",
                  flexGrow: 1,
                }}
              >
                TimeMax
              </Typography>

              <Stack
                direction="row"
                spacing={0.6}
                sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
              >
                <Button color="inherit" href="#features">
                  Features
                </Button>
                <Button color="inherit" href="#how-it-works">
                  How it Works
                </Button>
              </Stack>

              <IconButton
                onClick={() => setDarkMode((value) => !value)}
                sx={{
                  border: `1px solid ${darkMode ? "rgba(148,163,184,0.16)" : "rgba(226,232,240,1)"}`,
                  bgcolor: darkMode ? "rgba(15,23,42,0.8)" : "rgba(255,255,255,0.9)",
                }}
              >
                {darkMode ? <LightModeRounded /> : <DarkModeRounded />}
              </IconButton>

              <Button
                component={Link}
                to="/signup"
                variant="contained"
                sx={{
                  px: { xs: 2.4, sm: 3 },
                  py: 1.15,
                  borderRadius: 999,
                  boxShadow: "0 16px 34px rgba(37,99,235,0.24)",
                }}
              >
                Launch TimeMax
              </Button>
            </Toolbar>
          </Container>
        </AppBar>

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1.06fr 0.94fr" },
              alignItems: "center",
              gap: { xs: 7, md: 8, lg: 5 },
              pt: { xs: 8, md: 11 },
              pb: { xs: 10, md: 12 },
              minHeight: { lg: "calc(100vh - 88px)" },
            }}
          >
            <Box>
              <MotionBox variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <Chip
                  icon={<AutoAwesomeRounded sx={{ color: "#2563eb !important" }} />}
                  label="Powered by Google Gemini"
                  sx={{
                    mb: 3,
                    px: 1,
                    py: 2.35,
                    borderRadius: 999,
                    border: "1px solid rgba(37,99,235,0.16)",
                    bgcolor: darkMode ? "rgba(15,23,42,0.7)" : "rgba(255,255,255,0.86)",
                    color: "text.primary",
                    "& .MuiChip-label": { px: 0.5, fontWeight: 700 },
                  }}
                />
              </MotionBox>

              <MotionBox variants={fadeUp} initial="hidden" animate="visible" custom={0.08}>
                <Typography
                  variant="h1"
                  sx={{
                    maxWidth: 760,
                    fontSize: { xs: "3rem", sm: "4rem", md: "5.15rem", xl: "5.8rem" },
                    lineHeight: { xs: 1.03, md: 0.98 },
                    mb: 3,
                  }}
                >
                  Master Your Time with AI
                </Typography>
              </MotionBox>

              <MotionBox variants={fadeUp} initial="hidden" animate="visible" custom={0.16}>
                <Typography
                  sx={{
                    maxWidth: 700,
                    fontSize: { xs: "1rem", sm: "1.08rem", md: "1.15rem" },
                    lineHeight: 1.85,
                    color: "text.secondary",
                    mb: 4.5,
                  }}
                >
                  AI-powered timetable manager that turns your tasks, deadlines, energy levels and
                  commitments into perfect day-by-day schedules.
                </Typography>
              </MotionBox>

              <MotionBox variants={fadeUp} initial="hidden" animate="visible" custom={0.24}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.8} sx={{ mb: 5 }}>
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    size="large"
                    sx={{
                      px: 3.6,
                      py: 1.55,
                      borderRadius: 999,
                      fontSize: "1rem",
                      boxShadow: "0 18px 38px rgba(37,99,235,0.28)",
                    }}
                  >
                    {"Launch TimeMax ->"}
                  </Button>
                  <Button
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="outlined"
                    size="large"
                    startIcon={<GitHub />}
                    sx={{
                      px: 3.2,
                      py: 1.5,
                      borderRadius: 999,
                      borderColor: darkMode ? "rgba(148,163,184,0.24)" : "rgba(37,99,235,0.22)",
                    }}
                  >
                    View on GitHub
                  </Button>
                </Stack>
              </MotionBox>

              <MotionBox variants={fadeUp} initial="hidden" animate="visible" custom={0.32}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  divider={
                    <Divider
                      flexItem
                      orientation="vertical"
                      sx={{ display: { xs: "none", sm: "block" } }}
                    />
                  }
                  spacing={{ xs: 2, sm: 3 }}
                  sx={{
                    width: "fit-content",
                    maxWidth: "100%",
                    px: 2.2,
                    py: 1.8,
                    borderRadius: 4,
                    border: `1px solid ${darkMode ? "rgba(148,163,184,0.12)" : "rgba(226,232,240,0.95)"}`,
                    bgcolor: darkMode ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.78)",
                    backdropFilter: "blur(14px)",
                  }}
                >
                  {[
                    ["Day-by-day", "Realistic schedules"],
                    ["Focus-aware", "Energy matched blocks"],
                    ["Student-first", "Built for real commitments"],
                  ].map(([title, subtitle]) => (
                    <Box key={title}>
                      <Typography sx={{ fontFamily: '"Space Mono", monospace', fontSize: "0.9rem" }}>
                        {title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {subtitle}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </MotionBox>
            </Box>

            <LaptopMockup darkMode={darkMode} />
          </Box>

          <Box id="features" sx={{ py: { xs: 5, md: 8 } }}>
            <MotionBox
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "2.8rem" },
                  textAlign: "center",
                  mb: 2,
                }}
              >
                Quietly powerful planning
              </Typography>
              <Typography
                sx={{
                  maxWidth: 700,
                  mx: "auto",
                  textAlign: "center",
                  color: "text.secondary",
                  lineHeight: 1.8,
                  mb: 5.5,
                }}
              >
                Premium UI on the surface, practical schedule intelligence underneath.
              </Typography>
            </MotionBox>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2.4}>
              {features.map((feature, index) => (
                <MotionCard
                  key={feature.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  custom={0.08 + index * 0.08}
                  sx={{
                    flex: 1,
                    p: { xs: 2.6, md: 3.1 },
                    minHeight: { md: 250 },
                    borderRadius: "48px",
                    border: `1px solid ${darkMode ? "rgba(148,163,184,0.12)" : "rgba(226,232,240,0.95)"}`,
                    boxShadow: darkMode ? "none" : "0 18px 50px rgba(15,23,42,0.06)",
                    background: darkMode
                      ? "linear-gradient(180deg, rgba(15,23,42,0.88) 0%, rgba(11,18,32,0.92) 100%)"
                      : "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.95) 100%)",
                    overflow: "hidden",
                  }}
                >
                  <Avatar
                    sx={{
                      mb: 2.2,
                      width: 48,
                      height: 48,
                      bgcolor: "rgba(37,99,235,0.12)",
                      color: "#2563eb",
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ mb: 1.2, fontFamily: '"Space Mono", monospace' }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {feature.description}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 1.6,
                      color: darkMode ? "rgba(191,219,254,0.9)" : "#2563eb",
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {feature.note}
                  </Typography>
                </MotionCard>
              ))}
            </Stack>
          </Box>

          <Box id="how-it-works" sx={{ py: { xs: 7, md: 10 } }}>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 3, lg: 5 }}
              alignItems={{ xs: "stretch", lg: "center" }}
            >
              <MotionBox
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={0}
                sx={{ flex: 0.95 }}
              >
                <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, mb: 2 }}>
                  Built to remove planning stress
                </Typography>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.85, maxWidth: 620 }}>
                  Instead of manually stitching together classes, assignments, energy, and free time,
                  you give TimeMax the inputs and it returns a schedule that feels realistic from the
                  first draft.
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.4} sx={{ mt: 3.2 }}>
                  {workflowHighlights.map((item) => (
                    <Box
                      key={item.label}
                      sx={{
                        minWidth: 0,
                        flex: 1,
                        p: 1.8,
                        borderRadius: 4,
                        border: `1px solid ${darkMode ? "rgba(148,163,184,0.12)" : "rgba(226,232,240,0.95)"}`,
                        bgcolor: darkMode ? "rgba(15,23,42,0.52)" : "rgba(255,255,255,0.72)",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: '"Space Mono", monospace',
                          fontSize: "1rem",
                          color: "#2563eb",
                          mb: 0.4,
                        }}
                      >
                        {item.value}
                      </Typography>
                      <Typography sx={{ color: "text.secondary", fontSize: "0.92rem", lineHeight: 1.6 }}>
                        {item.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </MotionBox>

              <Stack sx={{ flex: 1 }} spacing={2}>
                {steps.map((step, index) => (
                  <MotionCard
                    key={step.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    custom={0.1 + index * 0.08}
                    sx={{
                      p: { xs: 2.3, md: 2.8 },
                      minHeight: { md: 146 },
                      borderRadius: "40px",
                      border: `1px solid ${darkMode ? "rgba(148,163,184,0.12)" : "rgba(226,232,240,0.95)"}`,
                      boxShadow: darkMode ? "none" : "0 18px 45px rgba(15,23,42,0.05)",
                      backgroundColor: darkMode ? "rgba(15,23,42,0.82)" : "rgba(255,255,255,0.9)",
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      sx={{
                        mb: 1,
                        color: "#2563eb",
                        fontFamily: '"Space Mono", monospace',
                        fontSize: "0.88rem",
                      }}
                    >
                      {step.index}
                    </Typography>
                    <Typography
                      sx={{
                        color: darkMode ? "rgba(191,219,254,0.85)" : "#2563eb",
                        fontSize: "0.82rem",
                        mb: 0.65,
                      }}
                    >
                      {step.meta}
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 0.9, fontFamily: '"Space Mono", monospace' }}>
                      {step.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.75, maxWidth: "56ch" }}>
                      {step.description}
                    </Typography>
                  </MotionCard>
                ))}
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
