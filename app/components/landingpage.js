import { useEffect, useState } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import Page from "./chat"; // Adjust the path as needed
import { UserAuth } from "../context/AuthContext"; // Adjust the path as needed

export default function ChatApp() {
  const { user, googleSignIn, logOut } = UserAuth(); // Access user and auth methods
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn(); // Attempt to sign in
    } catch (error) {
      console.log("Sign-in error:", error); // Handle sign-in error
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut(); // Log out user
    } catch (error) {
      console.log("Sign-out error:", error); // Handle sign-out error
    }
  };

  useEffect(() => {
    setLoading(false); // Set loading to false
  }, [user]);

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
      {user ? (
        <Page onSignOut={handleSignOut} />
      ) : (
        <LandingPage onStartChat={handleSignIn} />
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
        backgroundImage: 'url(/LandingPagebg.png)', // Ensure this image path is correct
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
          Sign In
        </Button>
        <Button variant="outlined" onClick={onStartChat}>
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
}
