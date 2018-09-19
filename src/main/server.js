const express        = require('express');
const app            = express();


// TODO this sucks
require('./app/resources')(app);

app.listen('8081');