import React from 'react';
import { Box, Grid, Typography, TextField, Button, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'rgb(39, 37, 37)', color: 'gray', p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
            Bulking
          </Typography>
          <Typography variant="body2">
            Get fit, stay healthy, and live life on your terms without fitness being an obstacle.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={2}>
          <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
            Home
          </Typography>
          <Typography variant="body2">Programs</Typography>
          <Typography variant="body2">Membership</Typography>
          <Typography variant="body2">Blog</Typography>
        </Grid>

        <Grid item xs={12} sm={2}>
          <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
            Contact
          </Typography>
          <Typography variant="body2">About Us</Typography>
          <Typography variant="body2">Terms of Service</Typography>
          <Typography variant="body2">Privacy Policy</Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
            Newsletter
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Your email here"
              InputProps={{
                style: { color: 'white', backgroundColor: '#333' }, // Dark gray input background
              }}
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'gray', // Default border color
                  },
                  '&:hover fieldset': {
                    borderColor: 'white', // Hover border color
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'red', // Focused border color (red when focused)
                  },
                },
                input: {
                  color: 'white', // Input text color
                },
              }}
            />
            <Button
              variant="contained"
              color="error" // Red color for the button
              sx={{ bgcolor: 'red' }}
            >
              Send
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ color: 'gray' }}>
          © 2024 achu® Global Inc.
        </Typography>
        <Box>
          <IconButton sx={{ color: 'gray' }} aria-label="LinkedIn">
            <LinkedInIcon />
          </IconButton>
          <IconButton sx={{ color: 'gray' }} aria-label="Facebook">
            <FacebookIcon />
          </IconButton>
          <IconButton sx={{ color: 'gray' }} aria-label="Instagram">
            <InstagramIcon />
          </IconButton>
          <IconButton sx={{ color: 'gray' }} aria-label="YouTube">
            <YouTubeIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
