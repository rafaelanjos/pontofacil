var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lancamentoSchema = new Schema({
    timestamp: {
        type: Date,
        required: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    automatic: {
        type: Boolean,
        required: true,
    },
    calculate: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('lancamento', lancamentoSchema);