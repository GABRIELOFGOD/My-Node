const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')


// ===== handling errors ====== //
const handleErrors = (err) => {
    console.log(err.message, err.status)
    let errors = {
        name: '',
        email: '',
        mobile: '',
        password: '',
        password: ''
    }

    if(err.message == 'This Email is not registered'){
        errors.email = 'Invalid or Unregistered Email'
    }

    if(err.message == 'The Password is Not Correct'){
        errors.password = 'Invalid Password'
    }

    if(err.code === 11000){
        errors.email = 'This email or Number is already been used by another admin'
    }

    if(err.message.includes('Admin validation failed')){
        Object.values(err.errors).forEach(({properties}) => (
            errors[properties.path] = properties.message
        ))
    }
    return errors;
}

// ===== signing jwt token ======= //
const maxAge = 3*24*60*60
const createdToken = (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN, { expiresIn: maxAge })
}



const regForm = (req, res) => {
    res.render('register')
}



const loginForm = (req, res) => {
    res.render('login')
}

const postReg = async (req, res) => {
    const {name, email, mobile, password} = req.body;
    try {
        const  newAdmin = await Admin.create({name, email, mobile, password})
        const token = createdToken(newAdmin._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 })
        res.status(201).json({user: newAdmin._id})
    } catch (err) {
        const errors = handleErrors(err);
        res.status(401).json({ errors })
    }
}

const postLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await Admin.logIn( email, password )
        const token = createdToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user: user._id })
    } catch (err) {
        const errors = handleErrors(err)
        res.status(401).json({ errors })
    }
}


module.exports = { regForm, loginForm, postReg, postLogin }
