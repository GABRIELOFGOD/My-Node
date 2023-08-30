const Blog = require('../models/blogModel');
const Comment = require('../models/comment');



const comStore = []
const homeCtrl = async (req, res) => {
    try {
        const posts = await Blog.find().sort({ createdAt: -1 })
        res.render('index', { posts })
    } catch (error) {
        console.log(error)
    }
}

const commentInfo = async (req, res) => {
    try {
        const comment = req.body;
        comment.postId = req.params.id
        const saveCom = await new Comment(comment)
        saveCom.save()
        // comStore.push(saveCom)
        // ====== second middleWare ======
        const dPost = await Blog.findById(saveCom.postId)
        if(dPost._id == saveCom.postId){
            dPost.commentInfo.push(saveCom)
            dPost.save()
        } 
        // ======== third middleware ========
        const postCom = dPost.commentInfo
        // let id
        postCom.forEach(i => {
            console.log(i._id)
        })
        // const dComG = await Comment.find()
        // res.redirect(`post/${comment.postId}`)
    } catch (err) {
        console.log(err)
    }
}

const hotBlog = async (req, res) => {
    let arr = [];
    try {
        const posts = await Blog.find().sort({ createdAt: -1 });
        posts.map(post => {
            if(post.hotBlog === true){
                arr.push(post)
                // console.log(arr)
            }
        })
        res.render('hotBlog', { arr });
    } catch (error) {
        console.log(error.message)
    }
}

const oneBlog = async (req, res) => {
    try {
        
        // Initial Correct Code
        const hid = req.params.id;
        const onePost = await Blog.findById({ _id: hid })
        res.render('post', { onePost, comStore })
    } catch (error) {
        console.log(error)
    }
    
}

const aboutCtrl = (req, res) =>{
    res.render('about')
}

const contactCtrl = (req, res) => {
    res.render('contact')
}

const getBlog = (req, res) =>{
    res.render('postBlog')
}


const postBlog = async (req, res) =>{
    const blogg = req.body;
    if (blogg.hotBlog == 'hotBlog') {
        blogg.hotBlog = true;
    }
    const newBlog = await new Blog(blogg)
    newBlog.save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
    
}


const errorPage = (req, res) =>{
    res.render('errorPage')
}


module.exports = { oneBlog, homeCtrl, aboutCtrl, postBlog, getBlog, errorPage, hotBlog, contactCtrl, commentInfo };
