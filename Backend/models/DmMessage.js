const mongoose = require('mongoose');

const DmMessageSchema = new mongoose.Schema({
  from_user: { type: String, required: true }, 
  to_user: { type: String, required: true }, 
  message: { type: String, required: true }, 
  date_sent: { type: Date, default: Date.now }, 
});

const ChatMessage = mongoose.model('dmmessages', DmMessageSchema);

module.exports = ChatMessage;
