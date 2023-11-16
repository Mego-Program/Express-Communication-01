const Message = require('./db/massagea');
const mongoose = require("mongoose");


app.get('/getMessages/:username', async (req, res) => {
    try {
        const uri = "mongodb://localhost:27017";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();

        const database = client.db("mydatabase");
        const collection = database.collection("messages");

        const username = req.params.username;

        // שליפת כל ההודעות של המשתמש ממסד הנתונים
        const messages = await collection.find({
            $or: [
                { sender_name: username },
                { recipient_name: username },
                { "sender_name": { $regex: username, $options: 'i' } },
                { "recipient_name": { $regex: username, $options: 'i' } }
            ]
        }).toArray();

        res.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ success: false, message: 'ארעה שגיאה בקבלת ההודעות.' });
    } finally {
        await client.close();
    }
});
