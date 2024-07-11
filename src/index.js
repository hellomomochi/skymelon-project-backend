const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require('cors')
const AuthRouter = require("./routes/auth")
const UserRouter = require("./routes/user")
const { verify } = require("./middlewares/auth")


//========================import===========================================


//ใช้เรียกใช้ .env file เพื่อ load environment variables.
//environment varible
dotenv.config();

//สร้าง instance ของ Express application.
const app = express();



//ใช้ cor หลังสร้าง express
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/auth", AuthRouter);
app.use("/user", verify, UserRouter);



//การตั้งชื่อตัวแปรให้เป็นพิมพ์ใหญ่ล้วนตามกฎ global variable
//กำหนดตัวแปร PORT จาก environment variable ที่กำหนดไว้ในไฟล์ .env.
const PORT = process.env.PORT;

//รันเซิร์ฟเวอร์ Express บนพอร์ตที่กำหนด และ log ข้อความ "Server running on port" พร้อมกับพอร์ตที่เซิร์ฟเวอร์กำลังทำงานอยู่.
app.listen(PORT, () => console.log("Server running on port" + PORT));

