const express = require('express');
const app = express();
const initializeResources = require('./app/resources');

initializeResources(app);

app.listen('8081');
