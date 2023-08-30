const mongoose = require('mongoose'); // Erase if already required
const Comment = require('./comment');

// Declare the Schema of the Mongo model
const blogSchema = new mongoose.Schema({
    blogTittle:{
        type:String,
        required:true,
    },
    blogHeadline:{
        type:String,
    },
    blogBody:{
        type:String,
        required:true,
        unique:true,
    },
    blogBy:{
        type:String,
        unique: false
    },
    hotBlog:{
        type: Boolean,
        default: false
    },
    commentInfo:[
        {
        type:mongoose.Schema.ObjectId,
        ref: Comment
        }
    ]
}, { timestamps: true });

//Export the model
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;






