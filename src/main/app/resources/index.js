const initializeLinesResource = require('./get-lines');
const initializeDelayResource = require('./get-delay');

module.exports = (app) => {
    initializeLinesResource(app);
    initializeDelayResource(app);
};