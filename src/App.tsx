import { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      // In a real app, you'd send the message to a backend here
      setMessages([...messages, { text: input, sender: 'user' }]);
      // Simulate a bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'I am a bot!', sender: 'bot' },
        ]);
      }, 1000);
      setInput('');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-2xl flex flex-col h-full bg-white shadow-lg">
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-xl font-bold">Rialo BotBETA</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-xs ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-300 text-black self-start'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </main>
      <footer className="p-4 bg-white border-t">
        <div className="flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-r-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </footer>
      </div>
    </div>
  );
}

export default App;
