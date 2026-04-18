import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { motion } from "framer-motion"

const MotionDiv = motion.create("div")

function AvailabilityForm({ availability, setAvailability }) {
  return (
    <MotionDiv initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Box>
        <Typography
          variant="h6"
          sx={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, mb: 0.8 }}
        >
          Availability windows
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 2, lineHeight: 1.8 }}>
          If you want tighter planning, describe exactly when you are free.
        </Typography>

        <TextField
          multiline
          rows={6}
          placeholder={`Example:
09:00 - 11:00 College lectures
11:00 - 12:00 Free
13:00 - 14:00 Lunch
14:00 - 16:00 Free
18:00 onwards Family time`}
          value={availability}
          onChange={(event) => setAvailability(event.target.value)}
          fullWidth
        />

        {availability.trim() ? (
          <MotionDiv initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
            <Alert severity="success" sx={{ mt: 2 }}>
              Availability saved. TimeMax can use these windows directly.
            </Alert>
          </MotionDiv>
        ) : null}
      </Box>
    </MotionDiv>
  )
}

export default AvailabilityForm
