const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  conversationId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true},
  role: { type: String, enum: ['user', 'bot'], required: true },
  content: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
},
{
  timestamps: true,
})

const Messages = mongoose.model('Messages', MessageSchema)
module.exports = Messages;