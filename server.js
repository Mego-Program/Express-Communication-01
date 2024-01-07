import mongoose from "mongoose";
import express from "express";
import path from "path";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import cors from "cors";
import { createNewMessage } from "./db/createMessage.js";
import getMessagesBetweenUsers from "./db/findMessage.js";
import { log } from "console";
import axios from "axios";

dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/getUsers", async (req, res) => {
  try {
    const response = await axios.post(
      "https://infra-jerusalem-1-server-five.vercel.app/users/allusers"
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/sendMasseg", async (req, res) => {
  const messageObjectFromClient = req.body;
  const chek = await createNewMessage(messageObjectFromClient);
  console.log(chek);
  res.status(200).send(chek);
});

app.get("/findMessages", async (req, res) => {
  const me = req.query.me;
  const selected = req.query.selected;
  const messagesUser = await getMessagesBetweenUsers(me, selected);
  res.status(200).send(messagesUser);
});

const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:4174", "http://localhost:4181","https://communication-jerusalem-1-two.vercel.app", "https://communication-jerusalem-1-two.vercel.app/assets/remoteEntry.js"
  ],
    methods: ["GET", "POST"],
  },
});

const usersMap = new Map();

io.on("connection", (socket) => {
  console.log(socket.id, "conected");

  socket.on("userId", (userId) => {
    usersMap.set(userId, socket.id);
    console.log(usersMap);
  });

  socket.on("message", (message) => {
    createNewMessage({ message });


    try {
      let recipiantSctId = usersMap.get(message.to);

      socket.to(recipiantSctId).emit("message", message);
    } catch (error) {
      console.error("the recipient is not conected now", error);
    }
  });

  function getUserIdBySctId(sctId) {
    usersMap.forEach((value, key) => {
      if (value === sctId) {
        return key;
      }
    });
  }

  socket.on("disconnect", () => {
    const user = getUserIdBySctId(socket);
    usersMap.delete(user);

    console.log(socket.id, "disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
