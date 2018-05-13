const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservationSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    type: {
        required: true,
        type: String
    },
    dateIn: {
        // required: true,
        type: Date
    },
    dateOut: {
        type: Date
    },
    timeIn: {
        type: String
    },
    timeOut: {
        type: String
    },
    reservationMade: {
        type: Boolean
    },
    confirmationNumber: {
        type: Number
    },
    howEarly: {
        type: String
    },
    seatNumber: {
        type: String
    },
    phone: {
        type: Number
    },
    address: {
        type: String
    }
}, {timestamps: true});

const reservationModel = mongoose.model("Reservation", reservationSchema);
module.exports = reservationModel;