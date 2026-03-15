import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import Chip from "@mui/material/Chip"
import { motion } from "framer-motion"

function TaskForm({ taskname, setTaskname, deadline, setDeadline, effort, setEffort, energy, setEnergy, addtask }) {

  const daysLeft = deadline
    ? Math.ceil((new Date(deadline) - new Date()) / 86400000)
    : null

  const deadlineColor = daysLeft === null ? "default"
    : daysLeft < 0 ? "error"
    : daysLeft <= 2 ? "error"
    : daysLeft <= 5 ? "warning"
    : "success"

  const deadlineLabel = daysLeft === null ? null
    : daysLeft < 0 ? "Overdue!"
    : daysLeft === 0 ? "Due today!"
    : `Due in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`

  return (
    <Box mb={4}>
      <Typography
        variant="h6"
        fontWeight="700"
        mb={2}
        sx={{ fontFamily: "'Space Mono', monospace" }}
      >
        Add a Task
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2} alignItems="flex-start">

        <Box>
          <Typography variant="caption" color="text.secondary">Task Name</Typography>
          <TextField
            placeholder="e.g. Write essay"
            value={taskname}
            onChange={(e) => setTaskname(e.target.value)}
            size="small"
            sx={{ display: "block", mt: 0.5, width: "200px" }}
          />
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">Deadline</Typography>
          <TextField
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            size="small"
            sx={{ display: "block", mt: 0.5 }}
          />
          {deadlineLabel && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Chip
                label={deadlineLabel}
                color={deadlineColor}
                size="small"
                sx={{ mt: 0.5 }}
              />
            </motion.div>
          )}
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">Effort Level</Typography>
          <TextField
            select
            value={effort}
            onChange={(e) => setEffort(e.target.value)}
            size="small"
            sx={{ display: "block", mt: 0.5, width: "160px" }}
          >
            <MenuItem value="low">🟢 Low effort</MenuItem>
            <MenuItem value="medium">🟡 Medium effort</MenuItem>
            <MenuItem value="high">🔴 High effort</MenuItem>
          </TextField>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">Your Energy Right Now</Typography>
          <TextField
            select
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
            size="small"
            sx={{ display: "block", mt: 0.5, width: "160px" }}
          >
            <MenuItem value="fresh">⚡ Fresh</MenuItem>
            <MenuItem value="moderate">😐 Moderate</MenuItem>
            <MenuItem value="tired">😴 Tired</MenuItem>
          </TextField>
        </Box>

        <Box display="flex" alignItems="flex-end" pb={0.5}>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              onClick={addtask}
              sx={{
                mt: 2.5,
                fontFamily: "'Space Mono', monospace",
                fontSize: "12px"
              }}
            >
              + Add Task
            </Button>
          </motion.div>
        </Box>

      </Box>
    </Box>
  )
}

export default TaskForm