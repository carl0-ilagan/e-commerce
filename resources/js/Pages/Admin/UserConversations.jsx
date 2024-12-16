import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

const UserConversations = () => {
  const [conversations, setConversations] = useState([
    { id: 1, user: 'John Doe', lastMessage: 'Hello, I have a question about my order.', unread: true },
    { id: 2, user: 'Jane Smith', lastMessage: 'Thank you for your help!', unread: false },
    { id: 3, user: 'Mike Johnson', lastMessage: 'When will my order be shipped?', unread: true },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real application, you would send this message to your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-1/3 bg-white rounded-lg shadow-md overflow-hidden">
        <h3 className="text-lg font-semibold p-4 border-b">Conversations</h3>
        <ul className="divide-y divide-gray-200">
          {conversations.map((conv) => (
            <li
              key={conv.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedConversation === conv.id ? 'bg-gray-100' : ''}`}
              onClick={() => setSelectedConversation(conv.id)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{conv.user}</span>
                {conv.unread && <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>}
              </div>
              <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 bg-white rounded-lg shadow-md ml-4 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="flex-1 p-4 overflow-y-auto">
              {/* Chat messages would go here */}
              <p className="text-center text-gray-500">Select a conversation to view messages</p>
            </div>
            <form onSubmit={handleSendMessage} className="border-t p-4 flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="button" className="bg-gray-200 p-2 rounded-none">
                <Paperclip size={20} />
              </button>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600">
                <Send size={20} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserConversations;

