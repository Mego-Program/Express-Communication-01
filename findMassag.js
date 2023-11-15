const Message = require('./db/massagea');
const mongoose = require("mongoose");


// פונקציה שתופעל בלחיצה על שם המשתמש, מקבלת את שם המשתמש כפרמטר, ומוצאת את כל ההודעות שנשלחו על ידו

async function getMessagesByUser(username) {
  try {
    const messages = await Message.find({ senderName: username }).exec();
    console.log(messages)
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}
getMessagesByUser()

const FunctiongetMessagesByUser = getMessagesByUser
module.exports = FunctiongetMessagesByUser