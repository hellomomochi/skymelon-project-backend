// npm i bcrypt เปิดการใช้ฟังก์ชั่นการเก็บข้อมูลรูปแบบพาสเวิร์ดที่ backend จะไม่เห็น data password ของผูที่ input ข้อมูลเข้ามา
// (1)เปิดแพ็ตเกจเพื่อสร้าง data login => npm i jsonwebtoken

// (2) const jsontoken
const jwt = require("jsonwebtoken")

const crypto = require('crypto');
const bcrypt = require("bcryptjs"); //เปิดใช้งาน bcrypt
const nodemailer = require('nodemailer');


const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()


const register = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        //error บังคับให้ใส่ข้อมูลทั้ง ชื่อ, พาสเวิร์ด และ อีเมล์
        if (!(username && password && email)) {
            return res.status(400).send({ message: "All fields is requied" });
        }



        //error บังคับไม่ใส่ชื่อซ้ำของ username
        const existedUser = await prisma.user.findUnique({
            where: {
                username: username,
            }
        })

        if (existedUser)
            return res.status(400).send({ massage: "Username already in use" })

        //error บังคับไม่ใส่ชื่อซ้ำของ email
        const emailUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (emailUser)
            return res.status(400).send({ massage: "Emailname already in use" })

        //ตั้งตัวแปรเก็บพาสเวิด 10 คือ level ความซับซ้อนรหัส encode ที่จะแปลงและไปเก็บไว้ที่ backend เป็นความปลอดภัยที่เหมาะสม
        const encryptedPassword = bcrypt.hashSync(password, 10)
        const emailVerificationExpires = new Date(Date.now() + 3600000); // 1 hour from now
        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: encryptedPassword,
                // เพิ่มข้อมูลสำหรับการยืนยันตัวตนด้วยอีเมล์
                emailVerificationToken: crypto.randomBytes(20).toString('hex'),
                emailVerificationExpires: emailVerificationExpires,
                checkVerification : false
            },
        });

        // ส่งอีเมล์ยืนยันไปที่ผู้ใช้
        const transporter = nodemailer.createTransport({
            service: 'hotmail', // สามารถเปลี่ยนเป็นชื่อผู้ให้บริการอีเมล์ที่ใช้ได้
            auth: {
                user: process.env.OUTLOOK_EMAIL,
                pass: process.env.OUTLOOK_PASSWORD,
            },
        });

        const mailOptions = {
            to: user.email,
            from: process.env.OUTLOOK_EMAIL,
            subject: 'Confirm your email for registration',
            text: `Please click on the following link, or paste this into your browser to confirm your email for registration:\n\n
                   http://localhost:3000/verify/${user.emailVerificationToken}\n\n
                   If you did not request this, please ignore this email and your account will remain unchanged.\n`,
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error("Error sending email:", err);
                return res.status(500).send({ message: 'Error sending email' });
            }
            res.status(200).send({ message: 'Registration successful. Please check your email to verify your account.' });
        });

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).send({ message: 'Registration failed' });

    }
}

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;

        const user = await prisma.user.findFirst({
            where: {
                emailVerificationToken: token,
                emailVerificationExpires: { gt: new Date() },
            },
        });

        if (!user) {
            return res.status(400).send({ message: "Token is invalid or has expired" });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                checkVerification : true
            },
        });

        res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
        console.error("Email verification error:", error);
        return res.status(500).send({ message: "Email verification failed" });
    }
};

const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send({ message: 'Email is required' });
        }

        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (!user.emailVerificationToken || new Date() > user.emailVerificationExpires) {
            const emailVerificationToken = crypto.randomBytes(20).toString('hex');
            const emailVerificationExpires = new Date(Date.now() + 3600000); // 1 hour from now

            await prisma.user.update({
                where: { email: email },
                data: {
                    emailVerificationToken: emailVerificationToken,
                    emailVerificationExpires: emailVerificationExpires
                }
            });

            user.emailVerificationToken = emailVerificationToken;
            user.emailVerificationExpires = emailVerificationExpires;
        }

        const transporter = nodemailer.createTransport({
            service: 'hotmail', // สามารถเปลี่ยนเป็นชื่อผู้ให้บริการอีเมล์ที่ใช้ได้
            auth: {
                user: process.env.OUTLOOK_EMAIL,
                pass: process.env.OUTLOOK_PASSWORD,
            },
        });

        const mailOptions = {
            to: user.email,
            from: process.env.OUTLOOK_EMAIL,
            subject: 'Confirm your email for registration',
            text: `Please click on the following link, or paste this into your browser to confirm your email for registration:\n\n
                   http://localhost:3000/verify/${user.emailVerificationToken}\n\n
                   If you did not request this, please ignore this email and your account will remain unchanged.\n`,
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error("Error sending email:", err);
                return res.status(500).send({ message: 'Error sending email' });
            }
            res.status(200).send({ message: 'Verification email resent. Please check your email to verify your account.' });
        });

    } catch (error) {
        console.error('Resend verification email error:', error);
        return res.status(500).send({ message: 'Failed to resend verification email' });
    }
};

//สร้าง login
const login = async (req, res) => {

    try {
        const { email, password } = req.body
        if (!(email && password)) {
            return res.status(400).send({ message: "All fields is required" })
        }

        //หา email ใน register ถ้าไม่มีให้โชว์ error
        const user = await prisma.user.findFirst({ //.findFirst คือ ตัวที่หาเจอตัวแรก
            where: {

                email: email,
            }
        })

        if (user.checkVerification == false) {
            return res.status(400).json({ message: 'Please verify your email before logging in.' });
        }


        // error 404 หา user ไม่เจอ
        if (!user)
            return res.status(404).send({ message: "User not found" })

        //ถ้ามี user ต้องเช็คอีกว่า user ถูกมั้ย ตรงกับที่ register มั้ย
        //โดยใช้ รหัส bcrypt ส่งไปเทียบคอมแพร์กับ password
        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(

                {
                    id: user.id,
                },
                process.env.SECRET_KEY,
                {
                    //กำหนด ระยะเวลาที่ token จะหมดอายุ (=30วัน)
                    expiresIn: "340d",
                }
            )
            //retrun โดยการส่ง token กลับมา ถ้าถูกต้อง
            //เช็คโดยการเข้า http://localhost:5000/auth/login
            return res.status(200).send({ token: token })

        }
        else return res.status(400).send(
            { message: "email or password incorrect" }
        )
    } catch (error) {
        return res.status(500).send(error);

    }
}

//ใช้ get http://localhost:5000/user/profile ในการทดสอบโดยเอง token ที่ได้จากการล็อกอินไปใส่ใน header Authorization
const myProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user,
            }
        })

        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
}

// ฟังก์ชัน forgotPassword
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await prisma.user.findFirst({
            where: { email: email }
        });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = bcrypt.hashSync(resetToken, 10);
        const resetTokenExpiration = Date.now() + 3600000; // 1 hour

        await prisma.user.update({
            where: { email: email },
            data: {
                resetToken: hashedToken,
                resetTokenExpiration: new Date(resetTokenExpiration)
            }
        });

        console.log('Outlook Email:', process.env.OUTLOOK_EMAIL);
        console.log('Outlook Password:', process.env.OUTLOOK_PASSWORD);


        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.OUTLOOK_EMAIL,
                pass: process.env.OUTLOOK_PASSWORD
            }
        });

        const mailOptions = {
            to: user.email,
            from: process.env.OUTLOOK_EMAIL,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                   Please click on the following link, or paste this into your browser to complete the process:\n\n
                   http://localhost:3000/reset/${resetToken}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error("Error sending email:", err);
                return res.status(500).send({ message: 'Error sending email' });
            }
            res.status(200).send({ message: 'Recovery email sent' });
        });
    } catch (error) {
        console.error("Forgot password failed:", error);
        return res.status(500).send({ message: 'Forgot password failed' });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).send({ message: 'Token and password are required' });
        }

        const user = await prisma.user.findFirst({
            where: {
                resetTokenExpiration: { gt: new Date() }
            }
        });

        console.log('token', token)
        console.log('user.resetToken', bcrypt.compareSync(token, user.resetToken))
        if (!user || !bcrypt.compareSync(token, user.resetToken)) {
            return res.status(400).send({ message: 'Invalid or expired token' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiration: null
            }
        });

        res.status(200).send({ message: 'Password has been reset' });
    } catch (error) {
        console.error('Reset password error:', error);
        return res.status(500).send({ message: 'Reset password failed' });
    }
};

module.exports = {
    register,
    verifyEmail,
    resendVerificationEmail,
    login,
    myProfile,
    forgotPassword,
    resetPassword
}