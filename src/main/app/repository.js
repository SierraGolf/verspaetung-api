// TODO read from csv and convert format

module.exports = {
    getLines() {
        return [
            {
                id: 0,
                name: 'M4'
            },
            {
                id: 1,
                name: '200'
            },
            {
                id: 2,
                name: 'S75'
            }
        ]
    },
    getStopTimes() {
        return [
            {
                lineId: 0,
                stopId: 0,
                time: '10:00:00'
            },
            {
                lineId: 0,
                stopId: 1,
                time: '10:02:00'
            },
            {
                lineId: 0,
                stopId: 2,
                time: '10:05:00'
            },
            {
                lineId: 0,
                stopId: 3,
                time: '10:07:00'
            },
            {
                lineId: 0,
                stopId: 4,
                time: '10:09:00'
            },
            {
                lineId: 1,
                stopId: 5,
                time: '10:01:00'
            },
            {
                lineId: 1,
                stopId: 6,
                time: '10:04:00'
            },
            {
                lineId: 1,
                stopId: 7,
                time: '10:06:00'
            },
            {
                lineId: 1,
                stopId: 3,
                time: '10:08:00'
            },
            {
                lineId: 1,
                stopId: 8,
                time: '10:10:00'
            },
            {
                lineId: 2,
                stopId: 3,
                time: '10:08:00'
            },
            {
                lineId: 2,
                stopId: 9,
                time: '10:09:00'
            },
            {
                lineId: 2,
                stopId: 4,
                time: '10:11:00'
            },
            {
                lineId: 2,
                stopId: 10,
                time: '10:13:00'
            },
            {
                lineId: 2,
                stopId: 11,
                time: '10:15:00'
            }
        ]
    },
    getStops() {
        return [
            {
                id: 0,
                x: 1,
                y: 1
            },
            {
                id: 1,
                x: 1,
                y: 4
            },
            {
                id: 2,
                x: 1,
                y: 7
            },
            {
                id: 3,
                x: 2,
                y: 9
            },
            {
                id: 4,
                x: 3,
                y: 11
            },
            {
                id: 5,
                x: 3,
                y: 1
            },
            {
                id: 6,
                x: 3,
                y: 4
            },
            {
                id: 7,
                x: 3,
                y: 7
            },
            {
                id: 8,
                x: 1,
                y: 10
            },
            {
                id: 9,
                x: 2,
                y: 12
            },
            {
                id: 10,
                x: 4,
                y: 9
            },
            {
                id: 11,
                x: 5,
                y: 7
            }
        ]
    },
    getDelays() {
        return [
            {
                lineName: 'M4',
                delay: 1
            },
            {
                lineName: '200',
                delay: 2
            },
            {
                lineName: 'S75',
                delay: 10
            }
        ]
    }
};