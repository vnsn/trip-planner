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
        type: boolean,
        default: false
    },
    trips: [{
        type: Schema.Types.ObjectId,
        ref: "Trip"

    }]

},{timestamps: true});

module.exports = mongoose.model("User", userSchema);