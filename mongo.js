import mongoose from "mongoose";
import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";


const createNewMessage = require("./db/createMessage")
const findMessage = require("./db/findMessage");


const app = express();
const PORT = 3000;
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

const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const usersMap = new Map();

io.on("connection", (socket) => {
 console.log(socket.id,'conected')


  socket.on("userId", (userId) => {
    usersMap.set(userId, socket.id);
  });

  socket.on("privetMessage", (message) => {


    let recipiantSctId = usersTable.get(message.to)

    socket.to(recipiantSctId).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log(socket.id,"disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});