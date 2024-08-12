import { useEffect, useState } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import Page from "./chat"; // Adjust the path as needed

export default function ChatApp() {
  const [loading, setLoading] = useState(true);
  const [chatStarted, setChatStarted] = useState(false);

  useEffect(() => {
    setLoading(false); // Set loading to false
  }, []);

  if (loading) return <Typography>Loading...</Typography>; // Display loading message

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="grey.100"
    >
      {chatStarted ? (
        <Page />
      ) : (
        <LandingPage onStartChat={() => setChatStarted(true)} />
      )}
    </Box>
  );
}

function LandingPage({ onStartChat }) {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: '/LandingPagebg.png', // Ensure this image path is correct
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Stack
        spacing={2}
        alignItems="center"
        bgcolor="rgba(255, 255, 255, 0.8)"
        p={4}
        borderRadius={2}
      >
        <Typography variant="h2" component="h1" align="center">
          Welcome to MAAN
        </Typography>
        <Typography variant="h6" component="h2" align="center">
          Your Personal AI Companion
        </Typography>
        <Button variant="contained" onClick={onStartChat}>
          Start Chat
        </Button>
      </Stack>
    </Box>
  );
}
