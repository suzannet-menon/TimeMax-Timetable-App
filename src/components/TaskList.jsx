import { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import { motion, AnimatePresence } from "framer-motion"

function TaskList({ tasks, removetask, edittask }) {
  const [editingIndex, setEditingIndex] = useState(null)
  const [editData, setEditData] = useState({})

  const startEdit = (index) => {
    setEditingIndex(index)
    setEditData({ ...tasks[index] })
  }

  const saveEdit = () => {
    edittask(editingIndex, editData)
    setEditingIndex(null)
    setEditData({})
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditData({})
  }

  const getDaysLeft = (deadline) => {
    if (!deadline) return null
    return Math.ceil((new Date(deadline) - new Date()) / 86400000)
  }

  const getDeadlineLabel = (deadline) => {
    const d = getDaysLeft(deadline)
    if (d === null) return "No deadline"
    if (d < 0) return "Overdue!"
    if (d === 0) return "Due today!"
    return `Due in ${d} day${d === 1 ? "" : "s"}`
  }

  const getDeadlineColor = (deadline) => {
    const d = getDaysLeft(deadline)
    if (d === null) return "default"
    if (d < 0) return "error"
    if (d <= 2) return "error"
    if (d <= 5) return "warning"
    return "success"
  }

  const effortEmoji = { low: "🟢", medium: "🟡", high: "🔴" }
  const energyEmoji = { fresh: "⚡", moderate: "😐", tired: "😴" }

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" mb={2.5}>
        Keep the list clean before generating your schedule. Edit anything that looks unrealistic.
      </Typography>

      {tasks.length === 0 && (
        <Box
          sx={{
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: "18px",
            p: 3,
            bgcolor: "background.default",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No tasks yet. Add your first task above.
          </Typography>
        </Box>
      )}

      <AnimatePresence>
        {tasks.map((task, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: "12px" }}
          >
            <Card variant="outlined" sx={{ borderRadius: "20px" }}>
              <CardContent sx={{ p: 2 }}>
                {editingIndex === index ? (
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Typography variant="subtitle2" sx={{ fontFamily: "'Space Mono', monospace" }}>
                      Edit task
                    </Typography>

                    <Box display="flex" flexWrap="wrap" gap={2}>
                      <Box sx={{ minWidth: 220, flex: "1 1 240px" }}>
                        <Typography variant="caption" color="text.secondary">
                          Task Name
                        </Typography>
                        <TextField
                          value={editData.taskname || ""}
                          onChange={(e) => setEditData({ ...editData, taskname: e.target.value })}
                          sx={{ mt: 0.5 }}
                        />
                      </Box>

                      <Box sx={{ minWidth: 160, flex: "1 1 160px" }}>
                        <Typography variant="caption" color="text.secondary">
                          Deadline
                        </Typography>
                        <TextField
                          type="date"
                          value={editData.deadline || ""}
                          onChange={(e) => setEditData({ ...editData, deadline: e.target.value })}
                          sx={{ mt: 0.5 }}
                        />
                      </Box>

                      <Box sx={{ minWidth: 160, flex: "1 1 160px" }}>
                        <Typography variant="caption" color="text.secondary">
                          Effort
                        </Typography>
                        <TextField
                          select
                          value={editData.effort || "medium"}
                          onChange={(e) => setEditData({ ...editData, effort: e.target.value })}
                          sx={{ mt: 0.5 }}
                        >
                          <MenuItem value="low">🟢 Low</MenuItem>
                          <MenuItem value="medium">🟡 Medium</MenuItem>
                          <MenuItem value="high">🔴 High</MenuItem>
                        </TextField>
                      </Box>

                      <Box sx={{ minWidth: 160, flex: "1 1 160px" }}>
                        <Typography variant="caption" color="text.secondary">
                          Energy
                        </Typography>
                        <TextField
                          select
                          value={editData.energy || "moderate"}
                          onChange={(e) => setEditData({ ...editData, energy: e.target.value })}
                          sx={{ mt: 0.5 }}
                        >
                          <MenuItem value="fresh">⚡ Fresh</MenuItem>
                          <MenuItem value="moderate">😐 Moderate</MenuItem>
                          <MenuItem value="tired">😴 Tired</MenuItem>
                        </TextField>
                      </Box>
                    </Box>

                    <Divider />

                    <Box display="flex" gap={1} flexWrap="wrap">
                      <Button variant="contained" startIcon={<CheckIcon />} onClick={saveEdit}>
                        Save
                      </Button>
                      <Button variant="outlined" startIcon={<CloseIcon />} onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    gap={2}
                    flexDirection={{ xs: "column", sm: "row" }}
                  >
                    <Box flex={1}>
                      <Typography
                        sx={{
                          fontFamily: "'Space Mono', monospace",
                          fontWeight: 700,
                          fontSize: "0.96rem",
                          mb: 1.2,
                        }}
                      >
                        {task.taskname}
                      </Typography>

                      <Box display="flex" gap={1} flexWrap="wrap">
                        <Chip label={getDeadlineLabel(task.deadline)} color={getDeadlineColor(task.deadline)} size="small" />
                        <Chip label={`${effortEmoji[task.effort]} ${task.effort} effort`} size="small" variant="outlined" />
                        <Chip label={`${energyEmoji[task.energy]} ${task.energy}`} size="small" variant="outlined" />
                      </Box>
                    </Box>

                    <Box display="flex" gap={0.5}>
                      <IconButton size="small" onClick={() => startEdit(index)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => removetask(index)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  )
}

export default TaskList