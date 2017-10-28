let chai = require('chai');
let expect = chai.expect;
let parseFile = require('../utils/parseFile');

describe('ParseFile function', function() {
    it('ParseFile() should return object or array from json which path provided in parameter', function() {

        expect(parseFile('tests/data/parseFileExample.json')).to.have.all.keys('test', 'parse');
    });
    it('If parseFile didn\'t find any files it should return empty object', function() {

        expect(parseFile('tests/data/parseFileExampleError.json')).to.be.an('object').that.is.empty;
    });
});