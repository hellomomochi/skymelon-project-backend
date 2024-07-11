const express = require("express");
const { myProfile } = require("../controllers/register")

const router = express.Router();

router.get("/profile", myProfile);

module.exports = router;