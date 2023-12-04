import mongoose from "mongoose";
import model from "./modul.js"


//פונקציה לקבלת ההודעה מהמשתמש ושמירתה בדאטה בייס

 //פונקציה לקבלת ההודעה מהמשתמש ושמירתה בדאטה בייס

 export   async function createNewMessage({ senderID, recipientID, content, sendDate }) {
        // יצירת אובייקט חדש על פי הסכמה
        const newMessage = new model({
            senderID: senderID,
            recipientID: recipientID,
            content: content,
            sendDate: sendDate
        });
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
            // שמירת האובייקט במסד הנתונים
            const savedMessage = await newMessage.save();
            console.log('הודעה נוצרה בהצלחה:', savedMessage);
            const response = savedMessage ? "הצלחה" : "כישלון";
            return response;


        } catch (error) {
            console.error('אירעה שגיאה ביצירת הודעה:', error.message);
            return "כישלון";
        }
    }

