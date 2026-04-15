import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import { motion } from "framer-motion"

function FocusPicker({ focusminutes, setFocusminutes }) {
  const options = [15, 25, 45, 90]

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" mb={2.2}>
        Choose a focus block that feels realistic for you. This helps the AI split work into usable sessions.
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}>
        <Box display="flex" gap={1} flexWrap="wrap">
          {options.map((mins) => (
            <motion.div key={mins} whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.03 }}>
              <Button
                variant={focusminutes === mins ? "contained" : "outlined"}
                onClick={() => setFocusminutes(mins)}
                sx={{
                  px: 2.3,
                  borderRadius: 999,
                  fontFamily: "'Space Mono', monospace",
                  bgcolor: focusminutes === mins ? "#2563eb" : "transparent",
                }}
              >
                {mins} min
              </Button>
            </motion.div>
          ))}
        </Box>

        <TextField
          label="Custom"
          type="number"
          value={focusminutes}
          onChange={(e) => setFocusminutes(Number(e.target.value))}
          sx={{ width: { xs: "100%", sm: 120 } }}
        />
      </Stack>
    </Box>
  )
}

export default FocusPicker