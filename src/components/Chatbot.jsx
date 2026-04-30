import React, { useState, useEffect, useRef } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const bottomRef = useRef(null);

  const toggleChat = () => setOpen(!open);

  // 🔥 Reset backend session on refresh
  useEffect(() => {
    const resetChat = async () => {
      try {
        await fetch("http://localhost:5002/reset", {
          method: "POST",
          credentials: "include"
        });
      } catch (err) {}
    };
    resetChat();
  }, []);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // 🔥 Auto greeting
  useEffect(() => {
    if (messages.length === 0) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages([
          {
            sender: "bot",
            text:
              "Hi 👋\n\nHow can I help you today?"
          }
        ]);
      }, 800);
    }
  }, []);

  const sendMessage = async (customMessage = null) => {
    const message = customMessage || input;
    if (!message.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text: message }]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("http://localhost:5002/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setTyping(false);

      if (data.reply) {
        setMessages(prev => [
          ...prev,
          { sender: "bot", text: data.reply }
        ]);
      }

      if (data.buttons) {
        setMessages(prev => [
          ...prev,
          { sender: "buttons", buttons: data.buttons }
        ]);
      }

    } catch (error) {
      setTyping(false);
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error" }
      ]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="
        fixed bottom-6 right-6
        w-16 h-16
        flex items-center justify-center
        bg-gradient-to-br from-purple-400 to-indigo-400
        text-white
        rounded-full
        shadow-xl
        z-50
        hover:scale-110
        transition-all duration-300
        "
      >
        <span className="text-3xl">💬</span>
      </button>

      {open && (
        <div
          className="
          fixed bottom-24 right-6 w-[360px] h-[520px]
          bg-white/70
          backdrop-blur-lg
          border border-white/50
          rounded-3xl
          shadow-[0_20px_60px_rgba(0,0,0,0.15)]
          flex flex-col z-50
          animate-[slideUp_0.35s_ease-out]
          "
        >
          {/* Header */}
          <div
            className="
            bg-gradient-to-r from-purple-400 to-indigo-400
            text-white text-center py-4 font-semibold
            rounded-t-3xl
            "
          >
            🎓 Career Counsellor
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto text-sm space-y-3">
            {messages.map((msg, i) => {

              // 🔥 Button Rendering
              if (msg.sender === "buttons") {
                return (
                  <div key={i} className="space-y-2">
                    {msg.buttons.map((btn, index) => (
                      <button
                        key={index}
                        onClick={() => sendMessage(btn.value)}
                        className="
                        w-full py-2 rounded-xl
                        bg-gradient-to-r from-purple-400 to-indigo-400
                        text-white text-sm font-medium
                        hover:scale-105 transition
                        "
                      >
                        {btn.text}
                      </button>
                    ))}
                  </div>
                );
              }

              return (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`
                    px-4 py-2 rounded-2xl max-w-[75%]
                    whitespace-pre-line shadow-sm
                    ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-purple-400 to-indigo-400 text-white"
                        : "bg-white text-gray-700"
                    }
                    `}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {/* Typing Animation */}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm flex space-x-1">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex p-3 bg-white/60 backdrop-blur-md rounded-b-3xl">
            <input
              className="
              flex-1 bg-white
              rounded-full px-4 py-2 text-sm
              outline-none text-gray-700
              border border-gray-200
              "
              placeholder="Ask about your career..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={() => sendMessage()}
              className="
              ml-2 bg-gradient-to-r from-purple-400 to-indigo-400
              text-white px-4 py-2 rounded-full text-sm
              hover:scale-105 transition
              "
            >
              Send
            </button>
          </div>
        </div>
      )}

      <style>
        {`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </>
  );
}
