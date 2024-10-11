import React, { useState } from "react";
import { Client, Databases } from "appwrite";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import './admindash.css'

// Appwrite client configuration
const client = new Client();
client
  .setEndpoint("YOUR_APPWRITE_ENDPOINT") // Replace with your Appwrite endpoint
  .setProject("YOUR_PROJECT_ID"); // Replace with your project ID

const databases = new Databases(client);

const AddGym: React.FC = () => {
  const [gymName, setGymName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Replace 'YOUR_DATABASE_ID' and 'YOUR_COLLECTION_ID' with your actual database and collection IDs
      const response = await databases.createDocument(
        'YOUR_DATABASE_ID',
        'YOUR_COLLECTION_ID',
        'unique()',
        {
          gymName,
          isOpen,
          address,
          city,
          openingTime,
          closingTime,
          managerName,
          managerEmail,
        }
      );
      console.log('Gym added successfully:', response);
      // Optionally reset the form fields or show a success message
      setGymName('');
      setIsOpen(false);
      setAddress('');
      setCity('');
      setOpeningTime('');
      setClosingTime('');
      setManagerName('');
      setManagerEmail('');
    } catch (error) {
      console.error('Error adding gym:', error);
      // Optionally show an error message
    }
  };

  // Animation variants
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "#1F1F1F", // Dark background color
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fff' }}>
          GYM
        </Typography>
        <form onSubmit={handleSubmit}>
          {[
            {
              label: "Gym Name",
              value: gymName,
              setter: setGymName,
              type: "text",
            },
            {
              label: "Address",
              value: address,
              setter: setAddress,
              type: "text",
            },
            { label: "City", value: city, setter: setCity, type: "text" },
            {
              label: "Opening Time",
              value: openingTime,
              setter: setOpeningTime,
              type: "time",
            },
            {
              label: "Closing Time",
              value: closingTime,
              setter: setClosingTime,
              type: "time",
            },
            {
              label: "Manager Name",
              value: managerName,
              setter: setManagerName,
              type: "text",
            },
            {
              label: "Manager Email",
              value: managerEmail,
              setter: setManagerEmail,
              type: "email",
            },
          ].map(({ label, value, setter, type }, index) => (
            <motion.div
              key={index}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              style={{ marginBottom: "16px" }}
            >
              <TextField
                fullWidth
                label={label}
                variant="outlined"
                type={type}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      color: "#f50057", // Change focused label color to red
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    bgcolor: '#2E2E2E', // Input background color
                    "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#f50057",
                    },
                    // Add styles for the text type specifically
                    '& input': {
                     color:'white',
                      padding: '14px', // Padding
                    },
                  },
                }}
                value={value}
                onChange={(e) => setter(e.target.value)}
                required
              />
            </motion.div>
          ))}
          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            style={{ marginBottom: "16px" }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={isOpen}
                  onChange={(e) => setIsOpen(e.target.checked)}
                  sx={{
                    color: "#f50057",
                    "&.Mui-checked": { color: "#f50057" },
                  }}
                />
              }
              label={<Typography sx={{ color: "#fff" }}>Is Open</Typography>}
            />
          </motion.div>
          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            style={{ marginTop: "16px" }}
          >
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
              Add Gym Details
            </motion.button>
          </motion.div>
        </form>
      </Box>
    </Container>
  );
};

export default AddGym;
