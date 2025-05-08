
import { useState , useRef, useEffect} from 'react';
import MarkdownMessage from './MarkdownMessage.js';
import Header from './Header.js';
import Feedback from './Feedback/index.js';
import ScrollToTopButton from './ScrollToTopButton.js'
const Container = ({messages, onSend, handleFeedback,loading}) => {
    const [input, setInput] = useState("")
    const bottomRef = useRef(null);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSend(input);
            setInput('');
          }

    }
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);
    return (
    
        <div className="flex flex-col h-screen">
            <Header/>
            <div className="flex-1 overflow-y-auto overflow-x-auto">
              {messages?.map((msg, index) => (
                    <div key={index} className={`my-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className="bg-white p-3 rounded shadow">
                        <strong>{msg.role === 'user' ? '🙏' : '🧠'}</strong>
                        <MarkdownMessage content={msg.content} />
                        <Feedback msg={msg} handleFeedback={handleFeedback} />
                        </div>
                        <div ref={bottomRef} />
                    </div>

              ))}
              {/* <ScrollToTopButton /> */}
            </div>

            {/* Input ở dưới */}
            <form onSubmit={handleSubmit} >
                <div className="flex items-center border-t p-4 gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 border px-4 py-2 rounded-xl"
                    disabled={loading}
                    />
                    <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 rounded-full"
                    >
                        {loading ? 'Đang gửi...' : 'Gửi'}
                    </button>
                </div>
            </form>
          </div>
    
    )
}

export default Container;