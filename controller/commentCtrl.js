const Blog = require("../models/blogModel");
const Comment = require("../models/comment");


const commentInfo = async (req, res) => {
    try {
        const comStore = []
        const comment = req.body;
        comment.postId = req.params.id
        const saveCom = await new Comment(comment)
        saveCom.save()
        comStore.push(saveCom)
        // next()
        // ====== second middleWare ======
        const dPost = await Blog.findById(saveCom.postId)
        if(dPost._id == saveCom.postId){
            dPost.commentInfo.push(saveCom)
            dPost.save()
        } 
        // ======== third middleware ========
        
        res.send(comStore)
    } catch (err) {
        console.log(err)
    }
}


module.exports = commentInfo