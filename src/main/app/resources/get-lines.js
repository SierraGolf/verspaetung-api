const repository = require('../repository');
const _ = require('underscore');
const moment = require('moment');

module.exports = (app) => {

    app.get('/lines', (req, res) => {

        const query = req.query;
        const validationResult = validateParameters(query);
        if (!validationResult.valid) {
            res.status(validationResult.status).send({errorMessage: validationResult.errorMessage});
            return;
        }

        const stops = repository.getStops();
        const matchingStop = _.find(stops, (stop) => stop.x === parseInt(query.x) && stop.y === parseInt(query.y));

        if (!matchingStop) {
            res.status(404).send({errorMessage: 'Could not find line for the given coordinates.'});
            return;
        }

        const lines = repository.getLines();
        const stopTimes = repository.getStopTimes();
        const delays = repository.getDelays();
        const delayedStopTimes = factorInDelays(lines, stopTimes, delays);
        const matchingStopTimes = _.filter(delayedStopTimes, (stopTime) => stopTime.stopId === matchingStop.id && stopTime.time === query.timestamp);

        if (matchingStopTimes.length === 0) {
            res.status(404).send({errorMessage: 'Could not find line for the given coordinates and time.'});
            return;
        }

        const matchingLines = _.filter(lines, (line) => {
            return _.find(matchingStopTimes, (matchingStopTime) => line.id === matchingStopTime.lineId)
        });

        res.send(matchingLines);
    });
};

function validateParameters(query) {

    if (!query.timestamp) {
        return createInvalidResult(400, 'Missing required query parameter: timestamp');
    }

    if (!/^\d{2}:\d{2}:\d{2}$/.test(query.timestamp)) {
        return createInvalidResult(400, 'Wrong format of query parameter: timestamp. Expected format is HH:mm:ss');
    }

    if (!query.x) {
        return createInvalidResult(400, 'Missing required query parameter: x');
    }

    if (!/^\d+$/.test(query.x)) {
        return createInvalidResult(400, 'Wrong format of query parameter: x. It must be an integer.');
    }

    if (!query.y) {
        return createInvalidResult(400, 'Missing required query parameter: y');
    }

    if (!/^\d+$/.test(query.y)) {
        return createInvalidResult(400, 'Wrong format of query parameter: y. It must be an integer.');
    }

    return {
        valid: true
    };
}

function createInvalidResult(status, errorMessage) {
    return {
        valid: false,
        status: status,
        errorMessage: errorMessage
    }
}

function factorInDelays(lines, stopTimes, delays) {

    const lineIdToLine = _.indexBy(lines, 'id');
    const lineNameToDelay = _.indexBy(delays, 'lineName');

    return _.map(stopTimes, (stopTime) => {

        const line = lineIdToLine[stopTime.lineId];
        const delay = lineNameToDelay[line.name];
        const today = moment().format('YYYY-MM-DD');
        const delayedTime = moment.utc(today + 'T' + stopTime.time)
                                  .add(delay.delay, 'minutes')
                                  .format('HH:mm:ss');

        return {
            lineId: stopTime.lineId,
            stopId: stopTime.stopId,
            time: delayedTime
        }
    });
}
