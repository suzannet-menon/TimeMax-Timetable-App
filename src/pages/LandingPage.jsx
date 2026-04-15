import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import Chip from "@mui/material/Chip"
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded"
import LoginRoundedIcon from "@mui/icons-material/LoginRounded"
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded"
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded"
import EventBusyRoundedIcon from "@mui/icons-material/EventBusyRounded"
import BoltRoundedIcon from "@mui/icons-material/BoltRounded"
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded"
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"
import WorkRoundedIcon from "@mui/icons-material/WorkRounded"
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded"
import { motion } from "framer-motion"

const MotionBox = motion(Box)

const steps = [
  {
    title: "Add your tasks",
    text: "Enter what you need to do, when it is due, and how demanding it feels.",
    icon: <TaskAltRoundedIcon fontSize='small' />,
  },
  {
    title: "Add commitments",
    text: "Classes, meals, family time, gym, or anything else that blocks your day.",
    icon: <EventBusyRoundedIcon fontSize='small' />,
  },
  {
    title: "Choose your focus style",
    text: "Set a focus duration that matches how long you can realistically work.",
    icon: <BoltRoundedIcon fontSize='small' />,
  },
  {
    title: "Generate your schedule",
    text: "TimeMax creates a practical plan with time blocks, warnings, and tips.",
    icon: <AutoAwesomeRoundedIcon fontSize='small' />,
  },
]

const impact = [
  {
    title: "Students",
    text: "For people balancing classes, assignments, exams, and unpredictable daily routines.",
    icon: <SchoolRoundedIcon fontSize='small' />,
  },
  {
    title: "Busy people",
    text: "For people trying to fit meaningful work into days that already have fixed responsibilities.",
    icon: <WorkRoundedIcon fontSize='small' />,
  },
  {
    title: "Overthinkers and procrastinators",
    text: "For people who do not need more motivation, but a plan that actually feels doable.",
    icon: <PsychologyRoundedIcon fontSize='small' />,
  },
]

export default function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#ffffff",
        color: "#0f172a",
        "&::before": {
          content: '""',
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.02,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
        },
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #e2e8f0",
          color: "#0f172a",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 72, justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                fontSize: "1.1rem",
              }}
            >
              TimeMax
            </Typography>

            <Stack direction="row" spacing={1.25}>
              <Button
                startIcon={<LoginRoundedIcon />}
                sx={{
                  fontFamily: "'Space Mono', monospace",
                  textTransform: "none",
                  color: "#0f172a",
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                startIcon={<PersonAddAlt1RoundedIcon />}
                sx={{
                  bgcolor: "#2563eb",
                  borderRadius: "999px",
                  px: 2.2,
                  fontFamily: "'Space Mono', monospace",
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "#1d4ed8",
                    boxShadow: "none",
                  },
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={{ xs: 5, md: 8 }} sx={{ py: { xs: 8, md: 12 } }} alignItems="center">
          <Grid item xs={12} md={7}>
            <MotionBox
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Chip
                label="AI timetable manager"
                sx={{
                  mb: 2.5,
                  bgcolor: "#dbeafe",
                  color: "#1d4ed8",
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                }}
              />

              <Typography
                sx={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                  letterSpacing: "-0.06em",
                  lineHeight: 1,
                  fontSize: { xs: "2.5rem", sm: "3.2rem", md: "4.5rem" },
                  maxWidth: "11ch",
                }}
              >
                Your day is already full. TimeMax helps you plan around it.
              </Typography>

              <Typography
                sx={{
                  mt: 2.5,
                  color: "#475569",
                  fontSize: { xs: "1rem", md: "1.08rem" },
                  lineHeight: 1.9,
                  maxWidth: 620,
                }}
              >
                TimeMax turns your tasks, deadlines, focus limits, and real-life commitments
                into a schedule you can actually follow — not just one that looks good on paper.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowOutwardRoundedIcon />}
                  href="https://timemax-timetable.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    bgcolor: "#2563eb",
                    px: 3,
                    py: 1.4,
                    borderRadius: "999px",
                    fontFamily: "'Space Mono', monospace",
                    textTransform: "none",
                    boxShadow: "none",
                    "&:hover": {
                      bgcolor: "#1d4ed8",
                      boxShadow: "none",
                    },
                  }}
                >
                  Try TimeMax
                </Button>

                <Button
                  variant="outlined"
                  href="https://github.com/suzannet-menon/TimeMax-Timetable-App"
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    px: 3,
                    py: 1.4,
                    borderRadius: "999px",
                    borderColor: "#cbd5e1",
                    color: "#0f172a",
                    fontFamily: "'Space Mono', monospace",
                    textTransform: "none",
                  }}
                >
                  View GitHub
                </Button>
              </Stack>
            </MotionBox>
          </Grid>

          <Grid item xs={12} md={5}>
            <MotionBox
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: "24px",
                  border: "1px solid #e2e8f0",
                  bgcolor: "#ffffff",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 700,
                    mb: 1.5,
                  }}
                >
                  Sample schedule
                </Typography>

                <Stack spacing={1.2}>
                  {[
                    "09:00 – 13:00  College classes",
                    "14:00 – 14:45  Essay writing",
                    "15:00 – 15:45  Chemistry revision",
                    "16:00 – 16:15  Break",
                    "18:00 onwards  Family time blocked",
                  ].map((item) => (
                    <Paper
                      key={item}
                      elevation={0}
                      sx={{
                        p: 1.2,
                        borderRadius: "16px",
                        border: "1px solid #e2e8f0",
                        bgcolor: "#f8fafc",
                      }}
                    >
                      <Typography variant="body2">{item}</Typography>
                    </Paper>
                  ))}
                </Stack>

                <Box
                  sx={{
                    mt: 1.5,
                    p: 1.2,
                    borderRadius: "14px",
                    bgcolor: "#eff6ff",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#1e40af" }}>
                    Risk summary: Thursday is overloaded. Start high-effort work earlier.
                  </Typography>
                </Box>
              </Paper>
            </MotionBox>
          </Grid>
        </Grid>

        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Typography
            sx={{
              fontFamily: "'Space Mono', monospace",
              color: "#2563eb",
              fontWeight: 700,
              fontSize: "0.9rem",
              mb: 1,
            }}
          >
            HOW IT WORKS
          </Typography>

          <Typography
            sx={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              letterSpacing: "-0.04em",
              maxWidth: 680,
              mb: 4,
            }}
          >
            A simple flow that turns messy days into a workable plan.
          </Typography>

          <Grid container spacing={2.5}>
            {steps.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={item.title}>
                <MotionBox
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      height: "100%",
                      borderRadius: "22px",
                      borderColor: "#e2e8f0",
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Avatar
                        variant="rounded"
                        sx={{
                          mb: 2,
                          bgcolor: "#dbeafe",
                          color: "#2563eb",
                          borderRadius: "12px",
                        }}
                      >
                        {item.icon}
                      </Avatar>

                      <Typography
                        sx={{
                          fontFamily: "'Space Mono', monospace",
                          fontWeight: 700,
                          mb: 1,
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography sx={{ color: "#64748b", lineHeight: 1.8 }}>
                        {item.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Typography
            sx={{
              fontFamily: "'Space Mono', monospace",
              color: "#2563eb",
              fontWeight: 700,
              fontSize: "0.9rem",
              mb: 1,
            }}
          >
            WHO IT HELPS
          </Typography>

          <Typography
            sx={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              letterSpacing: "-0.04em",
              maxWidth: 700,
              mb: 2,
            }}
          >
            Built for people whose time never feels fully their own.
          </Typography>

          <Typography
            sx={{
              color: "#475569",
              maxWidth: 760,
              lineHeight: 1.9,
              mb: 4,
            }}
          >
            TimeMax is especially useful for people juggling work, study, and life at the same time —
            and for anyone who finds it hard to turn plans into action.
          </Typography>

          <Grid container spacing={2.5}>
            {impact.map((item, index) => (
              <Grid item xs={12} md={4} key={item.title}>
                <MotionBox
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 3,
                      height: "100%",
                      borderRadius: "22px",
                      borderColor: "#e2e8f0",
                    }}
                  >
                    <Stack direction="row" spacing={1.25} alignItems="center" mb={1.5}>
                      <Avatar
                        variant="rounded"
                        sx={{
                          bgcolor: "#dbeafe",
                          color: "#2563eb",
                          borderRadius: "12px",
                        }}
                      >
                        {item.icon}
                      </Avatar>

                      <Typography
                        sx={{
                          fontFamily: "'Space Mono', monospace",
                          fontWeight: 700,
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Stack>

                    <Typography sx={{ color: "#64748b", lineHeight: 1.8 }}>
                      {item.text}
                    </Typography>
                  </Paper>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ borderColor: "#e2e8f0" }} />

        <Box
          sx={{
            py: 3,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography sx={{ fontFamily: "'Space Mono', monospace", color: "#64748b" }}>
            TimeMax
          </Typography>
          <Typography sx={{ color: "#94a3b8" }}>
            Built as a student portfolio project
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}