import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import LoginRoundedIcon from "@mui/icons-material/LoginRounded"
import GitHubIcon from "@mui/icons-material/GitHub"
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import { motion } from "framer-motion"

const MotionPaper = motion.create(Paper)

const highlights = [
  "AI arranges your day around real commitments",
  "Focus sessions tuned to your energy level",
  "Schedules stay readable, realistic, and calm",
]

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  const helperText = useMemo(() => {
    if (!form.email && !form.password) return "Use any email and password to continue into the app."
    return "Your session is stored locally for this prototype."
  }, [form.email, form.password])

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    if (error) setError("")
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.email.trim() || !form.password.trim()) {
      setError("Enter both your email and password to continue.")
      return
    }

    const savedUser = localStorage.getItem("timemax-user")
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      if (parsedUser.email && parsedUser.email !== form.email.trim()) {
        setError("This email does not match the account created on this device.")
        return
      }
    }

    localStorage.setItem("timemax-auth", "true")
    localStorage.setItem(
      "timemax-session-user",
      JSON.stringify({
        email: form.email.trim(),
        name: savedUser ? JSON.parse(savedUser).name : form.email.trim().split("@")[0],
      })
    )
    navigate("/app", { replace: true })
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #ffffff 0%, #f4f8ff 48%, #eef4ff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top left, rgba(37,99,235,0.11), transparent 28%), radial-gradient(circle at 88% 12%, rgba(14,165,233,0.10), transparent 24%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, py: { xs: 3, md: 4 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
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

          <Button component={Link} to="/signup" variant="outlined" sx={{ borderRadius: 999 }}>
            Create account
          </Button>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.05fr 0.95fr" },
            gap: { xs: 3, md: 4 },
            alignItems: "stretch",
          }}
        >
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            elevation={0}
            sx={{
              p: { xs: 3, md: 4.5 },
              borderRadius: 8,
              background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.94) 100%)",
              border: "1px solid rgba(226,232,240,0.95)",
              boxShadow: "0 30px 80px rgba(15,23,42,0.08)",
            }}
          >
            <Chip
              icon={<AutoAwesomeRoundedIcon sx={{ color: "#2563eb !important" }} />}
              label="Premium timetable planning"
              sx={{
                mb: 2.5,
                bgcolor: "rgba(37,99,235,0.1)",
                color: "#1d4ed8",
                fontWeight: 700,
              }}
            />

            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Space Mono", monospace',
                fontWeight: 700,
                letterSpacing: "-0.04em",
                mb: 1.5,
              }}
            >
              Welcome back
            </Typography>
            <Typography sx={{ color: "text.secondary", maxWidth: 540, lineHeight: 1.8, mb: 3 }}>
              Log in to continue building polished, AI-generated schedules that feel realistic from
              the first draft.
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  fullWidth
                />

                {error ? <Alert severity="error">{error}</Alert> : <Alert severity="info">{helperText}</Alert>}

                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<LoginRoundedIcon />}
                  sx={{
                    py: 1.5,
                    borderRadius: 999,
                    fontFamily: '"Space Mono", monospace',
                    boxShadow: "0 18px 40px rgba(37,99,235,0.25)",
                  }}
                >
                  Enter TimeMax
                </Button>
              </Stack>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1.5}>
              <Typography color="text.secondary">
                Do not have an account?{" "}
                <Box component={Link} to="/signup" sx={{ color: "#2563eb", fontWeight: 700 }}>
                  Sign up
                </Box>
              </Typography>
              <Typography color="text.secondary">
                <Box component={Link} to="/" sx={{ color: "#2563eb", fontWeight: 700 }}>
                  Back to landing page
                </Box>
              </Typography>
            </Stack>
          </MotionPaper>

          <MotionPaper
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 8,
              background:
                "linear-gradient(145deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.94) 100%)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.08)",
              position: "relative",
              overflow: "hidden",
              minHeight: 520,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at top right, rgba(37,99,235,0.35), transparent 30%)",
                pointerEvents: "none",
              }}
            />

            <Stack spacing={3} sx={{ position: "relative", zIndex: 1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography sx={{ fontFamily: '"Space Mono", monospace', fontSize: "0.95rem" }}>
                  TimeMax Preview
                </Typography>
                <GitHubIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
              </Stack>

              <Box
                sx={{
                  p: 2.2,
                  borderRadius: 5,
                  border: "1px solid rgba(148,163,184,0.16)",
                  bgcolor: "rgba(15,23,42,0.55)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Box>
                    <Typography sx={{ fontFamily: '"Space Mono", monospace', fontWeight: 700 }}>
                      Today&apos;s plan
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(226,232,240,0.75)" }}>
                      Auto-balanced around study energy
                    </Typography>
                  </Box>
                  <CalendarMonthRoundedIcon sx={{ color: "#60a5fa" }} />
                </Stack>

                <Stack spacing={1.2}>
                  {[
                    ["09:00", "High-focus lecture review", "#2563eb"],
                    ["13:30", "Essay writing sprint", "#14b8a6"],
                    ["16:00", "Chemistry revision", "#8b5cf6"],
                  ].map(([time, label, color], index) => (
                    <motion.div
                      key={time}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.15 + index * 0.08 }}
                    >
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "60px minmax(0,1fr)",
                          gap: 1.2,
                          alignItems: "center",
                          p: 1.25,
                          borderRadius: 3,
                          bgcolor: "rgba(15,23,42,0.78)",
                          border: "1px solid rgba(148,163,184,0.14)",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: '"Space Mono", monospace',
                            color: "rgba(226,232,240,0.7)",
                            fontSize: "0.78rem",
                          }}
                        >
                          {time}
                        </Typography>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {label}
                          </Typography>
                          <Box
                            sx={{
                              mt: 0.75,
                              height: 6,
                              borderRadius: 999,
                              bgcolor: "rgba(51,65,85,0.9)",
                              overflow: "hidden",
                            }}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${60 + index * 12}%` }}
                              transition={{ duration: 1, delay: 0.25 + index * 0.1 }}
                              style={{
                                height: "100%",
                                borderRadius: 999,
                                background: color,
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </Box>

              <Stack spacing={1.4}>
                {highlights.map((item) => (
                  <Stack key={item} direction="row" spacing={1.1} alignItems="center">
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#60a5fa",
                        flexShrink: 0,
                      }}
                    />
                    <Typography sx={{ color: "rgba(226,232,240,0.82)", lineHeight: 1.7 }}>
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </MotionPaper>
        </Box>
      </Container>
    </Box>
  )
}
