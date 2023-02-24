const express = require('express')
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth.js");
const {loginUser, registerUser} = require('../controllers/UserController')

const router = express.Router()
module.exports = router;


router.route("/login").post(loginUser)
router.route("/register").post(registerUser)

