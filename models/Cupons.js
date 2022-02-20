const {model, Schema} = require('mongoose');

const Cupom = model(
    "Cupom", 
    new Schema({
        title: { type: String, required: true},
        code: { type: String, required: true},
        category: { type: String, required: true},
        expDate: { type: String, required: true}
    })
);

module.exports = Cupom;