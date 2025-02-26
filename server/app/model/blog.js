const mongoose = require('mongoose');
const CommentSchema = require('./comment');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is Required"
    },
    image: {
        type: String,
        required: "Enter image it is Required"
    },
    description: {
        type: String,
        required: "Description is Required"
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author',
        required: "Author Id is Required"
    },
    comments: [CommentSchema] // Import comment schema for to show comment
}, { timestamps: true });

const BlogModel = mongoose.model('blog', BlogSchema);

module.exports = BlogModel;