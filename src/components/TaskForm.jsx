import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { motion } from "framer-motion"

const MotionDiv = motion.create("div")

function parseDateInput(value) {
  if (!value) return null
  const [year, month, day] = value.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return Number.isNaN(date.getTime()) ? null : date
}

function TaskForm({
  taskname,
  setTaskname,
  deadline,
  setDeadline,
  effort,
  setEffort,
  energy,
  setEnergy,
  addtask,
}) {
  const deadlineDate = parseDateInput(deadline)
  const daysLeft = deadlineDate ? Math.ceil((deadlineDate - new Date()) / 86400000) : null

  const deadlineColor =
    daysLeft === null
      ? "default"
      : daysLeft < 0
        ? "error"
        : daysLeft <= 2
          ? "error"
          : daysLeft <= 5
            ? "warning"
            : "success"

  const deadlineLabel =
    daysLeft === null
      ? null
      : daysLeft < 0
        ? "Overdue"
        : daysLeft === 0
          ? "Due today"
          : `Due in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`

  return (
    <Box>
      <Typography sx={{ color: "text.secondary", mb: 2.4, lineHeight: 1.8 }}>
        Add enough detail for the AI to prioritize intelligently and keep your workload realistic.
      </Typography>

      <Stack spacing={2}>
        <Stack direction={{ xs: "column", lg: "row" }} spacing={2}>
          <TextField
            label="Task name"
            placeholder="Write essay intro"
            value={taskname}
            onChange={(event) => setTaskname(event.target.value)}
            fullWidth
          />
          <TextField
            label="Deadline"
            type="date"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            select
            label="Effort level"
            value={effort}
            onChange={(event) => setEffort(event.target.value)}
            fullWidth
          >
            <MenuItem value="low">Low effort</MenuItem>
            <MenuItem value="medium">Medium effort</MenuItem>
            <MenuItem value="high">High effort</MenuItem>
          </TextField>

          <TextField
            select
            label="Energy right now"
            value={energy}
            onChange={(event) => setEnergy(event.target.value)}
            fullWidth
          >
            <MenuItem value="fresh">Fresh</MenuItem>
            <MenuItem value="moderate">Moderate</MenuItem>
            <MenuItem value="tired">Tired</MenuItem>
          </TextField>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={1.5}
        >
          <Box>{deadlineLabel ? <Chip label={deadlineLabel} color={deadlineColor} /> : null}</Box>

          <MotionDiv whileTap={{ scale: 0.98 }}>
            <Button
              variant="contained"
              onClick={addtask}
              sx={{
                px: 2.8,
                py: 1.2,
                borderRadius: 999,
                fontFamily: '"Space Mono", monospace',
                boxShadow: "0 14px 26px rgba(37,99,235,0.22)",
              }}
            >
              Add task
            </Button>
          </MotionDiv>
        </Stack>
      </Stack>
    </Box>
  )
}

export default TaskForm
