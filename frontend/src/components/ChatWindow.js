import React, { useState } from 'react';
import Message from './Message';
import Sidebar from './Sidebar';

function ChatWindow({ messages, onSend, model, setModel }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      {/* <div className="chat-box"> */}
      <div>

        {/* <Sidebar model={model} setModel={setModel} messages={messages} />  */}
      </div>
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-4 h-[80vh] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 chat-box">
        {
          messages?.map((msg, index) => (
          <Message key={index} sender={msg.role} text={msg.content} />
          ))
        }
      </div>
      

      <div className="model-select">
        <label>Chọn Model GPT:</label>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="ollama">OLLAMA</option>
          <option value="gpt-3.5-turbo">GPT-3.5</option>
          <option value="gpt-4">GPT-4</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
        />
        <button type="submit">Gửi</button>
      </form>
    </div>
    </div>
  );
}

export default ChatWindow;
