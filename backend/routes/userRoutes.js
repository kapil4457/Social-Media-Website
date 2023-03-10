const express = require('express')
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth.js");
const {loginUser, registerUser, logout, updateUser, updatePassword, findUsers, deleteAccount} = require('../controllers/UserController')

const router = express.Router()
module.exports = router;


router.route("/login").post(loginUser)
router.route("/register").post(registerUser)
router.route("/logout").post(logout)
router.route("/update/user").put(isAuthenticatedUser , updateUser)
router.route("/update/password").put(isAuthenticatedUser , updatePassword)
router.route("/find/users").get(findUsers)
router.route("/user/delete").delete(deleteAccount)

