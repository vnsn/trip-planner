const mongoose = require ('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        
    },
    password: {
        required: true,
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

},{timestamps: true});

module.exports = mongoose.model("User", userSchema);