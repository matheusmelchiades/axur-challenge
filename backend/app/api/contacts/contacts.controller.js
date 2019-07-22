const boom = require('boom');
const model = require('./contacts.model');

module.exports.getContacts = async () => {
    try {

        return await model.getContacts();

    } catch (error) {
        console.log(error);
        if (!error.isBoom)
            throw boom.boomify(error);
        throw error;
    }
};

module.exports.getDomains = async () => {
    try {

        return await model.getDomains();

    } catch (error) {
        console.log(error);
        if (!error.isBoom)
            throw boom.boomify(error);
        throw error;
    }
};