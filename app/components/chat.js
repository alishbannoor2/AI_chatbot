"use client";

import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Page() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello, I am MAAN Support, your personal AI companion. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    setMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const lastMessageIndex = updatedMessages.length - 1;
          updatedMessages[lastMessageIndex] = {
            ...updatedMessages[lastMessageIndex],
            content: updatedMessages[lastMessageIndex].content + text,
          };
          return updatedMessages;
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        bgcolor: "#56b8a0", // Background color
        p: 2,
        fontFamily: "'Press Start 2P', sans-serif", // Pixel font
        color: "#d7d8b6", // Text color
      }}
    >
      <Stack
        direction="column"
        width={isMobile ? "90vw" : "500px"}
        height="80vh"
        borderRadius={2}
        bgcolor="#56b8a0" // Updated background color
        p={2}
        spacing={2}
        boxShadow={3}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Link
            href="https://github.com/MalaikaJunaid/AI-Chatbot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Avatar
              src="chatbot-pfp.png"
              alt="MAAN"
              sx={{
                width: isMobile ? 60 : 80,
                height: isMobile ? 60 : 80,
                mb: 1,
              }}
            />
          </Link>
          <Typography
            variant="h6"
            sx={{
              fontSize: isMobile ? "1rem" : "1.25rem",
              fontWeight: "bold",
              color: "#d7d8b6", // Text color
            }}
          >
            MAAN
          </Typography>
        </Box>
        <Divider />
        <Stack direction="column" spacing={2} flexGrow={1} overflow="auto">
          {messages.map((msg, index) => (
            <Stack
              key={index}
              direction={msg.role === "assistant" ? "row" : "row-reverse"}
              spacing={2}
              alignItems="flex-start"
            >
              <Avatar
                src={msg.role === "assistant" ? "chatbot-pfp.png" : "user-pfp.png"} // User's profile picture
                alt={msg.role}
                sx={{
                  width: isMobile ? 40 : 50,
                  height: isMobile ? 40 : 50,
                }}
              />
              <Box
                sx={{
                  bgcolor: msg.role === "assistant" ? grey[200] : blue[600],
                  color: msg.role === "assistant" ? "black" : "white",
                  borderRadius: 4,
                  p: 2,
                  maxWidth: "80%",
                  wordBreak: "break-word",
                  fontFamily: "'Press Start 2P', sans-serif", // Pixel font
                }}
              >
                {msg.content}
              </Box>
            </Stack>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Divider />
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Message"
            fullWidth
            multiline
            rows={isMobile ? 2 : 4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            variant="outlined"
            sx={{
              fontFamily: "'Press Start 2P', sans-serif", // Pixel font
              "& .MuiInputBase-root": {
                fontFamily: "'Press Start 2P', sans-serif", // Pixel font
              },
            }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={isLoading}
            sx={{
              height: "100%",
              fontFamily: "'Press Start 2P', sans-serif", // Pixel font
              bgcolor: "#d7d8b6", // Button color
              color: "black",
            }}
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
