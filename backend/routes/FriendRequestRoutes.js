const express = require('express')
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth.js");
const {sendFriendRequest , acceptFriendRequest} = require('../controllers/FriendRequestController')
const router = express.Router()
module.exports = router;


router.route('/send/request').post(isAuthenticatedUser  , sendFriendRequest)
router.route('/accept/request').post(isAuthenticatedUser  , acceptFriendRequest)