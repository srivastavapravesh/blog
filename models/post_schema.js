const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId= mongoose.Types.ObjectId;

const schema = new Schema ({
    userId: ObjectId,
    title: {type: String, required: true},
    body:  {type: String, required: true},
},
{
    timestamps:true
});

// schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('userPosts', schema);