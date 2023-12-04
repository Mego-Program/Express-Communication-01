import mongoose from "mongoose";
import model from "./modul.js";



 async function getMessagesBetweenUsers(senderID, recipientID) {
  const uri = "mongodb+srv://com:uEZv14yj2Tsd9p6O@cluster0.gyccyk6.mongodb.net/";
  mongoose.connect(uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Connected to MongoDB');
  });


  try {
    const messages = await model.find({
      $or: [
        { senderID: senderID, recipientID: recipientID },
        { senderID: recipientID, recipientID: senderID }
      ]
    }).sort({ sendDate: 'desc' });
    const filteredMessages = messages.map(({ senderID, recipientID, content, sendDate }) => ({ senderID, recipientID, content, sendDate }));

    return filteredMessages;

  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
}
export default getMessagesBetweenUsers