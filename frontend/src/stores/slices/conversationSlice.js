import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: {
    today: [],
    yesterday: [],
    lastWeek: [],
    lastMonth: [],
    older: [],
  },
  messages: [],
  conversationId: null,
  loading: false,
  error: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.history = action.payload;
      state.loading = false;
      state.error = null;
    },
    selectedId: (state, action) => {
      console.log("state", action);
      state.conversationId = action.payload;
      state.loading = true;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      if (state.messages) {
        state.messages.push(action.payload);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateMessageFeedback: (state, action) => {
      const { messageId, feedback } = action.payload;
      if (state.messages) {
        const message = state.messages.find((msg) => msg._id === messageId);
        if (message) {
          message.feedback = feedback;
        }
      }
    },
  },
});

export const {
  setConversations,
  setMessages,
  addMessage,
  setLoading,
  setError,
  updateMessageFeedback,
  selectedId,
} = conversationSlice.actions;

export default conversationSlice.reducer;
