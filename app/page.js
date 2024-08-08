'use client'

import { useRef } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the MAAN support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // Changed model to gpt-3.5-turbo
          messages: [...messages, { role: 'user', content: message }],
        }),
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();

      // Check if the response contains the expected data
      if (!data || !data.response) {
        throw new Error('Response does not contain expected data.');
      }

      // Add assistant's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: data.response },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error: " + error.message },
      ]);
    }
    setMessage('');
    setIsLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      bgcolor="#121212" // Dark background
      overflow="hidden" // Prevent overflow
    >
      <Typography variant="h4" color="white" mb={2} fontFamily="cursive">MAAN Chatbot</Typography> {/* Heading with custom font */}
      <Stack
        direction={'column'}
        width="500px"
        height="700px"
        border="1px solid #444" // Darker border
        p={2}
        spacing={3}
        bgcolor="#ffffff" // Light background for chat area
        borderRadius={8} // Rounded corners
        overflow="hidden" // Prevent overflow
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
          sx={{
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={msg.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              <Box
                bgcolor={msg.role === 'assistant' ? '#00796b' : '#3f51b5'} // Teal for assistant, blue for user
                color="white"
                borderRadius={16}
                p={2}
                maxWidth="70%" // Limit message width
              >
                {msg.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            variant="outlined"
            InputProps={{
              style: { backgroundColor: '#f5f5f5' }, // Light input background
            }}
          />
          <Button 
            variant="contained" 
            onClick={sendMessage}
            disabled={isLoading}
            style={{ backgroundColor: '#00796b' }} // Button color matching assistant's message
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
