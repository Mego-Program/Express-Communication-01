//התוכנית אחראית על הכנסת נתונים לדאטה בייס, 
//יש לחלק את התוכנית לפונקציות ולייצא אותם כדי להפעילם בתכנית הראשית, 
const mongoose = require("mongoose");
const user = require("./db/users")
const massag = require("./db/massagea")


// הגדרות חיבור ל-MongoDB
const MONGO_URI = "mongodb+srv://com:uEZv14yj2Tsd9p6O@cluster0.gyccyk6.mongodb.net/"

// התחבר ל-MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("open", () => {
  console.log("mongodb connected");
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database');

  // יצירת אובייקט משתמש
  const newUser = new user({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'securePassword123'
  });

  // שמירת המשתמש במסד הנתונים
  
// אחרי (בצורת Promise)
newUser.save()
  .then(savedUser => {
    console.log('User saved successfully:', savedUser);
  })
  .catch(err => {
    console.error('Error saving user:', err);
  });
    
    // סגירת חיבור למסד נתונים לאחר סיום הפעולה
    db.close();
  });