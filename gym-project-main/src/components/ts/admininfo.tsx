import React, { useState } from "react";
import { Client, Databases } from "appwrite";
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
} from "@mui/material";
import { motion } from "framer-motion";
import "../css/admininfo.css";

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

// Appwrite client configuration
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite endpoint
  .setProject("6700b592001d71931ab9"); // Project ID

const databases = new Databases(client);

const AddGym: React.FC = () => {
  const [gymData, setGymData] = useState<GymData>({
    gymName: "",
    isOpen: false,
    city: "",
    openingTime: "",
    closingTime: "",
    managerName: "",
    managerEmail: "",
  });

  const [alertOpen, setAlertOpen] = useState(false); // Alert visibility state

  // Define field names for gymData
  type Field = keyof GymData;

  const handleChange = (field: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setGymData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleRetrieve = async () => {
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
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await databases.updateDocument(
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
      console.log("Gym details updated successfully:", response);
      setAlertOpen(true); // Show alert when update is successful
    } catch (error) {
      console.error("Error updating gym details:", error);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false); // Close alert when dismissed
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "#1F1F1F",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "#fff" }}>
          GYM
        </Typography>
        <Button variant="contained" onClick={handleRetrieve} sx={{ mb: 2 }}>
          Load Gym Details
        </Button>
        <form onSubmit={handleUpdate}>
          {[
            { label: "Gym Name", value: gymData.gymName, field: "gymName", type: "text" },
            { label: "City", value: gymData.city, field: "city", type: "text" },
            { label: "Opening Time", value: gymData.openingTime, field: "openingTime", type: "time" },
            { label: "Closing Time", value: gymData.closingTime, field: "closingTime", type: "time" },
            { label: "Manager Name", value: gymData.managerName, field: "managerName", type: "text" },
            { label: "Manager Email", value: gymData.managerEmail, field: "managerEmail", type: "email" },
          ].map(({ label, value, field, type }, index) => (
            <motion.div key={index} style={{ marginBottom: "16px" }}>
              <TextField
                fullWidth
                label={label}
                variant="outlined"
                type={type}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": { color: "#f50057" },
                  },
                }}
                InputProps={{
                  sx: {
                    bgcolor: "#2E2E2E",
                    "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#f50057",
                    },
                    "& input": {
                      color: "white",
                      padding: "14px",
                    },
                  },
                }}
                value={value}
                onChange={handleChange(field as Field)}
                required
              />
            </motion.div>
          ))}
          <motion.div style={{ marginBottom: "16px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={gymData.isOpen}
                  onChange={(e) =>
                    setGymData((prev) => ({ ...prev, isOpen: e.target.checked }))
                  }
                  sx={{ color: "#f50057", "&.Mui-checked": { color: "#f50057" } }}
                />
              }
              label={<Typography sx={{ color: "#fff" }}>Is Open</Typography>}
            />
          </motion.div>
          <motion.div style={{ marginTop: "16px" }}>
            <motion.button
              type="submit"
              style={{
                display: "block",
                width: "100%",
                padding: "12px",
                backgroundColor: "#f50057",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Update Gym Details
            </motion.button>
          </motion.div>
        </form>
      </Box>
      
      {/* Snackbar for Success Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Gym details updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddGym;
