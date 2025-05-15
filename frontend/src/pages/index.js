import React,{useEffect, useState} from 'react';
import conversationService from '../services/conversationService.js';
import '../App.css';
import Sidebar from '../components/Sidebar.js'
import Container from '../components/Container.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setConversations, setLoading, setError,
  setMessages
 } from '../stores/slices/conversationSlice';


function App() {
  // const [history, setHistory] = useState({})
  // const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isSending, setIsSending] = useState(false)
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  const history1 = useSelector((state) => state.conversation.history);
  const message1 = useSelector(state => state.conversation.messages);

  console.log('message-selector',  message1);
  useEffect(() => {

    if(!user){
      navigate('/login');
    }
     // Fetch messages from MongoDB
     const fecthAllMessage = async() => {
       dispatch(setLoading(true));
      try {
        const response = await conversationService.getAll(
          JSON.stringify({ userId: user.userId})
        );
        const data = response?.data || {}

        dispatch(setConversations(data));

      } catch (error) {

        dispatch(setError(error));

      }
    };
    fecthAllMessage();
  }, [selected]);

  useEffect(() =>{
    // find message by id
    
    const findById = async() => {
      try {
        const data = await conversationService.getById(selected);
        
        dispatch(setMessages(data?.data.messages || []))

      } catch (error) {
        console.error('Error fetching messages by id:', error);
      }
    }
    if(selected){
      findById();
    }

  },[selected]) 

  const handleFeedback = async (messageId, feedback) => {
    // console.log(`Message ID: ${messageId}, Feedback: ${feedback}`);

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
      
      dispatch(setMessages( [...message1, userMessage]));
      
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
      // setMessages((prev) => [...prev, aiMessage]);
      dispatch(setMessages( [...message1, aiMessage]));
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
            <Sidebar history={history1} onSelect={setSelected} selected={selected} onDelete={handleDelete}/>
        </div>
        <div className="basis-3/4 ">
            <Container 
              messages={message1}  
              onSend={sendMessage} 
              handleFeedback={handleFeedback} 
              loading={isSending}/>

        </div>
      </div>
      
    </div>
  );
}

export default App;
