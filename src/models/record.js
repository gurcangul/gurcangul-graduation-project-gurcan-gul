const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creates db schema
const RecordSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    counts: {
        type: Array,
        required: true
    },
    value: {
        type: String,
        required: true
    }
},
    { collection: 'records' }
);

module.exports = mongoose.model('records', RecordSchema);