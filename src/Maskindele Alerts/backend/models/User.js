const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    login: {type: String, required: true},
    vkId: {type: String},
    vkToken: {type: String},
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Messages'
        }
    ]
}, {timestamps: true});

module.exports = model('User', schema);