import React from "react";
import { useLocation } from "react-router-dom";
import { Paper, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserResult() {
  const location = useLocation();

  if (location.state) {
    return (
      <Paper
        sx={{
          padding: "2rem",
          maxWidth: "400px",
          margin: "2rem auto",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Your Result
        </Typography>
        <Box
          sx={{
            marginBottom: "1rem",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h5" color="primary">
            Score: {location.state.score}
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        padding: "2rem",
        maxWidth: "450px",
        margin: "2rem auto",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        No Result Available
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Please submit the test to check your result.
      </Typography>
    </Paper>
  );
}

export default UserResult;
