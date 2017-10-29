let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');
let getJoke = require('../models/getJoke');

describe('getJoke function', function () {
    // TODO: learn how to test promises with sinon
    it('Should return string of joke', function () {
        getJoke().then(function (res) {
            expect(res.text).to.be.instanceOf('string');
        }, function (err) {
            expect(1).to.be.equal(2);
        })
    })
});
