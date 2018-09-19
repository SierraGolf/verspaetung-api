const {expect} = require('chai');
const {Before, Then, When} = require('cucumber');
const request = require('request');

let linesResponse = null;

Before(() => {
    linesResponse = null;
});

When(/^the get lines endpoint is called with the following parameters$/, (data, callback) => {
    request.get({
        url: 'http://localhost:8081/lines',
        qs: data.hashes()[0],
        simple: false,
        json: true,
        resolveWithFullResponse: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }, (error, response) => {

        if (error) {
            linesResponse = error;
        } else {
            linesResponse = response;
        }

        callback();
    });
});

Then(/^the get lines response is expected to have the status "([^"]*)"$/, (status) => {
    expect(linesResponse.statusCode).to.be.equal(parseInt(status));
});

Then(/^the get lines response is expected to contain the following data$/, (data) => {

    const expectedData = data.hashes()[0];
    const actualData = linesResponse.body[0];

    // TODO assert all not just the first

    expect(linesResponse.body.length).to.be.equal(data.hashes().length);
    expect(actualData.id).to.be.equal(parseInt(expectedData.id));
    expect(actualData.name).to.be.equal(expectedData.name);
});

Then(/^the get lines response is expected to have the error "([^"]*)"$/, (error) => {
    expect(linesResponse.body.errorMessage).to.contain(error);
});