import React, { useEffect, useState } from "react";
import conversationService from "../services/conversationService.js";
import "../App.css";
import Sidebar from "../components/Sidebar.js";
import Container from "../components/Container.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setConversations,
  setLoading,
  setError,
  setMessages,
  selectedId,
  addMessage,
} from "../stores/slices/conversationSlice";

function App() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const history = useSelector((state) => state.conversation.history);
  const message = useSelector((state) => state.conversation.messages);
  const conversationId = useSelector(
    (state) => state.conversation.conversationId
  );
  const isLoading = useSelector((state) => state.conversation.isLoading);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // Fetch messages from MongoDB
    const fecthAllMessage = async () => {
      dispatch(setLoading(true));
      try {
        const response = await conversationService.getAll(
          JSON.stringify({ userId: user.userId })
        );
        const data = response?.data || {};

        dispatch(setConversations(data));
      } catch (error) {
        dispatch(setError(error));
      }
    };
    fecthAllMessage();
  }, [conversationId]);

  useEffect(() => {
    // find message by id

    const findById = async (id) => {
      try {
        const data = await conversationService.getById(id);

        dispatch(setMessages(data?.data.messages || []));
      } catch (error) {
        console.error("Error fetching messages by id:", error);
      }
    };
    if (conversationId) {
      findById(conversationId);
    }
  }, [conversationId]);

  const handleFeedback = async (messageId, feedback) => {
    console.log('handleFeedback', messageId, feedback)
    await conversationService.feedbackMessage({ _id: messageId, feedback });
  };

  const sendMessage = async (userInput) => {
    try {
      dispatch(setLoading(true));
      const userMessage = {
        role: "user",
        content: userInput,
        createdAt: new Date(),
      };

      dispatch(setMessages([...message || [], userMessage]));

      // Gọi AI model
      const aiResponse = await fetch("http://localhost:5002/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const aiData = await aiResponse.json();

      const aiMessage = {
        role: "bot",
        content: aiData.content,
        createdAt: new Date(),
      };
      // setMessages((prev) => [...prev, aiMessage]);
      // dispatch(setMessages([...message, aiMessage]));
      dispatch(addMessage(aiMessage));
      // Nếu là cuộc hội thoại mới (chưa có selected id), tạo title
      let title = "New conversation";
      if (!conversationId) {
        const titleResponse = await fetch("http://localhost:5002/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: `Create a short title (under 6 words) that describes the content: ${userInput}`,
          }),
        });
        const titleData = await titleResponse.json();
        title = titleData.content?.trim() || "New Conversation";
      }
      // Lưu tin nhắn AI vào DB

      const res = await conversationService.addConversaction(
        JSON.stringify({
          title: title,
          id: conversationId,
          userId: user?.userId,
          messages: [userMessage, aiMessage],
        })
      );

      //
      dispatch(selectedId(res.data?._id));
      dispatch(setLoading(false));
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };

  const handleDelete = async (id) => {
    await conversationService.deleteConversaction(id);
    dispatch(selectedId(null));
    setMessages(null);
  };

  return (
    <div>
      <div className="flex flex-row h-screen">
        <div className="basis-1/4 shadow-2xl">
          <Sidebar
            history={history}
            onSelect={selectedId}
            selected={conversationId}
            onDelete={handleDelete}
          />
        </div>
        <div className="basis-3/4 ">
          <Container
            messages={message}
            onSend={sendMessage}
            handleFeedback={handleFeedback}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
