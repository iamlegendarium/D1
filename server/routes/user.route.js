const express = require("express");
const router = express.Router();
const { getRegister, postRegister, postLogin, getVerify, generateTrackingNumber, sendMail } = require("../controllers/user.controller.js");
const {verify} = require("jsonwebtoken")

router.get("/register", getRegister);
router.post("/register", postRegister);
router.post("/login", postLogin);
router.get("/verify", getVerify);
router.get("/generate", generateTrackingNumber);
router.get("/sendMail", sendMail);

module.exports = router;
