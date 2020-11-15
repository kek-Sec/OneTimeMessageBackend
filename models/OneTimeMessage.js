const mongoose = require('mongoose');

const Project_ItemSchema = mongoose.Schema({
    project_title: {
        type: String,
        required: true
    },
    project_url: {
        type: String,
        required: true
    },
    project_image_url : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Project_items', Project_ItemSchema);