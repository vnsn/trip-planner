const mongoose = required ('mongoose');
const { Schema } = mongoose;

const tripSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    dateIn: {
        required: true,
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
    confirmationNumber: {
        type: Number
    },
    notification: {
        required: true,
        type: boolean
    },
    seatNumber: {
        type: Number
    },
    phone: {
        type: Number
    },
    address: {
        type: String
    }
})

const reservationModel = mongoose.model("reservation", tripSchema);
module.exports = reservationModel;