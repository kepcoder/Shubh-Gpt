const express = require('express');
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const {createChatController, fetchChatController, fetchMessagesController} = require('../controller/chat.controller');


router.post('/chat', authMiddleware, createChatController)
router.get('/chat',authMiddleware, fetchChatController)
router.get('/:id',authMiddleware, fetchMessagesController)
module.exports = router