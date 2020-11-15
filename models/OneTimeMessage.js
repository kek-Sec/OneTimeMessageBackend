const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    message_title: {
        type: String,
        required: true
    },
    message_body: {
        type: String,
        required: true
    },
    message_expires : {
        type: Date,
        default: Date.now,
        expires: 1600
    }
});

module.exports = mongoose.model('Message_Item', MessageSchema);