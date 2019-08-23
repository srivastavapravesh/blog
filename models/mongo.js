const mongoose = require('mongoose');

const config = require('./../configs/');
console.log('config.mongo.url', config.mongo.url);
mongoose.connect(config.mongo.url, {useNewUrlParser: true}).then(() => {
    console.log('MongoDB connected successfully');
}).catch((error) => {
    console.log('MongoDB connection failed', error);
});