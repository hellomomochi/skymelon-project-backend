//import { register } from "../controllers/user";
//import { Express } from "express";
//const router = express.Router()
//router.post("/register", register)
//export default routers
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

const express = require("express")

const router = express.Router();

const { voter, getVoter } = require("../controllers/voter");
const { register, login, forgotPassword, resetPassword, verifyEmail, resendVerificationEmail } = require("../controllers/register")
const { keeptime, deleteKeeptime, getAllKeeptime } = require("../controllers/keeptime");
const { sumvote } = require("../controllers/sumVote");
const { imageroom } = require("../controllers/imageroom");
const { imagechoiceroom } = require("../controllers/imageChoiceroom");
const { homeroom, deleteAllData, getAllData } = require("../controllers/Homeroom");


const { getkeeptime } = require("../controllers/getkeeptime");


router.post("/register", register);
router.post("/login", login);
router.post("/vote", voter);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.post('/keeptime', keeptime);

router.post('/imageroom', upload.single('image'), imageroom);
router.post('/imagechoiceroom', upload.single('imagec'), imagechoiceroom);
router.post('/homeroom', homeroom);
router.post('/verify/:token', verifyEmail);
router.post('/resend-verification-email', resendVerificationEmail);

router.delete('/homeroom', deleteAllData);
router.delete('/keeptime', deleteKeeptime);

router.get('/keeptime', getAllKeeptime);
router.get('/homeroom', getAllData);
router.get('/vote', getVoter);
router.get('/sumvote', sumvote);


module.exports = router;

