const mongoose = require("mongoose");
const mURL = "mongodb://localhost:27017/";
// const mURL = "mongodb+srv://ravigupta77389:Ravi$500@cluster0.3nuxwpq.mongodb.net/";
const mconnect = () => {
    if (mongoose.connect(mURL)) {
        console.log("connected");
    }
    else {
        console.log("not connected");
    }
}

module.exports = mconnect;