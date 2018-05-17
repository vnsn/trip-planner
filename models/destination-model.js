const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

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

    transportations: [{
        type: Schema.Types.ObjectId,
        ref: "Transportation", 
        autopopulate: true
    }],

    reservations: [{
        type: Schema.Types.ObjectId,
        ref: "Reservation",
        autopopulate: true
    }]


},{timestamps: true});

destinationSchema.plugin(autopopulate);

const DestinationModel = mongoose.model("Destination", destinationSchema);
module.exports = DestinationModel;
