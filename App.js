import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      sendMessage("start");
    }
  }, [open]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (customMessage = null) => {
    const message = customMessage || input;
    if (!message.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text: message }]);
    setInput("");

    const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (data.redirect) {
      window.location.href = `http://127.0.0.1:5000${data.redirect}`;
      return;
    }

    if (data.reply) {
      setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
    }

    if (data.buttons) {
      setMessages(prev => [...prev, { sender: "buttons", buttons: data.buttons }]);
    }
  };

  return (
    <div className="App">
      <button className="chat-toggle" onClick={() => setOpen(!open)}>💬</button>

      {open && (
        <div className="chat-container">
          <div className="chat-header">🎓 Career Counselor</div>

          <div className="chat-box">
            {messages.map((msg, i) => {
              if (msg.sender === "buttons") {
                return (
                  <div key={i} className="option-buttons">
                    {msg.buttons.map((btn, index) => (
                      <button key={index} onClick={() => sendMessage(btn.value)}>
                        {btn.text}
                      </button>
                    ))}
                  </div>
                );
              }

              return (
                <div key={i} className={`message-wrapper ${msg.sender}`}>
                  <div className="message">{msg.text}</div>
                </div>
              );
            })}
            <div ref={chatEndRef}></div>
          </div>

          <div className="input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about your career..."
            />
            <button onClick={() => sendMessage()}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
