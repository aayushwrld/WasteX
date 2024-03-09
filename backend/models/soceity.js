const mongoose = require("mongoose");

const societySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique: true
    },
    location:{
        type:String,
        required:true
    },
    reviews:[
        {
            body:{
                type:String
            },
            date:{
                type:Date,
                default: new Date()
            }
        }
    ],
    residents:{
        type: Number,
        required: true
    }
});

const Society = mongoose.model("Society", societySchema);

module.exports = Society;