import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import Alert from "@mui/material/Alert"
import Divider from "@mui/material/Divider"
import { motion, AnimatePresence } from "framer-motion"

function Schedule({ schedule }) {
  if (!schedule) return null

  return (
    <Box mt={4}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Typography
          variant="h6"
          fontWeight="700"
          mb={2}
          sx={{ fontFamily: "'Space Mono', monospace" }}
        >
          Your Schedule
        </Typography>
      </motion.div>

      {schedule.riskSummary && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Alert severity="info" sx={{ mb: 2 }}>
            {schedule.riskSummary}
          </Alert>
        </motion.div>
      )}

      {schedule.warnings?.length > 0 && (
        <Box mb={2}>
          {schedule.warnings.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
            >
              <Alert severity="warning" sx={{ mb: 1 }}>
                {w}
              </Alert>
            </motion.div>
          ))}
        </Box>
      )}

      <AnimatePresence>
        {schedule.days?.map((day, dayIndex) => (
          <motion.div
            key={dayIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: dayIndex * 0.1 }}
          >
            <Box mb={4}>
              <Box
                sx={{
                  display: "inline-block",
                  px: 2,
                  py: 0.5,
                  mb: 2,
                  borderRadius: "999px",
                  background: "primary.main",
                  bgcolor: "#2563eb",
                  color: "white",
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight="700"
                  sx={{ fontFamily: "'Space Mono', monospace", color: "white" }}
                >
                  {day.date}
                </Typography>
              </Box>

              <Box display="flex" flexDirection="column" gap={1.5}>
                {day.schedule?.map((block, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: dayIndex * 0.1 + i * 0.07 }}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        borderLeft: block.task.toLowerCase().includes("break")
                          ? "4px solid #9e9e9e"
                          : "4px solid #2563eb",
                      }}
                    >
                      <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
                        <Box display="flex" alignItems="center" gap={1.5} mb={0.5} flexWrap="wrap">
                          <Chip
                            label={block.time}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ fontFamily: "'Space Mono', monospace", fontSize: "11px" }}
                          />
                          <Typography
                            fontWeight="600"
                            sx={{ fontFamily: "'Space Mono', monospace", fontSize: "13px" }}
                          >
                            {block.task}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {block.duration}
                          </Typography>
                        </Box>
                        {block.tip && (
                          <>
                            <Divider sx={{ my: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                              💡 {block.tip}
                            </Typography>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  )
}

export default Schedule