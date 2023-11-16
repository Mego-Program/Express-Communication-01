const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

//הפיכה לגייסון

app.use(bodyParser.json());

//קבלת האוייבקט מהצד לקוח

app.post('/sendMessage', async (req, res) => {
    try {
        // שמירת ההודעה במסד הנתונים
        const saveResult = await saveMessageToDatabase(req.body);

        if (saveResult) {
            // תגובה במקרה של שמירה מוצלחת
            res.json({ success: true, message: 'ההודעה נשמרה בהצלחה במסד הנתונים!' });
        } else {
            // תגובה במקרה של שגיאה בשמירה
            res.status(500).json({ success: false, message: 'ארעה שגיאה בשמירת ההודעה במסד הנתונים.' });
        }
        //שגיאה בקבלת הנתונים מהלקוח
    } catch (error) {
        console.error("Error handling sendMessage request:", error);
        res.status(500).json({ success: false, message: 'ארעה שגיאה בטיפול בבקשה.' });
    }
});
//הפונקציה שמכניסה את האובייקט למונגו
async function saveMessageToDatabase(messageObject) {
    const uri = "mongodb+srv://com:uEZv14yj2Tsd9p6O@cluster0.gyccyk6.mongodb.net/";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const database = client.db("Communication");
        const collection = database.collection("messages");

        const result = await collection.insertOne(messageObject);

        return result.insertedId ? true : false;
    } catch (error) {
        console.error("Error saving message to the database:", error);
        return false;
    } finally {
        await client.close();
    }
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
