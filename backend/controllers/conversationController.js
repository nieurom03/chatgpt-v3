const Conversation  = require ("../models/Conversation.js");
const { ObjectId } = require('mongodb');


const  getAll = async(req, res) => {
    try{
        const {userId} = req.body;
 
        const data = await Conversation.find({ userId, status: 'active'}).sort({createdAt: -1});
        res.status(200).send({data, message: 'Success'})
    }
    catch(err){
        res.status(500).json({message: 'error' + err})
    }
}

const getConversactionById = async(req, res) => {
    try{
        const {id} = req.params
        const data = await Conversation.findById(id);
        res.status(200).send({data,message: 'Success'});
    }
    catch(err){
        res.status(500).json({message: 'error' + err})
    }
}

const addNew = async (req, res ) => {
    try {
        
        const body = req.body;
        // console.log('body',body)
        // const counter = await Conversation.countDocuments();
        let data ;
        // update messages
        if(body?.id){
            data = await Conversation.findByIdAndUpdate(body.id,{
                $push:{
                    messages: {$each: body.messages}
                }
             },{
                new: true
             });

        }
        else {

            data = new Conversation({
                title: body.title,
                status:'active',
                messages: body.messages
            });
        }
        const d = await data.save();
        res.status(200).send({messate:'Success', data: d});

    } catch (error) {
        res.status(500).json({message: 'error' + error})
        
    }
    
};


const deleteConversation = async(req, res) => {
    try {
        const {id} = req.params;
        const data = await Conversation.findByIdAndUpdate(id,{$set: {status:'inactive'}},{new: true});

        res.status(200).send({message: 'Success', data});
    } catch (error) {
        res.status(500).json({message: 'error' + error})
        
    }
}

const feedbackMessage = async(req, res) => {
    try {
        const body = req.body;
        const _id = new ObjectId(body._id.toString())

        const data = await Conversation.updateOne({
            "messages._id": _id
        },{
            $set: {"messages.$.feedback": body.feedback}
        });
        res.status(200).send({message: 'Success',data: {feedback: body.feedback}});
    } catch (error) {
        res.status(500).json({message: 'error' + error})
    }
}

module.exports = {
    getAll,
    addNew,
    deleteConversation,
    getConversactionById,
    feedbackMessage
}