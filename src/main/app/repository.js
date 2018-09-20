const _ = require('underscore');

let lines;
let stopTimes;
let stops;
let delays;

module.exports = {
    getLines() {
        if (!lines) {
            lines = readCsv('lines.csv', (line) => ({id: parseInt(line.line_id), name: line.line_name}));
        }

        return lines;
    },
    getStopTimes() {
        if (!stopTimes) {
            stopTimes = readCsv('stop_times.csv', (stopTime) => ({lineId: parseInt(stopTime.line_id), stopId: parseInt(stopTime.stop_id), time: stopTime.time}));
        }

        return stopTimes;
    },
    getStops() {
        if (!stops) {
            stops = readCsv('stops.csv', (stop) => ({id: parseInt(stop.stop_id), x: parseInt(stop.x), y: parseInt(stop.y)}));
        }

        return stops;
    },
    getDelays() {
        if (!delays) {
            delays = readCsv('delays.csv', (delay) => ({lineName: delay.line_name, delay: parseInt(delay.delay)}));
        }

        return delays;
    }
};

// TODO reading files synchronously is something you usually don't do in nodejs, but then again using a csv as a database is also just a temp solution :)
function readCsv(fileName, converter) {
    const loader = require('csv-load-sync');
    const rawData = loader(__dirname + '/../data/' + fileName);
    return _.map(rawData, converter);
}