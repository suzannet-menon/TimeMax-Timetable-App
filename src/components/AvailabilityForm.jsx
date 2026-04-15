import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Alert from "@mui/material/Alert"
import { motion } from "framer-motion"

function AvailabilityForm({ availability, setAvailability }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight="700"
          mb={0.5}
          sx={{ fontFamily: "'Space Mono', monospace" }}
        >
          Availability Windows
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          If you want tighter planning, describe your free windows directly.
        </Typography>

        <TextField
          multiline
          rows={6}
          placeholder={`Example:
9:00am – 11:00am: College lectures
11:00am – 12:00pm: Free
1:00pm – 2:00pm: Lunch
2:00pm – 4:00pm: Free
6:00pm onwards: Family time`}
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        />

        {availability?.trim() && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
            <Alert severity="success" sx={{ mt: 2 }}>
              Availability saved — the AI can use these time windows.
            </Alert>
          </motion.div>
        )}
      </Box>
    </motion.div>
  )
}

export default AvailabilityForm