const {expect} = require('chai');
const {Before, Then, When} = require('cucumber');
const request = require('request');

let linesResponse = null;

Before(() => {
    linesResponse = null;
});

When(/^the get delay endpoint is called for line "([^"]*)"$/, (name, callback) => {

    request.get({
        url: 'http://localhost:8081/lines/' + name,
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

Then(/^the get delay response is expected to have the status "([^"]*)"$/, (status) => {
    expect(linesResponse.statusCode).to.be.equal(parseInt(status));
});

Then(/^the get delay response is expected to contain the following data$/, (data) => {

    const expectedData = data.hashes()[0];
    const actualData = linesResponse.body;
    expect(actualData.delay).to.be.equal(parseInt(expectedData.delay));
});

Then(/^the get delay response is expected to have the error "([^"]*)"$/, (error) => {
    expect(linesResponse.body.errorMessage).to.contain(error);
});