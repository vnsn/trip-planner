const mongoose = require("mongoose");
const { Schema } = mongoose;

const tripSchema = new Schema({
    name: {
        required: true,
        type: String
    },

    startDate: {
        // required: true,
        type: Date
    },

    endDate: {
        // required: true,
        type: Date
    },

    destinations: [{
        type: Schema.Types.ObjectId,
        ref: "Destination"
    }]


},{timestamps: true});

const TripModel = mongoose.model("Trip", tripSchema);
module.exports = TripModel;