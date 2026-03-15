import { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import { motion, AnimatePresence } from "framer-motion"

function TaskList({ tasks, removetask, edittask, generateschedule, loading }) {

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
    if (d <= 2) return "error"
    if (d <= 5) return "warning"
    return "success"
  }

  const effortEmoji = { low: "🟢", medium: "🟡", high: "🔴" }
  const energyEmoji = { fresh: "⚡", moderate: "😐", tired: "😴" }

  return (
    <Box mb={4}>
      <Typography
        variant="h6"
        fontWeight="700"
        mb={2}
        sx={{ fontFamily: "'Space Mono', monospace" }}
      >
        Your Tasks
      </Typography>

      {tasks.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No tasks added yet. Add one above!
        </Typography>
      )}

      <AnimatePresence>
        {tasks.map((task, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ marginBottom: "10px" }}
          >
            <Card variant="outlined">
              <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>

                {editingIndex === index ? (
                  // EDIT MODE
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" flexWrap="wrap" gap={2}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Task Name</Typography>
                        <TextField
                          size="small"
                          value={editData.taskname}
                          onChange={(e) => setEditData({ ...editData, taskname: e.target.value })}
                          sx={{ display: "block", mt: 0.5, width: "200px" }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Deadline</Typography>
                        <TextField
                          type="date"
                          size="small"
                          value={editData.deadline}
                          onChange={(e) => setEditData({ ...editData, deadline: e.target.value })}
                          sx={{ display: "block", mt: 0.5 }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Effort</Typography>
                        <TextField
                          select
                          size="small"
                          value={editData.effort}
                          onChange={(e) => setEditData({ ...editData, effort: e.target.value })}
                          sx={{ display: "block", mt: 0.5, width: "150px" }}
                        >
                          <MenuItem value="low">🟢 Low</MenuItem>
                          <MenuItem value="medium">🟡 Medium</MenuItem>
                          <MenuItem value="high">🔴 High</MenuItem>
                        </TextField>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Energy</Typography>
                        <TextField
                          select
                          size="small"
                          value={editData.energy}
                          onChange={(e) => setEditData({ ...editData, energy: e.target.value })}
                          sx={{ display: "block", mt: 0.5, width: "150px" }}
                        >
                          <MenuItem value="fresh">⚡ Fresh</MenuItem>
                          <MenuItem value="moderate">😐 Moderate</MenuItem>
                          <MenuItem value="tired">😴 Tired</MenuItem>
                        </TextField>
                      </Box>
                    </Box>
                    <Box display="flex" gap={1}>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<CheckIcon />}
                        onClick={saveEdit}
                        sx={{ fontFamily: "'Space Mono', monospace", fontSize: "11px" }}
                      >
                        Save
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<CloseIcon />}
                        onClick={cancelEdit}
                        sx={{ fontFamily: "'Space Mono', monospace", fontSize: "11px" }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  // VIEW MODE
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
                      <Typography fontWeight="600" sx={{ fontFamily: "'Space Mono', monospace", fontSize: "13px" }}>
                        {task.taskname}
                      </Typography>
                      <Chip
                        label={getDeadlineLabel(task.deadline)}
                        color={getDeadlineColor(task.deadline)}
                        size="small"
                      />
                      <Chip
                        label={`${effortEmoji[task.effort]} ${task.effort} effort`}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={`${energyEmoji[task.energy]} ${task.energy}`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Box display="flex" gap={0.5}>
                      <IconButton
                        size="small"
                        onClick={() => startEdit(index)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => removetask(index)}
                      >
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

      {tasks.length > 0 && (
        <motion.div
          whileTap={{ scale: 0.97 }}
          style={{ display: "inline-block", marginTop: "16px" }}
        >
          <Button
            variant="contained"
            size="large"
            disabled={loading}
            onClick={generateschedule}
            sx={{ fontFamily: "'Space Mono', monospace", fontSize: "13px" }}
          >
            {loading ? "⏳ Generating..." : "✨ Build My Schedule"}
          </Button>
        </motion.div>
      )}
    </Box>
  )
}

export default TaskList