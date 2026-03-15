import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { motion } from "framer-motion"

function FocusPicker({ focusminutes, setFocusminutes }) {
  return (
    <Box mb={4}>
      <Typography
        variant="h6"
        fontWeight="700"
        mb={1}
        sx={{ fontFamily: "'Space Mono', monospace" }}
      >
        Focus Duration
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        How long can you focus in one sitting?
      </Typography>
      <Box display="flex" gap={1} flexWrap="wrap" alignItems="center">
        {[15, 25, 45, 90].map(mins => (
          <motion.div
            key={mins}
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button
              variant={focusminutes === mins ? "contained" : "outlined"}
              onClick={() => setFocusminutes(mins)}
              sx={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "12px",
                borderRadius: "999px",
                px: 2.5
              }}
            >
              {mins} min
            </Button>
          </motion.div>
        ))}
        <TextField
          type="number"
          label="Custom"
          size="small"
          value={focusminutes}
          onChange={(e) => setFocusminutes(Number(e.target.value))}
          sx={{ width: "100px" }}
        />
      </Box>
    </Box>
  )
}

export default FocusPicker