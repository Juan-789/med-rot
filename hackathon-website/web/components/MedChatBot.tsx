import React, { useState, useRef, useEffect } from "react";

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const MedChatBot: React.FC = () => {
  // Chat messages in local state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Hello! I'm your medication assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  // Controlled input state
  const [input, setInput] = useState("");

  // Loading state to show spinner while the AI responds
  const [isLoading, setIsLoading] = useState(false);

  // Reference for scrolling to the bottom of the chat
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mock API call function - replace this with your actual API call
  const sendMessageToAPI = async (message: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple mock responses - replace with actual API integration
    if (message.toLowerCase().includes("aspirin")) {
      return "Aspirin is commonly used to relieve minor aches and pain and to reduce fever. It may also help prevent blood clots, reducing the risk of heart attacks and strokes.";
    } else if (message.toLowerCase().includes("ibuprofen")) {
      return "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain, reduce inflammation, and lower fever.";
    } else if (message.toLowerCase().includes("side effect")) {
      return "Most medications have potential side effects. Could you specify which medication you're asking about?";
    } else {
      return "I can provide information about various medications, their uses, and side effects. Could you please specify which medication you're interested in?";
    }
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    // Prevent sending empty or whitespace-only messages
    if (!input.trim()) return;

    // Create a user message object
    const userMessage: ChatMessage = {
      text: input.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    // Add it to the conversation immediately
    setMessages((prev) => [...prev, userMessage]);

    // Clear the input and show the loading spinner
    setInput("");
    setIsLoading(true);

    try {
      // Call the API (or mock function in this case)
      const response = await sendMessageToAPI(userMessage.text);

      // Create a bot response object
      const botResponse: ChatMessage = {
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      // Add bot response to the conversation
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error:", error);

      // Fallback error message
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I couldn't process your request at this time.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      // Hide the spinner
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full shadow-lg rounded-lg bg-white max-w-xs">
      {/* Chat Header */}
      <div className="p-3 border-b bg-gray-50 rounded-t-lg">
        <h2 className="text-lg font-semibold text-gray-700">Med Assistant</h2>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-lg max-w-[80%] ${
              msg.isUser
                ? "self-end bg-blue-100 text-blue-900"
                : "self-start bg-gray-100 text-gray-800"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
            <span className="text-xs opacity-70 block mt-1">
              {msg.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center my-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Invisible div to scroll into view */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input & Send Button */}
      <div className="p-3 border-t flex items-center">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Ask about a medication..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          className={`p-2 rounded-r ${
            isLoading || !input.trim()
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {/* Send Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};