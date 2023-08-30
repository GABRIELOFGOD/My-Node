const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var commentSchema = new mongoose.Schema({
    comment:{
        type:String
    },
    email:{
        type:String
    },
    name:{
        type:String
    },
    postId:{
        type:String
    }
});

//Export the model
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;