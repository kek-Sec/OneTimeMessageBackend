const mongoose = require('mongoose');

const OneTimeMessageSchema = mongoose.Schema({
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
        expires: 7200
    }
});

module.exports = mongoose.model('OneTimeMessage', OneTimeMessageSchema);