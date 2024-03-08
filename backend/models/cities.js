const mongoose = require("mongoose");

const citiesSchema = new mongoose.Schema({
    cityName:{
        type:String,
        required:true
    },
    supportEmail:{
        type:String,
        required:true
    }
})

const Cities = mongoose.model("Cities",citiesSchema)
module.exports = Cities