const fs = require('fs');
const logger = require('../engine/logger');

module.exports.convertCsvToJson = (url, separator = ',') => {
    try {

        const contentFile = fs.readFileSync(`${process.cwd()}/${url}`, 'utf-8');
        const formatedFile = contentFile.split('\n').filter(row => !!row);
        const rows = formatedFile.map(row => row.split(separator));
        const header = rows.shift();

        return rows.map(row => factoryBySample(header, row));
    } catch (err) {
        logger.error('Error in convert csv to json');
    }
};


const factoryBySample = (sample, content) => {
    let object = {};

    sample.map((field, index) => {
        object[field] = content[index];
    });

    return object;
};