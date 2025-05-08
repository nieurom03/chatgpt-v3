const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'bot'], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  feedback: {type: String, enum:['good','bad']}
})

const ConversationSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  title : {type: String},
  messages: [MessageSchema],
  status: {type: String, enum:['active', 'inactive','delete'], default: 'active'}

},
{
  timestamps: true,
});

const Conversation = mongoose.model('Conversation', ConversationSchema)
module.exports = Conversation;