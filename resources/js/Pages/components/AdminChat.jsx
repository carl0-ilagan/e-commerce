// resources/js/Components/AdminChat.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { Send } from 'lucide-react'

export default function AdminChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { text: inputMessage, sender: 'user' }])
      setInputMessage('')
      // Simulate admin response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Thank you for your message. An admin will respond shortly.", sender: 'admin' }])
      }, 1000)
    }
  }

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-[400px] h-[700px] flex flex-col"> {/* Increased height from 500px to 700px */}
          <div className="bg-blue-500 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">Chat with Admin</h3>
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-2 right-2 text-white hover:text-gray-200"
              aria-label="Close chat"
            >
              &times;
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto max-h-[600px]"> {/* Increased max-height for conversation area */}
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                  {message.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Chat with Admin
        </button>
      )}
    </div>
  )
}