import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "rgb(39, 37, 37)", color: "gray", p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
            Spotfit
          </Typography>
          <Typography variant="body2">
            Get fit, stay healthy, and live life on your terms without fitness
            being an obstacle.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
            Newsletter
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Your email here"
              InputProps={{
                style: { color: "white", backgroundColor: "#333" },
              }}
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red",
                  },
                },
                input: {
                  color: "white",
                },
              }}
            />
            <Button variant="contained" color="error" sx={{ bgcolor: "red" }}>
              Send
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" sx={{ color: "gray" }}>
          © 2024 Spotfit. All rights reserved.
        </Typography>
        <Box>
          <IconButton sx={{ color: "gray" }} aria-label="LinkedIn">
            <LinkedInIcon />
          </IconButton>
          <IconButton sx={{ color: "gray" }} aria-label="Facebook">
            <FacebookIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
