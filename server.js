const express = require('express');
const bodyParser = require('body-parser');
const config = require('./configs/');
const app = express();
const PORT = 8000;
const routes = require('./routes/');
require('./models/mongo');
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

app.use('*', require('./middlewares/verifyToken'));
 
app.use('/', routes);
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});