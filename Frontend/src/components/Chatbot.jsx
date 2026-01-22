import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Welcome to HackArena! Ask me about contests, hackathons",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Got it 👍 ",
        },
      ]);
    }, 600);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full bg-black shadow-xl
                   flex items-center justify-center
                   animate-bounce hover:scale-110 transition">

        <img src="/chatbot.png.svg" alt="Chatbot" className="w-20 h-20"/>
      </button>

      {open && (
        <div className="fixed bottom-28 right-6 z-[9999]
                     w-80 h-[420px]
                     bg-white rounded-2xl
                     shadow-2xl flex flex-col overflow-hidden">
          
          <div className="bg-black text-white px-4 py-3 font-semibold flex justify-between items-center">
            HackArena Assistant
            <span
              className="cursor-pointer text-lg"
              onClick={() => setOpen(false)}>
              ✖
            </span>
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[75%] px-3 py-2 rounded-xl text-sm
                ${
                  m.from === "user"
                    ? "ml-auto bg-black text-white rounded-br-none"
                    : "bg-white text-gray-800 shadow rounded-bl-none"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about contests, hackathons..."
              className="flex-1 px-3 py-2 text-sm border rounded-full outline-none"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-black text-white px-4 rounded-full text-sm hover:bg-gray-800"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
