const {Schema, model} = require('mongoose');

const schema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {type: String, required: true}
}, {timestamps: true});

module.exports = model('Messages', schema);