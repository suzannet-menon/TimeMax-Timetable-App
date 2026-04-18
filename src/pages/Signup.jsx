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
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded"
import BoltRoundedIcon from "@mui/icons-material/BoltRounded"
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded"
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded"
import { motion } from "framer-motion"

const MotionPaper = motion.create(Paper)

const metrics = [
  { label: "Smart blocks", value: "45 min" },
  { label: "Stress reduced", value: "High" },
  { label: "Daily clarity", value: "Instant" },
]

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const helperMessage = useMemo(() => {
    return "Create a local account for this prototype and go straight into the app."
  }, [])

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    if (error) setError("")
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Complete all fields to create your account.")
      return
    }

    if (form.password !== form.confirmPassword) {
      setError("Your passwords do not match.")
      return
    }

    const user = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    }

    localStorage.setItem("timemax-user", JSON.stringify(user))
    localStorage.setItem("timemax-session-user", JSON.stringify({ name: user.name, email: user.email }))
    localStorage.setItem("timemax-auth", "true")
    navigate("/app", { replace: true })
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #ffffff 0%, #f6f9ff 42%, #edf4ff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 15% 15%, rgba(37,99,235,0.12), transparent 28%), radial-gradient(circle at 80% 10%, rgba(14,165,233,0.10), transparent 22%)",
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

          <Button component={Link} to="/login" variant="outlined" sx={{ borderRadius: 999 }}>
            Login
          </Button>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "0.95fr 1.05fr" },
            gap: { xs: 3, md: 4 },
            alignItems: "stretch",
          }}
        >
          <MotionPaper
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 8,
              background:
                "linear-gradient(145deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.94) 100%)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at top right, rgba(37,99,235,0.34), transparent 30%)",
              }}
            />

            <Stack spacing={3} sx={{ position: "relative", zIndex: 1 }}>
              <Chip
                icon={<AutoAwesomeRoundedIcon sx={{ color: "#60a5fa !important" }} />}
                label="AI timetable onboarding"
                sx={{
                  width: "fit-content",
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
                  maxWidth: 420,
                }}
              >
                Create your premium planning workspace
              </Typography>

              <Typography sx={{ color: "rgba(226,232,240,0.8)", lineHeight: 1.8, maxWidth: 520 }}>
                Sign up once and start turning deadlines, classes, and energy patterns into smooth
                daily plans that feel intentionally designed.
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0,1fr))",
                  gap: 1.4,
                }}
              >
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.14 + index * 0.08 }}
                  >
                    <Box
                      sx={{
                        p: 1.6,
                        borderRadius: 4,
                        bgcolor: "rgba(15,23,42,0.58)",
                        border: "1px solid rgba(148,163,184,0.15)",
                        minHeight: 108,
                      }}
                    >
                      <Typography sx={{ color: "rgba(226,232,240,0.7)", fontSize: "0.82rem", mb: 1 }}>
                        {metric.label}
                      </Typography>
                      <Typography sx={{ fontFamily: '"Space Mono", monospace', fontSize: "1.35rem" }}>
                        {metric.value}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>

              <Stack spacing={1.2}>
                {[
                  [<BoltRoundedIcon key="bolt" sx={{ color: "#60a5fa", fontSize: 18 }} />, "Fast local sign-in flow for your prototype"],
                  [<InsightsRoundedIcon key="insight" sx={{ color: "#60a5fa", fontSize: 18 }} />, "Beautiful task planning experience across the app"],
                  [<AutoAwesomeRoundedIcon key="auto" sx={{ color: "#60a5fa", fontSize: 18 }} />, "AI schedule output with polished presentation"],
                ].map(([icon, text]) => (
                  <Stack key={text} direction="row" spacing={1.2} alignItems="center">
                    {icon}
                    <Typography sx={{ color: "rgba(226,232,240,0.82)" }}>{text}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </MotionPaper>

          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            elevation={0}
            sx={{
              p: { xs: 3, md: 4.5 },
              borderRadius: 8,
              background: "linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(248,250,252,0.95) 100%)",
              border: "1px solid rgba(226,232,240,0.95)",
              boxShadow: "0 30px 80px rgba(15,23,42,0.08)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Space Mono", monospace',
                fontWeight: 700,
                letterSpacing: "-0.04em",
                mb: 1.5,
              }}
            >
              Create your account
            </Typography>

            <Typography sx={{ color: "text.secondary", lineHeight: 1.8, mb: 3 }}>
              Start planning tasks around your real day with a cleaner, more intentional workflow.
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Full name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                />
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
                <TextField
                  label="Confirm password"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                />

                {error ? <Alert severity="error">{error}</Alert> : <Alert severity="info">{helperMessage}</Alert>}

                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<PersonAddAlt1RoundedIcon />}
                  sx={{
                    py: 1.5,
                    borderRadius: 999,
                    fontFamily: '"Space Mono", monospace',
                    boxShadow: "0 18px 40px rgba(37,99,235,0.25)",
                  }}
                >
                  Create account and open app
                </Button>
              </Stack>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1.5}>
              <Typography color="text.secondary">
                Already have an account?{" "}
                <Box component={Link} to="/login" sx={{ color: "#2563eb", fontWeight: 700 }}>
                  Login
                </Box>
              </Typography>
              <Typography color="text.secondary">
                <Box component={Link} to="/" sx={{ color: "#2563eb", fontWeight: 700 }}>
                  Back to landing page
                </Box>
              </Typography>
            </Stack>
          </MotionPaper>
        </Box>
      </Container>
    </Box>
  )
}
