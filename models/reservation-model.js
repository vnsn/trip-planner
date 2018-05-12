const mongoose = required ('mongoose');
const { Schema } = mongoose;

const reservationSchema = new Schema({
    name: {
        required: true,
        type: String,
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
})

const reservationModel = mongoose.model("Reservation", reservationSchema);
module.exports = reservationModel;