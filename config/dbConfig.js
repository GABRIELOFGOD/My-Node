const mongoose = require('mongoose');

const dbConnect = async () =>{
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    .then(() =>{
        console.log(`Data Base Connected Successfully`)
    })
    .catch(err =>{
        console.log(`Data Base connection failed`)
        // process.exit();
    })
}

module.exports = dbConnect;



