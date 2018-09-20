const repository = require('../repository');
const _ = require('underscore');

module.exports = (app) => {

    app.get('/lines/:lineName', (req, res) => {

        const lineName = req.params.lineName;

        // TODO this is a bit nonsense because the other route makes this error impossible to occur as they have the same path without parameters
        if (!lineName) {
            res.status(400).send({errorMessage: 'Missing required path parameter: lineName'});
            return;
        }

        const lines = repository.getLines();
        const lineNameToLine = _.indexBy(lines, 'name');

        if (!lineNameToLine[lineName]) {
            res.status(404).send({errorMessage: 'Could not find line for the given name.'});
            return;
        }

        const delays = repository.getDelays();
        const lineNameToDelay = _.indexBy(delays, 'lineName');
        const delayData = lineNameToDelay[lineName];
        const delay = delayData ? delayData.delay : 0;

        res.send({delay: delay});
    });
};