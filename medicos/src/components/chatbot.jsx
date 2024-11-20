import React, { useState } from 'react';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  // Function to handle new user message
  const handleNewUserMessage = async (newMessage) => {
    console.log('New user message:', newMessage);  // Debugging line

    // Add user message to the state
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, isUserMessage: true },
    ]);

    // Get the chatbot's response from the backend
    const response = await getChatbotResponse(newMessage);
    console.log('Chatbot response:', response);  // Debugging line

    // Add the chatbot's response to the state
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, isUserMessage: true },
      { text: response, isUserMessage: false },
    ]);
  };

  // Function to get response from the backend
  const getChatbotResponse = async (message) => {
    try {
      console.log('Sending message to backend:', message);  // Debugging line

      const backendResponse = await fetch('http://localhost:5001/chatbot/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await backendResponse.json();
      console.log('Backend response:', data);  // Debugging line

      let response;
      if (data.error) {
        response = data.error;
      } else {
        response = data.answer || 'I couldn\'t get a proper response from the backend.';
      }

      return response;
    } catch (error) {
      console.error('Error getting response:', error);
      return 'Sorry, I couldn\'t process your request.';
    }
  };

  return (
    <div>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="StudyBot"
        subtitle="Ask me anything about your course!"
      />
    </div>
  );
};

export default Chatbot;
