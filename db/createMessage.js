import mongoose from "mongoose";
import model from "./modul.js"


//פונקציה לקבלת ההודעה מהמשתמש ושמירתה בדאטה בייס

 //פונקציה לקבלת ההודעה מהמשתמש ושמירתה בדאטה בייס

 export   async function createNewMessage({ from, to, text, timestamp }) {
        // יצירת אובייקט חדש על פי הסכמה
        const newMessage = new model({
            senderID: from,
            recipientID: to,
            content: text,
            sendDate: timestamp
        });
        const uri = process.env.MONGO_URL ;
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

