import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { motion } from "framer-motion"

const MotionDiv = motion.create("div")

function CommitmentsForm({ commitments, setCommitments }) {
  return (
    <MotionDiv initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Box>
        <Typography
          variant="h6"
          sx={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, mb: 0.8 }}
        >
          Commitments and blocked time
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 2, lineHeight: 1.8 }}>
          Write naturally. Classes, meals, family time, commute, appointments, or anything TimeMax
          should schedule around.
        </Typography>

        <Box
          sx={{
            p: 1.8,
            borderRadius: 4,
            bgcolor: "rgba(37,99,235,0.06)",
            border: "1px solid rgba(37,99,235,0.12)",
            mb: 2,
          }}
        >
          <Typography sx={{ color: "text.secondary", fontStyle: "italic", lineHeight: 1.8 }}>
            Example: I have college from 9 to 1 every weekday, lunch until 2, lab on Wednesday from
            2 to 5, and I do not work after 8 pm.
          </Typography>
        </Box>

        <TextField
          multiline
          rows={5}
          placeholder="Describe your week in plain language..."
          value={commitments}
          onChange={(event) => setCommitments(event.target.value)}
          fullWidth
        />

        {commitments.trim() ? (
          <MotionDiv initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
            <Alert severity="success" sx={{ mt: 2 }}>
              Commitments saved. The AI will plan around them.
            </Alert>
          </MotionDiv>
        ) : null}
      </Box>
    </MotionDiv>
  )
}

export default CommitmentsForm
