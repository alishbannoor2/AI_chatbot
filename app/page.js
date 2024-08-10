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

export default function Home() {
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
    if (!message.trim() || isLoading) return; // Prevent sending empty or duplicate messages
    setIsLoading(true);

    // Add user's message and a placeholder for assistant's response
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    setMessage(""); // Clear the input field

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
      bgcolor={grey[100]}
      p={2}
    >
      <Stack
        direction="column"
        width={isMobile ? "90vw" : "500px"}
        height={isMobile ? "80vh" : "80vh"}
        border={isMobile ? "none" : `1px solid ${grey[300]}`}
        borderRadius={2}
        bgcolor="white"
        p={2}
        spacing={2}
        boxShadow={3}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Link href="https://github.com/iam-weijie/ai-companion" target="_blank" rel="noopener noreferrer">
            <Avatar
              src="chatbot-pfp.png"
              alt="MAAN"
              sx={{ width: isMobile ? 60 : 80, height: isMobile ? 60 : 80, mb: 1 }}
            />
          </Link>
          <Typography
            variant="h6"
            sx={{ fontSize: isMobile ? "1rem" : "1.25rem", fontWeight: "bold" }}
          >
            MAAN
          </Typography>
        </Box>
        <Divider />
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={msg.role === "assistant" ? "flex-start" : "flex-end"}
            >
              <Box
                bgcolor={msg.role === "assistant" ? grey[200] : blue[600]}
                color={msg.role === "assistant" ? "black" : "white"}
                borderRadius={4}
                p={2}
                maxWidth="80%"
                wordBreak="break-word"
              >
                {msg.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Divider />
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            variant="outlined"
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={isLoading}
            sx={{ height: "100%" }}
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
