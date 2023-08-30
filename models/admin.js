const mongoose = require('mongoose'); // Erase if already required
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'please enter your name'],
    },
    email:{
        type:String,
        required:[true, 'please enter a email'],
        unique:[true, 'this email is already used by another admin'],
        validate: [isEmail, 'please enter avalid email']
    },
    mobile:{
        type:Number,
        required:[true, 'please input your mobile number'],
        unique:[true, 'this number is already been used by another admin'],
        minlength: [10, 'mobile must be at least 10 numbers']
    },
    password:{
        type:String,
        required:[true, 'please enter a password'],
        minlength: [6, 'password must be at least 6 characters']
    },
}, { timestamps: true } );

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

userSchema.statics.logIn = async function(email, password) {
    const user = await this.findOne({ email });
    if (user){
        const checkPass = await bcrypt.compare(password, user.password)
        if (checkPass) {
            return user;
        } else {
            throw Error('The Password is Not Correct')
        }
    } else{
        throw Error('This Email is not registered')
    }
}



//Export the model
const Admin = mongoose.model('Admin', userSchema);

module.exports = Admin;




