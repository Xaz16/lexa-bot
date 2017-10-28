let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');
let invoker = require('../utils/invoker');

describe('Invoker function', function () {
    let clock;

    it('should make get request each 5 minutes for keep app in work', function () {
        clock = sinon.useFakeTimers();

        invoker(function (res) {
            expect(res).to.not.be.undefined;
        });

        clock.tick(300001);

    })

});
