import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const ChatHelpSeeker = () => {
  const [conversation, setConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [helpCreator, setHelpCreator] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { creatorId } = useParams(); // Get the help creator ID from the route

  // Get current user data from localStorage
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    if (userId && role === 'help_seeker') {
      setCurrentUser(userId);
    }
  }, []);

  // Fetch help creator details
  useEffect(() => {
    if (!creatorId) return;

    const fetchHelpCreator = async () => {
      try {
        const response = await axios.get(
          `https://satillite-town-backend-5i11.vercel.app/api/auth/user/getCustomerById/${creatorId}`
        );
        setHelpCreator(response.data.data);
      } catch (error) {
        console.error('Error fetching help creator:', error);
      }
    };

    fetchHelpCreator();
  }, [creatorId]);

  // Initialize socket connection and fetch conversation
  useEffect(() => {
    if (!currentUser || !creatorId) return;

    // Initialize socket connection
    socketRef.current = io('https://satillite-town-backend-5i11.vercel.app', {
      withCredentials: true,
      transports: ['websocket']
    });

    // Authenticate with the server
    socketRef.current.emit('authenticate', currentUser);

    // Set up message listeners
    socketRef.current.on('new_message', (message) => {
      setConversation(prev => {
        if (!prev) return prev;
        
        const newMessage = {
          _id: message._id || Date.now().toString(),
          content: message.message,
          timestamp: message.timestamp || new Date().toISOString(),
          isBroadcast: false,
          sender: {
            _id: message.from,
            email: prev.participants[message.from]?.email || '',
            role: 'help_creator'
          },
          recipient: {
            _id: currentUser,
            email: prev.participants[currentUser]?.email || '',
            role: 'help_seeker'
          }
        };

        return {
          ...prev,
          messages: [...prev.messages, newMessage]
        };
      });
    });

    // Fetch conversation between current user and help creator
    const fetchConversation = async () => {
      try {
        const response = await axios.get(
          `https://satillite-town-backend-5i11.vercel.app/api/auth/user/conversation/${currentUser}/${creatorId}`
        );
        setConversation(response.data.data);
      } catch (error) {
        console.error('Error fetching conversation:', error);
        // If no conversation exists, create a new one with empty messages
        setConversation({
          _id: `${currentUser}_${creatorId}`,
          participants: {
            [currentUser]: {
              _id: currentUser,
              role: 'help_seeker'
            },
            [creatorId]: {
              _id: creatorId,
              role: 'help_creator'
            }
          },
          messages: []
        });
      }
    };

    fetchConversation();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [currentUser, creatorId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() || !creatorId || !conversation || isSending) return;

    setIsSending(true);
    
    try {
      // Optimistically add the message to UI
      const tempMessage = {
        _id: Date.now().toString(),
        content: newMessage,
        timestamp: new Date().toISOString(),
        isBroadcast: false,
        sender: {
          _id: currentUser,
          role: 'help_seeker'
        },
        recipient: {
          _id: creatorId,
          role: 'help_creator'
        }
      };

      setConversation(prev => ({
        ...prev,
        messages: [...prev.messages, tempMessage]
      }));

      setNewMessage('');

      // Send message via socket
      socketRef.current.emit('send_message', {
        recipientId: creatorId,
        text: newMessage
      });

      // Also send to API to persist the message
      await axios.post(
        'https://satillite-town-backend-5i11.vercel.app/api/auth/user/sendMessage',
        {
          senderId: currentUser,
          recipientId: creatorId,
          message: newMessage
        }
      );

    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full mt-2 shadow-lg rounded-lg overflow-hidden">
      <div className="bg-[#006679] text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-semibold">Chat with Help Creator</span>
        </div>
        {helpCreator && (
          <span className="text-sm">
            {helpCreator.firstName} {helpCreator.lastName} ({helpCreator.email})
          </span>
        )}
      </div>

      <div className="p-4 space-y-4 h-96 overflow-y-auto">
        {conversation?.messages.length > 0 ? (
          conversation.messages.map((message) => (
            <div 
              key={message._id} 
              className={`flex ${message.sender._id === currentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`rounded-lg p-3 max-w-sm text-sm ${
                  message.sender._id === currentUser 
                    ? 'bg-[#006679] text-white' 
                    : 'bg-gray-300 text-black'
                }`}
              >
                <div className="font-semibold">
                  {message.sender._id === currentUser ? 'You' : helpCreator?.firstName || 'Help Creator'}
                </div>
                {message.content}
                <div className="text-xs mt-1 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className='bg-gray-100 p-4 flex gap-6'>
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
          className='w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder="Type your message..."
          disabled={!creatorId || isSending}
        />
        <button 
          onClick={handleSendMessage}
          disabled={!creatorId || !newMessage.trim() || isSending}
          className="bg-[#006679] text-white px-4 py-2 rounded-lg hover:bg-[#005266] transition-colors disabled:opacity-50"
        >
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatHelpSeeker;