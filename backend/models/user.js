const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    society: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Society",
    },
    complaints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaint"
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    }],
    contact: {
        phone: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

//soceity, complaints, posts
// mongoose.Schema.Types.ObjectId