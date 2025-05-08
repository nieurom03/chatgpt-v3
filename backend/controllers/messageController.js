const Message = require("../models/Messages.js");

const getMessageByConversationId = async (req, res) =>{
    try {
        const {conversationId} = req.params

        const data = await Message.find({conversationId});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: 'Failed:' + error});
    }
}

const add = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: 'Failed:' + error})
        
    }
}
// export default messageController;

module.exports = {
    add,
    getMessageByConversationId
}