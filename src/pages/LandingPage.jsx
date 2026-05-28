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
  LightModeRounded,
  PsychologyAltRounded,
  ScheduleRounded,
  TimelineRounded,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const MotionBox = motion.create(Box)
const MotionCard = motion.create(Card)

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

const keyboardRows = [14, 13, 12, 8]

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.82,
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
        letterSpacing: 0,
      },
      h2: {
        fontFamily: '"Space Mono", monospace',
        fontWeight: 700,
        letterSpacing: 0,
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
        maxWidth: { xs: 590, sm: 700, md: 800, xl: 860 },
        mx: "auto",
        perspective: "1800px",
        minWidth: 0,
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
        initial={{ opacity: 0, y: 30, rotateX: -9, rotateY: -9 }}
        animate={{
          opacity: 1,
          y: [0, -5, 0],
          rotateX: [-3.2, -2.4, -3.2],
          rotateY: [-7.2, -6.1, -7.2],
        }}
        transition={{
          opacity: { duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 6.2, repeat: Infinity, ease: "easeInOut" },
          rotateX: { duration: 6.2, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 6.2, repeat: Infinity, ease: "easeInOut" },
        }}
        sx={{
          position: "relative",
          zIndex: 1,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
          maxWidth: "100%",
        }}
      >
        <Box
          sx={{
            p: { xs: 1, sm: 1.15, md: 1.25 },
            borderRadius: { xs: "28px", md: "34px" },
            background: shellBackground,
            boxShadow:
              "0 42px 110px rgba(15,23,42,0.22), inset 0 1px 0 rgba(255,255,255,0.4)",
            transform: "perspective(1200px) rotateX(5deg)",
            transformOrigin: "bottom center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              isolation: "isolate",
              borderRadius: { xs: "20px", md: "24px" },
              aspectRatio: "16 / 9.8",
              background: screenBackground,
              border: `1px solid ${darkMode ? "rgba(148,163,184,0.18)" : "rgba(148,163,184,0.22)"}`,
              px: { xs: 1, sm: 1.25, md: 1.45 },
              pt: { xs: 1.15, sm: 1.35, md: 1.55 },
              pb: { xs: 0.9, sm: 1.05, md: 1.2 },
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
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  darkMode
                    ? "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.05) 48%, transparent 100%)"
                    : "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.34) 48%, transparent 100%)",
                opacity: 0.9,
              }}
              component={motion.div}
              animate={{ x: ["-120%", "125%"] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.6 }}
            />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "minmax(0,1.6fr) minmax(138px,0.64fr)" },
                gap: { xs: 0.75, sm: 0.9, md: 1.1 },
                mt: { xs: 1.45, md: 1.6 },
                height: "calc(100% - 16px)",
                alignItems: "stretch",
                minWidth: 0,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  minWidth: 0,
                  p: { xs: 0.75, sm: 0.9, md: 1.05 },
                  borderRadius: { xs: "16px", md: "20px" },
                  bgcolor: darkMode ? "rgba(15,23,42,0.36)" : "rgba(255,255,255,0.38)",
                  border: `1px solid ${darkMode ? "rgba(148,163,184,0.1)" : "rgba(203,213,225,0.58)"}`,
                  overflow: "hidden",
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{ mb: 0.95 }}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontFamily: '"Space Mono", monospace',
                        fontWeight: 700,
                        fontSize: { xs: "0.68rem", sm: "0.78rem", md: "0.86rem" },
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Saturday | April 18
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "0.58rem", sm: "0.66rem", md: "0.74rem" },
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
                      bgcolor: "rgba(37,99,235,0.1)",
                      color: "#2563eb",
                      fontWeight: 700,
                      borderRadius: "8px",
                      height: { xs: 22, md: 24 },
                      flexShrink: 0,
                      "& .MuiChip-label": {
                        px: { xs: 0.7, sm: 1 },
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: { xs: "0.56rem", sm: "0.62rem", md: "0.68rem" },
                      },
                    }}
                  />
                </Stack>

                <Stack
                  spacing={0}
                  sx={{
                    borderTop: `1px solid ${darkMode ? "rgba(148,163,184,0.12)" : "rgba(203,213,225,0.58)"}`,
                  }}
                >
                  {laptopBlocks.map((block, index) => (
                    <motion.div
                      key={block.time}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: index === 1 ? [1, 1.015, 1] : 1,
                      }}
                      transition={{
                        opacity: { duration: 0.42, delay: 0.2 + index * 0.08 },
                        x: { duration: 0.42, delay: 0.2 + index * 0.08 },
                        scale: index === 1
                          ? { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }
                          : undefined,
                      }}
                    >
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: { xs: "52px minmax(0,1fr)", sm: "58px minmax(0,1fr) auto" },
                          gap: { xs: 0.75, sm: 0.95 },
                          alignItems: "center",
                          px: { xs: 0.55, sm: 0.7, md: 0.85 },
                          py: { xs: 0.68, sm: 0.78, md: 0.88 },
                          borderRadius: 0,
                          bgcolor: "transparent",
                          borderBottom: `1px solid ${darkMode ? "rgba(148,163,184,0.1)" : "rgba(203,213,225,0.52)"}`,
                          overflow: "hidden",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: '"Space Mono", monospace',
                            fontSize: { xs: "0.58rem", sm: "0.66rem", md: "0.74rem" },
                            color: "text.secondary",
                          }}
                        >
                          {block.time}
                        </Typography>

                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontSize: { xs: "0.64rem", sm: "0.72rem", md: "0.82rem" },
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
                              height: { xs: 6, md: 7 },
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
                            fontSize: { sm: "0.6rem", md: "0.68rem" },
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

              <Stack
                spacing={1.2}
                sx={{
                  minWidth: 0,
                  display: { xs: "none", sm: "flex" },
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    p: { xs: 0.75, sm: 0.9, md: 1 },
                    borderRadius: { sm: "16px", md: "20px" },
                    bgcolor: darkMode ? "rgba(15,23,42,0.34)" : "rgba(255,255,255,0.34)",
                    border: `1px solid ${darkMode ? "rgba(148,163,184,0.1)" : "rgba(203,213,225,0.54)"}`,
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: { xs: "0.6rem", md: "0.7rem" },
                      color: "text.secondary",
                      mb: 0.65,
                    }}
                  >
                    Focus duration
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: { xs: "1.02rem", sm: "1.28rem", md: "1.55rem" },
                      lineHeight: 1,
                    }}
                  >
                    45 min
                  </Typography>
                  <Typography sx={{ mt: 0.65, fontSize: { xs: "0.6rem", md: "0.7rem" }, color: "text.secondary" }}>
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
                    p: { xs: 0.75, sm: 0.9, md: 1 },
                    borderRadius: { sm: "16px", md: "20px" },
                    bgcolor: darkMode ? "rgba(15,23,42,0.34)" : "rgba(255,255,255,0.34)",
                    border: `1px solid ${darkMode ? "rgba(148,163,184,0.1)" : "rgba(203,213,225,0.54)"}`,
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
                          fontSize: { xs: "0.72rem", md: "0.82rem" },
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Momentum score
                      </Typography>
                      <Typography sx={{ fontSize: { xs: "0.6rem", md: "0.7rem" }, color: "text.secondary" }}>
                        84% aligned
                      </Typography>
                    </Box>
                  </Stack>

                  <Box
                    sx={{
                      mb: 0.9,
                      height: { xs: 28, md: 34 },
                      display: "flex",
                      alignItems: "flex-end",
                      gap: { xs: 0.45, md: 0.6 },
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
                              fontSize: { xs: "0.58rem", md: "0.7rem" },
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
            width: "94%",
            height: { xs: 8, md: 10 },
            mx: "auto",
            mt: { xs: -0.85, md: -1 },
            borderRadius: "0 0 999px 999px",
            background: darkMode
              ? "linear-gradient(180deg, rgba(75,85,99,0.85), rgba(17,24,39,0.95))"
              : "linear-gradient(180deg, rgba(203,213,225,0.95), rgba(148,163,184,0.9))",
            boxShadow: "0 9px 18px rgba(15,23,42,0.16)",
            position: "relative",
            zIndex: 2,
          }}
        />

        <Box
          sx={{
            position: "relative",
            width: "104%",
            height: { xs: 56, sm: 76, md: 94 },
            mx: "auto",
            ml: "-2%",
            mt: { xs: -0.45, sm: -0.6 },
            transform: "perspective(980px) rotateX(54deg)",
            transformOrigin: "top center",
            borderRadius: "0 0 28px 28px",
            background: darkMode
              ? "linear-gradient(180deg, #374151 0%, #111827 100%)"
              : "linear-gradient(180deg, #d8e2ee 0%, #aebaca 100%)",
            boxShadow:
              "0 22px 38px rgba(15,23,42,0.18), inset 0 1px 0 rgba(255,255,255,0.5)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: { xs: "7px 8% 12px", sm: "9px 9% 15px", md: "12px 10% 19px" },
              display: "grid",
              gridTemplateRows: "repeat(4, minmax(0, 1fr))",
              gap: { xs: 0.4, sm: 0.55, md: 0.75 },
              opacity: darkMode ? 0.82 : 0.92,
            }}
          >
            {keyboardRows.map((count, rowIndex) => (
              <Box
                key={count}
                sx={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
                  gap: { xs: 0.45, sm: 0.6, md: 0.78 },
                  px: rowIndex === 3 ? { xs: 2.2, sm: 3.2, md: 4.4 } : rowIndex * 0.85,
                }}
              >
                {Array.from({ length: count }).map((_, keyIndex) => (
                  <Box
                    key={`${rowIndex}-${keyIndex}`}
                    component={motion.div}
                    animate={{
                      opacity: rowIndex === 1 && keyIndex > 4 && keyIndex < 8 ? [0.68, 1, 0.68] : 0.86,
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      delay: keyIndex * 0.03,
                      ease: "easeInOut",
                    }}
                    sx={{
                      minWidth: 0,
                      borderRadius: { xs: "3px", md: "5px" },
                      background: darkMode
                        ? "linear-gradient(180deg, rgba(15,23,42,0.94), rgba(2,6,23,0.92))"
                        : "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(211,223,236,0.94))",
                      boxShadow: darkMode
                        ? "inset 0 1px 0 rgba(255,255,255,0.09), 0 2px 3px rgba(0,0,0,0.28)"
                        : "inset 0 1px 0 rgba(255,255,255,0.96), 0 2px 4px rgba(15,23,42,0.18)",
                    }}
                  />
                ))}
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              position: "absolute",
              left: "50%",
              bottom: { xs: 5, sm: 7, md: 9 },
              transform: "translateX(-50%)",
              width: "22%",
              height: { xs: 8, sm: 10, md: 13 },
              borderRadius: { xs: "5px", md: "8px" },
              bgcolor: darkMode ? "rgba(2,6,23,0.55)" : "rgba(148,163,184,0.34)",
              boxShadow: "inset 0 1px 2px rgba(15,23,42,0.18)",
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
        styles={`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap');
          html { scroll-behavior: smooth; }
        `}
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
          overflowX: "clip",
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
          position="fixed"
          elevation={0}
          color="transparent"
          sx={{
            top: 0,
            zIndex: (theme) => theme.zIndex.drawer + 2,
            backdropFilter: "blur(26px) saturate(1.45)",
            background: darkMode
              ? "linear-gradient(120deg, rgba(8,17,31,0.82), rgba(15,23,42,0.62) 52%, rgba(37,99,235,0.18))"
              : "linear-gradient(120deg, rgba(255,255,255,0.84), rgba(235,245,255,0.76) 48%, rgba(179,216,255,0.48))",
            borderBottom: `1px solid ${darkMode ? "rgba(147,197,253,0.2)" : "rgba(147,197,253,0.64)"}`,
            boxShadow: darkMode
              ? "0 18px 45px rgba(2,6,23,0.22)"
              : "0 18px 45px rgba(59,130,246,0.13)",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{
                minHeight: { xs: 78, md: 88 },
                py: { xs: 1.6, md: 1.9 },
                gap: { xs: 1.4, md: 2.2 },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Space Mono", monospace',
                  fontWeight: 700,
                  fontSize: { xs: "1.34rem", md: "1.58rem" },
                  color: "#2563eb",
                  letterSpacing: 0,
                  flexGrow: 1,
                }}
              >
                TimeMax
              </Typography>

              <Stack
                direction="row"
                spacing={0.9}
                sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
              >
                <Button color="inherit" href="#features" sx={{ fontSize: "1rem", fontWeight: 700 }}>
                  Features
                </Button>
                <Button color="inherit" href="#how-it-works" sx={{ fontSize: "1rem", fontWeight: 700 }}>
                  How it Works
                </Button>
              </Stack>

              <IconButton
                onClick={() => setDarkMode((value) => !value)}
                sx={{
                  border: `1px solid ${darkMode ? "rgba(148,163,184,0.16)" : "rgba(226,232,240,1)"}`,
                  bgcolor: darkMode ? "rgba(15,23,42,0.8)" : "rgba(255,255,255,0.9)",
                  width: 44,
                  height: 44,
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
                  py: 1.25,
                  borderRadius: 999,
                  fontSize: { xs: "0.92rem", md: "1rem" },
                  boxShadow: "0 16px 34px rgba(37,99,235,0.24)",
                }}
              >
                Launch TimeMax
              </Button>
            </Toolbar>
          </Container>
        </AppBar>

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, pt: { xs: "78px", md: "88px" } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "0.94fr 1.06fr" },
              alignItems: "center",
              gap: { xs: 7, md: 8, lg: 4 },
              pt: { xs: 8, md: 11 },
              pb: { xs: 10, md: 12 },
              minHeight: { lg: "calc(100vh - 88px)" },
              minWidth: 0,
              "& > *": { minWidth: 0 },
            }}
          >
            <Box>
              <MotionBox variants={fadeUp} initial="hidden" animate="visible" custom={0.08}>
                <Typography
                  variant="h1"
                  sx={{
                    maxWidth: 700,
                    fontSize: { xs: "3rem", sm: "3.9rem", md: "4.7rem", xl: "5.2rem" },
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
                    maxWidth: 620,
                    fontSize: { xs: "1rem", sm: "1.04rem", md: "1.1rem" },
                    lineHeight: 1.85,
                    color: "text.secondary",
                    mb: 4.5,
                  }}
                >
                  AI-powered timetable manager that turns your tasks, deadlines, energy levels and
                  commitments into perfect day-by-day schedules.
                </Typography>
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

          <Box id="features" sx={{ py: { xs: 5, md: 8 }, scrollMarginTop: "112px" }}>
            <MotionBox
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18, margin: "0px 0px -12% 0px" }}
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
                  viewport={{ once: true, amount: 0.16, margin: "0px 0px -10% 0px" }}
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

          <Box id="how-it-works" sx={{ py: { xs: 7, md: 10 }, scrollMarginTop: "112px" }}>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 3, lg: 5 }}
              alignItems={{ xs: "stretch", lg: "center" }}
            >
              <MotionBox
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.16, margin: "0px 0px -12% 0px" }}
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
                    viewport={{ once: true, amount: 0.14, margin: "0px 0px -10% 0px" }}
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

        <Box
          component="footer"
          sx={{
            position: "relative",
            zIndex: 1,
            bgcolor: "#020617",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Container maxWidth="xl">
            <Typography
              sx={{
                py: 2.4,
                textAlign: "center",
                color: "rgba(248,250,252,0.72)",
                fontSize: "0.92rem",
              }}
            >
              Copyright 2026. Built by Suzanne Thomas. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
