const mongoose = require('mongoose');
const { Schema } = mongoose;
const transportSchema = new Schema ({
    name: {
        required: true,
        type: String
    },
    departDate: {
        // required: true,
        type: Date
    },
    arriveDate: {   
        type: Date,
        // required: true
    },
    departTime:{
        type: String   
    },
    arriveTime: {
        type: String
    },
    reservationMade: {
        type: Boolean
    },
    modeSelector: {
        type: String,
    },
    cost: {
        type: Number
    }
}, {timestamps: true});
const TransportationModel = mongoose.model('Transportation', transportSchema);
module.exports = TransportationModel;