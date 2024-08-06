const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Blog', blogSchema);