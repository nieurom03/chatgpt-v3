const express = require("express");
const router = express.Router();
const  {getAll, addNew, feedbackMessage, deleteConversation, getConversactionById} = require ("../controllers/conversationController.js");

 router.post('/list', getAll);
 router.get('/:id', getConversactionById);
 router.post('/add', addNew);
 router.post('/delete/:id',deleteConversation);
 router.post('/feedback',feedbackMessage);

module.exports = router;
