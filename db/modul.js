import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    senderID: { type: String, required: true },
    recipientID: { type: String, required: true },
    content: { type: String, required: true },
    sendDate: { type: String, required: true },
    typeDate: {type: Date, required: true}

  });


const Message = mongoose.model('Message', messageSchema);

export default Message
