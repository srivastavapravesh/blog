const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId= mongoose.Types.ObjectId;

const schema = new Schema ({
    userId: ObjectId,
    postId: ObjectId,
    comment:  String,
},
{
    timestamps:true
});

//schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('userComments', schema);