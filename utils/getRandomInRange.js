function getRandomInRange(min, max) {
    if(max < min) {
        return new Error('Maximum shouldn\'t be less than minimum');
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = getRandomInRange;