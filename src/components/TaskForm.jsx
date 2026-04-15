import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import Chip from "@mui/material/Chip"
import Grid from "@mui/material/Grid"
import { motion } from "framer-motion"

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
  const daysLeft = deadline ? Math.ceil((new Date(deadline) - new Date()) / 86400000) : null

  const deadlineColor =
    daysLeft === null ? "default" : daysLeft < 0 ? "error" : daysLeft <= 2 ? "error" : daysLeft <= 5 ? "warning" : "success"

  const deadlineLabel =
    daysLeft === null ? null : daysLeft < 0 ? "Overdue!" : daysLeft === 0 ? "Due today!" : `Due in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" mb={2.5}>
        Add a task with enough detail for the AI to prioritise it properly.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Typography variant="caption" color="text.secondary" display="block" mb={0.75}>
            Task Name
          </Typography>
          <TextField
            placeholder="e.g. Write essay intro"
            value={taskname}
            onChange={(e) => setTaskname(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2.5}>
          <Typography variant="caption" color="text.secondary" display="block" mb={0.75}>
            Deadline
          </Typography>
          <TextField type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          {deadlineLabel && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
              <Chip label={deadlineLabel} color={deadlineColor} size="small" sx={{ mt: 0.8 }} />
            </motion.div>
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={2.25}>
          <Typography variant="caption" color="text.secondary" display="block" mb={0.75}>
            Effort Level
          </Typography>
          <TextField select value={effort} onChange={(e) => setEffort(e.target.value)}>
            <MenuItem value="low">🟢 Low effort</MenuItem>
            <MenuItem value="medium">🟡 Medium effort</MenuItem>
            <MenuItem value="high">🔴 High effort</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2.25}>
          <Typography variant="caption" color="text.secondary" display="block" mb={0.75}>
            Energy Right Now
          </Typography>
          <TextField select value={energy} onChange={(e) => setEnergy(e.target.value)}>
            <MenuItem value="fresh">⚡ Fresh</MenuItem>
            <MenuItem value="moderate">😐 Moderate</MenuItem>
            <MenuItem value="tired">😴 Tired</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <motion.div whileTap={{ scale: 0.98 }} style={{ display: "inline-block" }}>
            <Button
              variant="contained"
              onClick={addtask}
              sx={{
                px: 2.8,
                py: 1.2,
                bgcolor: "#2563eb",
                "&:hover": { bgcolor: "#1d4ed8" },
              }}
            >
              + Add Task
            </Button>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TaskForm