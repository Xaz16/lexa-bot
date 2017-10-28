let chai = require('chai');
let expect = chai.expect;
let getRandomInRange = require('../utils/getRandomInRange');

describe('getRandomInRange(max, min) should return random number from max to min range. Should return error when min greater than max', function () {
    it('should return from 1 to 2', function () {
        let result = getRandomInRange(1, 2);

        expect(result).to.be.at.least(1);
        expect(result).to.be.at.most(2);
    });

    it('should return from 5 to 10', function () {
        let result = getRandomInRange(5, 10);

        expect(result).to.be.at.least(5);
        expect(result).to.be.at.most(10);
    });

    it('should return from 20 to 30', function () {
        let result = getRandomInRange(20, 30);

        expect(result).to.be.at.least(20);
        expect(result).to.be.at.most(30);
    });

    it('should return from 1000 to 2000', function () {
        let result = getRandomInRange(1000, 2000);

        expect(result).to.be.at.least(1000);
        expect(result).to.be.at.most(2000);
    });

    it('should return from 10000 to 20000', function () {
        let result = getRandomInRange(10000, 20000);

        expect(result).to.be.at.least(10000);
        expect(result).to.be.at.most(20000);
    });

    it('should return error because min greater than max', function () {
        let result = getRandomInRange(20001, 20000);

        expect(result).to.be.an.instanceOf(Error);
    });
});