import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Alert from "@mui/material/Alert"
import { motion } from "framer-motion"

function CommitmentsForm({ commitments, setCommitments }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "12px",
          p: 3,
          mb: 3
        }}
      >
        <Typography
          variant="h6"
          fontWeight="700"
          mb={0.5}
          sx={{ fontFamily: "'Space Mono', monospace" }}
        >
          Commitments & Blocked Time
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Tell the AI what's already taken up in your schedule — classes, meals, 
          family time, gym, anything. Be as conversational as you like. The AI 
          will read this and plan only around your free windows.
        </Typography>

        <Box
          sx={{
            bgcolor: "action.hover",
            borderRadius: "8px",
            p: 1.5,
            mb: 2
          }}
        >
          <Typography variant="caption" color="text.secondary" fontStyle="italic">
            💬 Example: "I have college from 9 to 1 every weekday. Lunch takes me 
            till 2. Evenings after 8pm I don't work. Wednesday afternoon I have 
            a lab session from 2 to 5. Weekends I'm mostly free but Sunday morning 
            is for family."
          </Typography>
        </Box>

        <TextField
          multiline
          rows={5}
          fullWidth
          placeholder="Describe your week — classes, meals, fixed appointments, blocked time..."
          value={commitments}
          onChange={(e) => setCommitments(e.target.value)}
          variant="outlined"
        />

        {commitments?.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert severity="success" sx={{ mt: 2 }}>
              ✓ Got it — the AI will plan around your commitments
            </Alert>
          </motion.div>
        )}
      </Box>
    </motion.div>
  )
}

export default CommitmentsForm