import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import Alert from "@mui/material/Alert"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import { motion } from "framer-motion"

function Schedule({ schedule }) {
  if (!schedule) return null

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontFamily: "'Space Mono', monospace",
          fontWeight: 700,
          mb: 2.5,
          letterSpacing: "-0.04em",
        }}
      >
        Your generated schedule
      </Typography>

      {schedule.riskSummary && (
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            {schedule.riskSummary}
          </Alert>
        </motion.div>
      )}

      {schedule.warnings?.length > 0 && (
        <Box mb={2}>
          {schedule.warnings.map((warning, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Alert severity="warning" sx={{ mb: 1 }}>
                {warning}
              </Alert>
            </motion.div>
          ))}
        </Box>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(3, minmax(0, 1fr))",
          },
          gap: 2,
        }}
      >
        {schedule.days?.map((day, dayIndex) => (
          <motion.div
            key={dayIndex}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: dayIndex * 0.06 }}
          >
            <Card variant="outlined" sx={{ borderRadius: "24px", height: "100%" }}>
              <CardContent sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    px: 1.8,
                    py: 0.7,
                    mb: 2,
                    borderRadius: "999px",
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

                <Stack spacing={1.4}>
                  {day.schedule?.map((block, i) => (
                    <Card
                      key={i}
                      variant="outlined"
                      sx={{
                        borderRadius: "18px",
                        borderLeft: block.task.toLowerCase().includes("break")
                          ? "4px solid #94a3b8"
                          : "4px solid #2563eb",
                      }}
                    >
                      <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
                        <Box display="flex" flexWrap="wrap" gap={1} alignItems="center" mb={0.8}>
                          <Chip
                            label={block.time}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ fontFamily: "'Space Mono', monospace", fontSize: "11px" }}
                          />
                          <Typography
                            fontWeight="700"
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
                            <Divider sx={{ my: 0.8 }} />
                            <Typography variant="body2" color="text.secondary">
                              💡 {block.tip}
                            </Typography>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  )
}

export default Schedule