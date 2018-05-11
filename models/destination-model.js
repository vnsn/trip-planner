const mongoose = require("mongoose");
const { Schema } = mongoose;

const destinationSchema = new Schema({
    name: {
        required: true,
        type: String
    },

    startDate: {
        // required: true,
        type: Date
    },

    endDate: {
        type: Date
    },

    climate: String,
    type: String,

    transportation: [{
        type: Schema.Types.ObjectId,
        ref: "Transportation"
    }],

    reservations: [{
        type: Schema.Types.ObjectId,
        ref: "Reservations"
    }]


},{timestamps: true});

const DestinationModel = mongoose.model("Destination", destinationSchema);
module.exports = DestinationModel;
