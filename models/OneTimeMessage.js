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
    message_burn_on_read:{
        type: Boolean,
        required: false,
        default: false
    },
    createdAt: { type: Date, default: Date.now },
    expireAt: { type: Date, default: undefined } 
});

MessageSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model('Message_Item', MessageSchema);