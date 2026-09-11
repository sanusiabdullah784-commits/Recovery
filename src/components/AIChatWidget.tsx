"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

// ==========================================
// MOCK AI LOGIC (Replace with real API later)
// ==========================================
const getAIResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes("track") || lowerInput.includes("id")) {
    return "You can track your case by visiting the 'Track ID' page and entering your unique Tracking ID (e.g., HLRS-2026-XXXX).";
  }
  if (lowerInput.includes("found") || lowerInput.includes("report")) {
    return "If you found an item, please go to the 'Found/Report' page. You can report it anonymously and even earn a commission if it's matched!";
  }
  if (lowerInput.includes("lost") || lowerInput.includes("complaint")) {
    return "To report a lost item or file a complaint, visit the 'Lost/Complaint' page. You'll need to select a category and pay a small registration fee.";
  }
  if (lowerInput.includes("legal") || lowerInput.includes("lawyer")) {
    return "Our Legal Services category handles litigation, arbitration, and mediation. Select 'Category D' on the complaints page to get started.";
  }
  if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
    return "Hello! I'm the HLRS Assistant. How can I help you recover your property or find legal support today?";
  }
  
  return "I'm not sure about that specific query. For urgent matters, please visit our 'Contact' page or email support@homelandrecovery.ng.";
};

// ==========================================
// MESSAGE TYPES
// ==========================================
type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to Homeland Recovery Services! 👋 How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(userMessage.text),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2s
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    // Positioned bottom-left to avoid overlapping with WhatsApp
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start gap-4">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, originX: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1, originX: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, originX: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-[90vw] sm:w-[380px] h-[500px] max-h-[80vh] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-200/50 dark:border-amber-800/50 flex flex-col overflow-hidden"
          >
            {/* Header with Premium Gold Gradient */}
            <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 p-4 flex items-center justify-between text-white shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">HLRS Assistant</h3>
                  <p className="text-[10px] text-white/90 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/50">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0 border border-amber-200 dark:border-amber-800">
                      <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-amber-600 text-white rounded-br-sm"
                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-amber-200/50 dark:border-amber-800/50 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 border border-slate-300 dark:border-slate-600">
                      <User className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0 border border-amber-200 dark:border-amber-800">
                    <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 border border-amber-200/50 dark:border-amber-800/50 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 shadow-sm">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-amber-100 dark:border-amber-900/30">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all border border-transparent focus:bg-white dark:focus:bg-slate-800"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="p-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:shadow-amber-500/30"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
      >
        {/* Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-20" />
        
        <div className="relative w-14 h-14 bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 rounded-full shadow-lg shadow-amber-500/30 flex items-center justify-center text-white transition-all group-hover:shadow-xl group-hover:shadow-amber-500/40">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
}