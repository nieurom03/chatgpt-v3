const express = require("express");
const { getMessageByConversationId } = require("../controllers/messageController");
const router = express.Router();

 router.get('/:conversactionId', getMessageByConversationId);
 
module.exports = router;
