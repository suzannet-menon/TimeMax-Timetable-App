import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { AnimatePresence, motion } from "framer-motion"

const MotionDiv = motion.create("div")

function TaskList({ tasks, removetask, edittask }) {
  const [editingIndex, setEditingIndex] = useState(null)
  const [editData, setEditData] = useState({})

  const getDaysLeft = (deadline) => {
    if (!deadline) return null
    return Math.ceil((new Date(deadline) - new Date()) / 86400000)
  }

  const getDeadlineLabel = (deadline) => {
    const value = getDaysLeft(deadline)
    if (value === null) return "No deadline"
    if (value < 0) return "Overdue"
    if (value === 0) return "Due today"
    return `Due in ${value} day${value === 1 ? "" : "s"}`
  }

  const getDeadlineColor = (deadline) => {
    const value = getDaysLeft(deadline)
    if (value === null) return "default"
    if (value < 0 || value <= 2) return "error"
    if (value <= 5) return "warning"
    return "success"
  }

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

  return (
    <Box>
      <Typography sx={{ color: "text.secondary", mb: 2.4, lineHeight: 1.8 }}>
        Review the list before generating. A cleaner input always leads to a better schedule.
      </Typography>

      {tasks.length === 0 ? (
        <Box
          sx={{
            p: 3.5,
            borderRadius: 5,
            border: "1px dashed rgba(148,163,184,0.35)",
            bgcolor: "rgba(248,250,252,0.72)",
            textAlign: "center",
          }}
        >
          <Typography sx={{ color: "text.secondary" }}>
            No tasks yet. Add your first task above and TimeMax will start building the plan.
          </Typography>
        </Box>
      ) : null}

      <AnimatePresence>
        {tasks.map((task, index) => (
          <MotionDiv
            key={`${task.taskname}-${index}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28 }}
            style={{ marginTop: index === 0 ? 0 : 12 }}
          >
            <Card
              variant="outlined"
              sx={{
                borderRadius: 5,
                borderColor: "rgba(226,232,240,0.95)",
                boxShadow: "0 12px 30px rgba(15,23,42,0.04)",
              }}
            >
              <CardContent sx={{ p: 2.2 }}>
                {editingIndex === index ? (
                  <Stack spacing={2}>
                    <Typography sx={{ fontFamily: '"Space Mono", monospace', fontWeight: 700 }}>
                      Edit task
                    </Typography>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                      <TextField
                        label="Task name"
                        value={editData.taskname || ""}
                        onChange={(event) =>
                          setEditData((current) => ({ ...current, taskname: event.target.value }))
                        }
                        fullWidth
                      />
                      <TextField
                        label="Deadline"
                        type="date"
                        value={editData.deadline || ""}
                        onChange={(event) =>
                          setEditData((current) => ({ ...current, deadline: event.target.value }))
                        }
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Stack>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                      <TextField
                        select
                        label="Effort"
                        value={editData.effort || "medium"}
                        onChange={(event) =>
                          setEditData((current) => ({ ...current, effort: event.target.value }))
                        }
                        fullWidth
                      >
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                      </TextField>

                      <TextField
                        select
                        label="Energy"
                        value={editData.energy || "moderate"}
                        onChange={(event) =>
                          setEditData((current) => ({ ...current, energy: event.target.value }))
                        }
                        fullWidth
                      >
                        <MenuItem value="fresh">Fresh</MenuItem>
                        <MenuItem value="moderate">Moderate</MenuItem>
                        <MenuItem value="tired">Tired</MenuItem>
                      </TextField>
                    </Stack>

                    <Divider />

                    <Stack direction="row" spacing={1.2}>
                      <Button variant="contained" startIcon={<CheckIcon />} onClick={saveEdit}>
                        Save
                      </Button>
                      <Button variant="outlined" startIcon={<CloseIcon />} onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </Stack>
                  </Stack>
                ) : (
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={2}
                  >
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography
                        sx={{
                          fontFamily: '"Space Mono", monospace',
                          fontWeight: 700,
                          fontSize: "0.96rem",
                          mb: 1.2,
                          wordBreak: "break-word",
                        }}
                      >
                        {task.taskname}
                      </Typography>

                      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        <Chip label={getDeadlineLabel(task.deadline)} color={getDeadlineColor(task.deadline)} />
                        <Chip label={`${task.effort} effort`} variant="outlined" />
                        <Chip label={task.energy} variant="outlined" />
                      </Stack>
                    </Box>

                    <Stack direction="row" spacing={0.5}>
                      <IconButton size="small" onClick={() => startEdit(index)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => removetask(index)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </MotionDiv>
        ))}
      </AnimatePresence>
    </Box>
  )
}

export default TaskList
