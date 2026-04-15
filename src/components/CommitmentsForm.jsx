import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Alert from "@mui/material/Alert"
import { motion } from "framer-motion"

function CommitmentsForm({ commitments, setCommitments }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight="700"
          mb={0.5}
          sx={{ fontFamily: "'Space Mono', monospace" }}
        >
          Commitments & Blocked Time
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          Write naturally. Classes, meals, family time, gym, commute, appointments — anything the AI should plan around.
        </Typography>

        <Box
          sx={{
            bgcolor: "action.hover",
            borderRadius: "14px",
            p: 1.5,
            mb: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary" fontStyle="italic">
            Example: “I have college from 9 to 1 every weekday. Lunch till 2. Wednesday 2 to 5 is lab.
            Evenings after 8pm I do not work. Sundays are mostly family time.”
          </Typography>
        </Box>

        <TextField
          multiline
          rows={5}
          placeholder="Describe your week in plain language..."
          value={commitments}
          onChange={(e) => setCommitments(e.target.value)}
        />

        {commitments?.trim() && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
            <Alert severity="success" sx={{ mt: 2 }}>
              Commitments saved — the AI will plan around them.
            </Alert>
          </motion.div>
        )}
      </Box>
    </motion.div>
  )
}

export default CommitmentsForm