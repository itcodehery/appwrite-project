import { Button, Box, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import hiImage from '../assets/images/hi3.webp'; // Correct image path
import { Link } from 'react-router-dom';

const StrengthProgram = () => {
  return (
    <Box
      className="strength-program"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2rem',
        background: 'linear-gradient(135deg, #000, #333)',
        backgroundAttachment: 'fixed',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        maxWidth: '1200px',
        margin: 'auto',
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-100%',
          left: '-100%',
          background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(0,0,0,0))',
          animation: 'rotateBackground 15s linear infinite', // Animated background
        },
        '@keyframes rotateBackground': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }}
    >
      {/* Left Side Content */}
      <Box
        className="text-content"
        sx={{
          maxWidth: '500px',
          padding: '2rem',
          backgroundColor: '#1c1c1c',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)',
          }}
        >
          Customized Gym Slot Booking, Tailored Just for You
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: '#ddd' }}>
          Avoid crowds and book your gym slot at the time that suits you best. Real-time updates and a seamless booking experience.
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon
              sx={{
                '& svg': {
                  animation: 'bounce 2s infinite', // Animate check icon
                },
                '@keyframes bounce': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-5px)' },
                },
              }}
            >
              <CheckCircleIcon sx={{ color: 'rgb(242, 255, 0)' }} />
            </ListItemIcon>
            <ListItemText primary="Real-time gym slot booking" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: 'rgb(242, 255, 0)' }} />
            </ListItemIcon>
            <ListItemText primary="Up-to-date capacity information" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: 'rgb(242, 255, 0)' }} />
            </ListItemIcon>
            <ListItemText primary="Seamless, easy-to-use interface" sx={{ color: '#fff' }} />
          </ListItem>
        </List>
        <Button
          variant="contained"
          component={Link}
          to="/timeslot"
          sx={{
            marginTop: '1rem',
            color:'black',
            backgroundColor: 'rgb(242, 255, 0);',
            '&:hover': {
              backgroundColor: '#333',
              color:'white',
              transform: 'scale(1.05)',
              boxShadow: '0 0 15px 5px rgba(0, 0, 0, 0.6)',
              transition: 'all 0.3s ease',
            },
          }}
        >
          Book Your Slot Now
        </Button>
      </Box>

      {/* Right Side Image */}
      <Box
        className="image-content"
        sx={{
          marginLeft: '2rem',
          padding: '1rem',
          backgroundColor: '#1c1c1c',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          perspective: '1000px',
          img: {
            transform: 'rotateY(0deg)', // Default state
            transition: 'transform 1s ease', // Transition outside hover
          },
          '&:hover img': {
            transform: 'rotateY(15deg)', // Hover state
          }
        }}
      >
        <img
          src={hiImage}
          alt="Gym Slot Booking"
          className="strength-image"
          style={{ borderRadius: '10px', width: '100%', maxWidth: '450px' }}
        />
      </Box>
    </Box>
  );
};

export default StrengthProgram;
