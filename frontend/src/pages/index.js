import React,{useEffect, useState} from 'react';
import conversationService from '../services/conversationService.js';
import '../App.css';
import Sidebar from '../components/Sidebar.js'
import Container from '../components/Container.js';
import {  useNavigate } from 'react-router-dom';


function App() {
  const [history, setHistory] = useState({})
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isSending, setIsSending] = useState(false)
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {

    if(!user){
      navigate('/login');
    }
     // Fetch messages from MongoDB
     const fecthAllMessage = async() => {
      try {

        const response = await conversationService.getAll(
          JSON.stringify({ userId: user.userId})
        );
        const data = response?.data || {}

        setHistory(data);
      } catch (error) {
        console.error('Error fetching all messages:', error);
      }
    };
    fecthAllMessage();
  }, [selected]);

  useEffect(() =>{
    // find message by id
    
    const findById = async() => {
      try {
        const data = await conversationService.getById(selected);
        setMessages(data?.data.messages || []);
      } catch (error) {
        console.error('Error fetching messages by id:', error);
      }
    }
    if(selected){
      findById();
    }

  },[selected])
  const sendStreamMessage = async (userInput) => {
    setMessages(prev => [...prev, { role: 'user', content: userInput }]);
    
    const response = await fetch("http://localhost:5002/api/chat/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userInput }),
    });
  
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let aiReply = "";
  
    setMessages(prev => [...prev, { role: 'bot', content: "" }]);
  
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      aiReply += chunk;
  
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].content = aiReply;
        return updated;
      });
    }
  };

  const handleFeedback = async (messageId, feedback) => {
    // console.log(`Message ID: ${messageId}, Feedback: ${feedback}`);
    // Here you can call an API to save feedback or handle accordingly
    await conversationService.feedbackMessage({_id: messageId, feedback});
    
  };
  const sendMessage = async (userInput) => {
    try {
      setIsSending(true);
      const userMessage = {
        role: 'user',
        content: userInput,
        createdAt: new Date()
      };
      
      setMessages( [...messages, userMessage]);
      
      // Gọi AI model
      const aiResponse = await fetch('http://localhost:5002/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });
      
      const aiData = await aiResponse.json();

      const aiMessage = {
        role: 'bot',
        content: aiData.content,
        createdAt: new Date()
      };
      setMessages((prev) => [...prev, aiMessage]);

    // Nếu là cuộc hội thoại mới (chưa có selected id), tạo title
      let title = 'New conversation';
      if (!selected) {
        const titleResponse = await fetch('http://localhost:5002/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: `Create a short title (under 6 words) that describes the content: ${userInput}`,
          }),
        });
        const titleData = await titleResponse.json();
        title = titleData.content?.trim() || 'New Conversation';
      }
      // Lưu tin nhắn AI vào DB
     
      const res = await conversationService.addConversaction(JSON.stringify({
        title: title,
        id: selected,
        userId: user?.userId,
        messages: [userMessage, aiMessage]
      }));
      
      // 
      setSelected(res.data?._id);
      setIsSending(false);
    } catch (error) {
      console.error('❌ Error sending message:', error);
    }
  };

  const handleDelete = async (id) => {
    await conversationService.deleteConversaction(id);
    setSelected(null);
    setMessages(null);
  }

  return (
    <div>
      
      <div className="flex flex-row h-screen">
        <div className="basis-1/4 shadow-2xl">
            <Sidebar history={history} onSelect={setSelected} selected={selected} onDelete={handleDelete}/>
        </div>
        <div className="basis-3/4 ">
            <Container 
              messages={messages}  
              onSend={sendMessage} 
              handleFeedback={handleFeedback} 
              loading={isSending}/>

        </div>
      </div>
      
    </div>
  );
}

export default App;
