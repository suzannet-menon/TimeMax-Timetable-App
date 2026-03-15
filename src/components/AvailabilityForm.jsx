import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Alert from "@mui/material/Alert"
import { motion } from "framer-motion"

function AvailabilityForm({ availability, setAvailability }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Box>
        <Typography
          variant="h6"
          fontWeight="700"
          mb={1}
          sx={{ fontFamily: "'Space Mono', monospace" }}
        >
          My Day Today
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Describe your commitments and free windows. The AI will only schedule tasks during your free time.
        </Typography>
        <TextField
          multiline
          rows={7}
          fullWidth
          placeholder={`Example:\n9:00am – 11:00am: College lectures\n11:00am – 12:00pm: Free\n1:00pm – 2:00pm: Lunch\n2:00pm – 4:00pm: Free\n6:00pm onwards: Family time, not available`}
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          variant="outlined"
        />
        {availability?.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert severity="success" sx={{ mt: 2 }}>
              ✓ Availability saved — the AI will respect this when building your schedule!
            </Alert>
          </motion.div>
        )}
      </Box>
    </motion.div>
  )
}

export default AvailabilityForm