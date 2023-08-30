

const router = require('express').Router()
const { regForm, loginForm, postReg, postLogin } = require('../controller/adminCtrl')

router.route('/admin/register').get(regForm).post(postReg)
router.route('/admin/login').get(loginForm).post(postLogin)




module.exports = router
