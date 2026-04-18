import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material"
import { motion } from "framer-motion"

const MotionDiv = motion.create("div")

function Schedule({ schedule }) {
  if (!schedule) return null

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontFamily: '"Space Mono", monospace',
          fontWeight: 700,
          mb: 2.5,
          letterSpacing: "-0.04em",
        }}
      >
        Your generated schedule
      </Typography>

      {schedule.riskSummary ? (
        <MotionDiv initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            {schedule.riskSummary}
          </Alert>
        </MotionDiv>
      ) : null}

      {schedule.warnings?.length ? (
        <Box sx={{ mb: 2 }}>
          {schedule.warnings.map((warning, index) => (
            <MotionDiv
              key={`${warning}-${index}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <Alert severity="warning" sx={{ mb: 1 }}>
                {warning}
              </Alert>
            </MotionDiv>
          ))}
        </Box>
      ) : null}

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
          <MotionDiv
            key={`${day.date}-${dayIndex}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: dayIndex * 0.05 }}
          >
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                borderRadius: 6,
                borderColor: "rgba(226,232,240,0.95)",
                boxShadow: "0 18px 45px rgba(15,23,42,0.05)",
              }}
            >
              <CardContent sx={{ p: 2.2 }}>
                <Chip
                  label={day.date}
                  sx={{
                    mb: 2,
                    bgcolor: "rgba(37,99,235,0.12)",
                    color: "#2563eb",
                    fontFamily: '"Space Mono", monospace',
                    fontWeight: 700,
                  }}
                />

                <Stack spacing={1.3}>
                  {day.schedule?.map((block, index) => (
                    <Card
                      key={`${block.time}-${index}`}
                      variant="outlined"
                      sx={{
                        borderRadius: 4,
                        borderColor: "rgba(226,232,240,0.95)",
                        borderLeft: block.task.toLowerCase().includes("break")
                          ? "4px solid #94a3b8"
                          : "4px solid #2563eb",
                        overflow: "hidden",
                      }}
                    >
                      <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" alignItems="center" sx={{ mb: 0.8 }}>
                          <Chip
                            label={block.time}
                            size="small"
                            variant="outlined"
                            sx={{ fontFamily: '"Space Mono", monospace', fontSize: "0.72rem" }}
                          />
                          <Typography
                            sx={{
                              fontFamily: '"Space Mono", monospace',
                              fontWeight: 700,
                              fontSize: "0.82rem",
                              wordBreak: "break-word",
                            }}
                          >
                            {block.task}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {block.duration}
                          </Typography>
                        </Stack>

                        {block.tip ? (
                          <>
                            <Divider sx={{ my: 0.8 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                              Tip: {block.tip}
                            </Typography>
                          </>
                        ) : null}
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </MotionDiv>
        ))}
      </Box>
    </Box>
  )
}

export default Schedule
