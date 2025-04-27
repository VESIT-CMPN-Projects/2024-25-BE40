import React, { useState } from 'react';
import { Send, Menu } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { sendMessage } from '../api/chat';
import type { ChatMessage } from '../types';
import Markdown from 'react-markdown';

interface LayoutContext {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const Chat: React.FC = () => {
  const { setIsSidebarOpen } = useOutletContext<LayoutContext>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const botResponse = await sendMessage(message);
      setMessages(prevMessages => [...prevMessages, botResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="ml-4 text-lg font-semibold text-gray-900">Chat</h1>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 prose ${
                msg.sender === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-900'
              }`}
            >
              {msg.sender === "user" ? (
                msg.content
              ) : (
                <Markdown>{msg.content}</Markdown>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
          >
            {isLoading ? (
              'Sending...'
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};