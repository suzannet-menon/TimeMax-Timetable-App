import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { motion } from "framer-motion"

const MotionDiv = motion.create("div")

const options = [15, 25, 45, 90]

function FocusPicker({ focusminutes, setFocusminutes }) {
  return (
    <Box>
      <Typography sx={{ color: "text.secondary", mb: 2.2, lineHeight: 1.8 }}>
        Choose a focus length that feels realistic. TimeMax uses this to split work into usable
        sessions.
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }}>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {options.map((mins) => (
            <MotionDiv key={mins} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant={focusminutes === mins ? "contained" : "outlined"}
                onClick={() => setFocusminutes(mins)}
                sx={{
                  px: 2.4,
                  py: 1,
                  borderRadius: 999,
                  fontFamily: '"Space Mono", monospace',
                  borderColor: "rgba(37,99,235,0.2)",
                  boxShadow:
                    focusminutes === mins ? "0 14px 26px rgba(37,99,235,0.22)" : "none",
                }}
              >
                {mins} min
              </Button>
            </MotionDiv>
          ))}
        </Box>

        <TextField
          label="Custom"
          type="number"
          value={focusminutes}
          onChange={(event) => setFocusminutes(Number(event.target.value) || 0)}
          inputProps={{ min: 5, max: 240 }}
          sx={{ width: { xs: "100%", md: 140 } }}
        />
      </Stack>
    </Box>
  )
}

export default FocusPicker
