const repository = require('../repository');
const _ = require('underscore');
const moment = require('moment');

module.exports = (app) => {

    app.get('/lines', (req, res) => {

        const query = req.query;

        // TODO potentially do more validations (e.g. timestamp format, x/y need to be numbers)
        if (!query.timestamp) {
            res.status(400).send({errorMessage: 'Missing required parameter: timestamp'});
            return;
        }

        if (!query.x) {
            res.status(400).send({errorMessage: 'Missing required parameter: x'});
            return;
        }

        if (!query.y) {
            res.status(400).send({errorMessage: 'Missing required parameter: y'});
            return;
        }

        const stops = repository.getStops();
        const matchingStop = _.find(stops, (stop) => stop.x === parseInt(query.x) && stop.y === parseInt(query.y));

        if (!matchingStop) {
            res.status(404).send({errorMessage: 'Could not find line for the given coordinates and time.'});
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

function factorInDelays(lines, stopTimes, delays) {

    const lineIdToLine = _.indexBy(lines, 'id');
    const lineNameToDelay = _.indexBy(delays, 'lineName');

    return _.map(stopTimes, (stopTime) => {

        const line = lineIdToLine[stopTime.lineId];
        const delay = lineNameToDelay[line.name];
        const todayAsString = moment().format('YYYY-MM-DD');
        const delayedTime = moment.utc(todayAsString + 'T' + stopTime.time)
                                  .add(delay.delay, 'minutes')
                                  .format('HH:mm:ss');

        return {
            lineId: stopTime.lineId,
            stopId: stopTime.stopId,
            time: delayedTime
        }
    });
}
