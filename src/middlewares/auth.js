//สำหรับการส่ง token ที่ได้รับมาจาก backend ที่เรายื่นขอไป แล้วก็จะเอา token ที่ได้รับมานั้น
//ส่งกลับไปหาผ่าน header ที่ชื่อว่า Authorization ในช่อง value RESTful API ประเภท get (get user)
//และ import ในการใช้ middleware ในไลฟ์ index.js ด้วย
const jwt = require("jsonwebtoken")

const verify = async (req, res, next) => {
    try {
        const token = req.headers.authorization

        //(middleware)สร้างเงื่อนไขถ้าเกิดว่ายังไม่ได้ใส่ token ที่ header Authorization
        if (!token) return res.status(401).send({ massage: "token is required" })

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded.id

        next()

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    verify,
}