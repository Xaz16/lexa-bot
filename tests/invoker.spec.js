let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');
let invoker = require('../utils/invoker');

describe('Invoker function', function () {
    let clock;

    beforeEach(function () {
        clock = sinon.useFakeTimers();
    });

    afterEach(function () {
        clock.restore();
    });

    it('should make get request each 5 minutes for keep app in work', function () {

        invoker(function (res) {
            expect(res).to.not.be.undefined;
        });

        clock.tick(300001);

    });

    it('shouldn\'t crash if callback is not specified', function () {
        invoker();

        clock.tick(300001);

        expect(1).to.equal(1);
    })

});
