import React, { useState } from "react";
import {databases} from "../../helpers/appwrite"; // Import account from Appwrite

import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  Box,
  Button,
  Snackbar,
  Alert,
  Paper,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

// Define type for gym data
interface GymData {
  gymName: string;
  isOpen: boolean;
  city: string;
  openingTime: string;
  closingTime: string;
  managerName: string;
  managerEmail: string;
}

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      marginBottom: "1rem",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "1rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "0.75rem 1.5rem",
        },
      },
    },
  },
});

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
}));

// Appwrite client configuration


const GymManager = () => {
  const [gymData, setGymData] = useState<GymData>({
    gymName: "",
    isOpen: false,
    city: "",
    openingTime: "",
    closingTime: "",
    managerName: "",
    managerEmail: "",
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  type Field = keyof GymData;

  const handleChange = (field: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setGymData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleRetrieve = async () => {
    setLoading(true);
    try {
      const response = await databases.getDocument(
        "6704c99a003ba58938df",
        "67125e450014869460e4",
        "67125f1d0039d3faf9dc"
      );
      setGymData({
        gymName: response.gym_name,
        isOpen: response.is_open,
        city: response.city,
        openingTime: response.open_time,
        closingTime: response.close_time,
        managerName: response.manager_name,
        managerEmail: response.manager_email,
      });
    } catch (error) {
      console.error("Error retrieving gym data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await databases.updateDocument(
        "6704c99a003ba58938df",
        "67125e450014869460e4",
        "67125f1d0039d3faf9dc",
        {
          gym_name: gymData.gymName,
          is_open: gymData.isOpen,
          city: gymData.city,
          open_time: gymData.openingTime,
          close_time: gymData.closingTime,
          manager_name: gymData.managerName,
          manager_email: gymData.managerEmail,
        }
      );
      setAlertOpen(true);
    } catch (error) {
      console.error("Error updating gym details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <FormContainer>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <FitnessCenterIcon sx={{ fontSize: 40, color: "primary.main", mb: 2 }} />
            <Typography variant="h4">
              Gym Manager
            </Typography>
          </Box>

          <Button
            variant="outlined"
            fullWidth
            onClick={handleRetrieve}
            disabled={loading}
            sx={{ mb: 4 }}
          >
            {loading ? "Loading..." : "Load Gym Details"}
          </Button>

          <form onSubmit={handleUpdate}>
            <TextField
              fullWidth
              label="Gym Name"
              value={gymData.gymName}
              onChange={handleChange("gymName")}
              InputProps={{
                startAdornment: <FitnessCenterIcon sx={{ mr: 1, color: "action.active" }} />,
              }}
              required
            />

            <TextField
              fullWidth
              label="City"
              value={gymData.city}
              onChange={handleChange("city")}
              InputProps={{
                startAdornment: <LocationOnIcon sx={{ mr: 1, color: "action.active" }} />,
              }}
              required
            />

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Opening Time"
                type="time"
                value={gymData.openingTime}
                onChange={handleChange("openingTime")}
                InputProps={{
                  startAdornment: <AccessTimeIcon sx={{ mr: 1, color: "action.active" }} />,
                }}
                required
              />

              <TextField
                fullWidth
                label="Closing Time"
                type="time"
                value={gymData.closingTime}
                onChange={handleChange("closingTime")}
                InputProps={{
                  startAdornment: <AccessTimeIcon sx={{ mr: 1, color: "action.active" }} />,
                }}
                required
              />
            </Box>

            <TextField
              fullWidth
              label="Manager Name"
              value={gymData.managerName}
              onChange={handleChange("managerName")}
              InputProps={{
                startAdornment: <PersonIcon sx={{ mr: 1, color: "action.active" }} />,
              }}
              required
            />

            <TextField
              fullWidth
              label="Manager Email"
              type="email"
              value={gymData.managerEmail}
              onChange={handleChange("managerEmail")}
              InputProps={{
                startAdornment: <EmailIcon sx={{ mr: 1, color: "action.active" }} />,
              }}
              required
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={gymData.isOpen}
                  onChange={(e) =>
                    setGymData((prev) => ({ ...prev, isOpen: e.target.checked }))
                  }
                />
              }
              label="Gym is Open"
              sx={{ my: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? "Updating..." : "Update Gym Details"}
            </Button>
          </form>
        </FormContainer>

        <Snackbar
          open={alertOpen}
          autoHideDuration={3000}
          onClose={() => setAlertOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setAlertOpen(false)}
            severity="success"
          >
            Gym details updated successfully!
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default GymManager;