const mongoose = require('mongoose');
const { Schema } = mongoose;
const transportModel = new Schema ({
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
    reservation: {
        type: Boolean
    },
    modeSelector: {
        type: String,
        
    },
    cost: {
        type: Number
    }
});
const transportModel = mongoose.model('Transportation', transportSchema);
module.exports = transportModel;