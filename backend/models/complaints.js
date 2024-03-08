const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    address: {
        type: String,
        required: true
    },
    resolved:{
        type: Boolean,
        default: false
    },
    image: {
        type: String
    }
});

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;