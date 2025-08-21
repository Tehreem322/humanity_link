import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const ChatForm = () => {
  const [conversation, setConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [helpCreators, setHelpCreators] = useState([]); // For help_seekers to select creators
  const [helpSeekers, setHelpSeekers] = useState([]); // For help_creators to select seekers
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Get user data from localStorage
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    if (userId && role) {
      setCurrentUser(userId);
      setUserRole(role);
    }
  }, []);

  // Fetch appropriate users based on current user's role
  useEffect(() => {
    if (!userRole) return;

    const fetchUsers = async () => {
      try {
        if (userRole === 'help_creator') {
          const response = await axios.get(
            'http://localhost:3000/api/auth/user/getAllCustomers?role=help_seeker'
          );
          setHelpSeekers(response.data.data);
        } else {
          const response = await axios.get(
            'http://localhost:3000/api/auth/user/getAllCustomers?role=help_creator'
          );
          setHelpCreators(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [userRole]);

  // Initialize socket connection
  useEffect(() => {
    if (!currentUser) return;

    // socketRef.current = io('https://satillite-town-backend-5i11.vercel.app', {
    //   withCredentials: true,
    //   transports: ['websocket']
    // });
 socketRef.current = io('http://localhost:3000', {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      upgrade: true,
      forceNew: true,
      timeout: 10000,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
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
            role: prev.participants[message.from]?.role || ''
          },
          recipient: {
            _id: message.from === currentUser ? selectedRecipient : currentUser,
            email: message.from === currentUser 
              ? prev.participants[selectedRecipient]?.email || ''
              : prev.participants[currentUser]?.email || '',
            role: message.from === currentUser
              ? prev.participants[selectedRecipient]?.role || ''
              : prev.participants[currentUser]?.role || ''
          }
        };

        return {
          ...prev,
          messages: [...prev.messages, newMessage]
        };
      });
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [currentUser, selectedRecipient]);

  // Fetch conversation when recipient changes
  useEffect(() => {
    if (!currentUser || !selectedRecipient) return;

    const fetchConversation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/auth/user/conversation/${currentUser}/${selectedRecipient}`
        );
        setConversation(response.data.data);
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
    };

    fetchConversation();
  }, [currentUser, selectedRecipient]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() || !selectedRecipient || !conversation || isSending) return;

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
          email: conversation.participants[currentUser]?.email || '',
          role: userRole
        },
        recipient: {
          _id: selectedRecipient,
          email: conversation.participants[selectedRecipient]?.email || '',
          role: userRole === 'help_creator' ? 'help_seeker' : 'help_creator'
        }
      };

      setConversation(prev => ({
        ...prev,
        messages: [...prev.messages, tempMessage]
      }));

      setNewMessage('');

      // Send message via socket
      socketRef.current.emit('send_message', {
        recipientId: selectedRecipient,
        text: newMessage
      });

    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  // Determine which users to show in dropdown based on current role
  const availableUsers = userRole === 'help_creator' ? helpSeekers : helpCreators;

  return (
    <div className="w-full mt-2 shadow-lg rounded-lg overflow-hidden">
      <div className="bg-[#006679] text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-semibold">Chat</span>
          <select
            value={selectedRecipient || ''}
            onChange={(e) => setSelectedRecipient(e.target.value)}
            className="p-2 rounded bg-white text-black"
          >
            <option value="">Select {userRole === 'help_creator' ? 'help seeker' : 'help creator'}</option>
            {availableUsers.map(user => (
              <option key={user._id} value={user._id}>
                {user.firstName} {user.lastName} ({user.email})
              </option>
            ))}
          </select>
        </div>
        {selectedRecipient && (
          <span className="text-sm">
            Chatting with: {availableUsers.find(u => u._id === selectedRecipient)?.firstName || 'User'}
          </span>
        )}
      </div>

      <div className="p-4 space-y-4 h-96 overflow-y-auto">
        {conversation?.messages.map((message) => (
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
                {message.sender._id === currentUser ? 'You' : 
                  availableUsers.find(u => u._id === message.sender._id)?.firstName || 'User'}
              </div>
              {message.content}
              <div className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
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
          disabled={!selectedRecipient || isSending}
        />
        <button 
          onClick={handleSendMessage}
          disabled={!selectedRecipient || !newMessage.trim() || isSending}
          className="bg-[#006679] text-white px-4 py-2 rounded-lg hover:bg-[#005266] transition-colors disabled:opacity-50"
        >
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};



export default ChatForm;