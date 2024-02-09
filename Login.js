const mongoose = require("mongoose");
// const {Schema} = mongoose ;

const FeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        // title : String 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    feedback: {
        type: String,
        required: true
    }

})


module.exports = mongoose.model('feedback', FeSchema);