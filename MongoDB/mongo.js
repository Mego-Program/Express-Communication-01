const mongoose = require("mongoose");
const express = require("express");
const path = require("path")


const createNewMessage = require("./db/createMessage")
const findMessage = require("./db/findMessage");


const app = express();
app.use(express.json());




app.post('/sendMasseg', async (req, res) => {
  const messageObjectFromClient = req.body;
  const chek = await createNewMessage(messageObjectFromClient);
  console.log(chek)
  res.status(200).send(chek);
})

app.get('/findMessages', async (req, res) => {
  const idusers = req.body;
  const messagesUser = await findMessage(idusers.senderID, idusers.recipientID)
  res.status(200).send(messagesUser)
})






app.listen(3000, () => {
  console.log("השרת פועל בפורט 3000");
})
