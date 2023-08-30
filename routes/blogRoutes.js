const { oneBlog, homeCtrl, aboutCtrl, postBlog, getBlog, errorPage, hotBlog, contactCtrl, commentInfo }= require('../controller/blogCtrl');
// const commentInfo = require('../controller/commentCtrl');
const newsCtrl = require('../controller/newsCtrl');
const adminAuth = require('../middlewares/adminAuth');


const router = require('express').Router();



// const { regForm, loginForm, postReg, postLogin } = require('../controller/adminCtrl')


// ======= admin router ======== //
// router.route('/admin/register').get(regForm).post(postReg)
// router.route('/admin/login').get(loginForm).post(postLogin)

// ======= Blog router ======== //
router.get('/', adminAuth, homeCtrl)
router.route('/post/:id').get(oneBlog).post(commentInfo)
router.route('/postBlog', adminAuth).get(getBlog).post(postBlog)
router.get('/about', aboutCtrl)
router.get('/contact', contactCtrl)
router.get('/hotBlog', hotBlog);
router.post('/newsletter', newsCtrl)
router.get('*', errorPage);


module.exports = router
