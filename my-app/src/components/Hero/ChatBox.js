import React, { useState, useEffect, useRef } from 'react';
import { Send, X } from 'lucide-react';
import './ChatBox.css';
import chatbotLogo from '../../assets/12.jpg';
import userLogo from '../../assets/userLogo.jpg'; // Path to user logo


const Chatbox = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newUserMessage = { text: message, type: 'user' };
    setChatHistory((prev) => [...prev, newUserMessage]);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8085/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const result = await response.text();
      const newBotMessage = { text: result, type: 'bot' };
      setChatHistory((prev) => [...prev, newBotMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chatbox active">
      <div className="chatbox-header">
        
        <span className="chatbox-title">Chat with us</span>
        <button onClick={onClose} className="chatbox-close">
          <X size={20} />
        </button>
      </div>
      <div className="chatbox-body" ref={chatBodyRef}>
        {chatHistory.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.type}`}>
            <div className="message-text">{msg.text}</div>
            
          </div>
        ))}
      </div>
      <div className="chatbox-footer">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
