const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var newsSchema = new mongoose.Schema({
    newsletter:{
        type:String,
        required:true,
        unique:true
    }
});

//Export the model
module.exports = mongoose.model('Newsletter', newsSchema);