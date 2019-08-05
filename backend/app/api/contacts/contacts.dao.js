const http = require('../../../helper/http-client');
const factory = require('./contacts.factory');
const listContactConfig = require('../../../config/ecosystem.config').integrations.hubspot;
const logger = require('../../../engine/logger');

module.exports.createLitsContacts = async () => {

    try {

        logger.info('###  CREATING LIST OF CONTACTS ###');

        const response = await http.post({
            'url': `${listContactConfig.base_url}${listContactConfig.currentPath}/lists`,
            'data': {
                'name': listContactConfig.listName
            },
            'params': {
                [listContactConfig.apiKeyField]: listContactConfig.apiKeyValue
            }
        });

        logger.info(`###  CREATED WITH SUCCESS "LIST=${response.data.name}" "LISTID=${response.data.listId}" ###`);

        return Promise.resolve(factory.responseListContactData(response.data));

    } catch (err) {
        if (err.response && err.response.data && err.response.data.errorType) {

            logger.error(`### ERROR IN CREATING LIST: ${err.response.data.errorType} ###`);

            return err.response.data;
        } else
            logger.error('### ERROR CREATE LIST CONTACTS ###');

        return Promise.reject(err);
    }
};

module.exports.createManyContacts = async (contacts) => {
    try {

        logger.info('###  CREATING A LOT OF CONTACTS ###');

        const result = await http.requestRaterLimit(
            {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                },
                'url': `${listContactConfig.base_url}${listContactConfig.currentPath}/contact`,
                'data': contacts,
                'params': {
                    [listContactConfig.apiKeyField]: listContactConfig.apiKeyValue
                }
            }, {
                'reqPerMlSec': listContactConfig.ratelimit,
                'maxPerRequest': 10,
            }, {
                'success': factory.responseContactData,
                'error': factory.responseErrorData
            }
        );

        if (contacts.length === result.hits.length)
            logger.info(`###  CREATED ALL ${result.hits.length} WITH SUCCESS ###`);

        if (result.errors.length) {
            logger.info(`###  ERROR IN CREATE ${result.errors.length} CONTACTS ###`);
            console.log(result.errors);
        }

        return Promise.resolve(result);

    } catch (err) {
        if (err.response && err.response.data && err.response.data.errorType) {
            logger.error(`### ERROR IN CREATING CONTACTS: ${err.response.data.errorType} ###`);
            return err.response.data;
        } else
            logger.error('### ERROR CREATE MANY CONTACTS ###');

        return Promise.reject(err);
    }
};

module.exports.addContactsToList = async (list, contactsIds = []) => {
    try {

        logger.info(`###  ADD CONTACTS TO LIST "${list.id}" "${list.name}" ###`);

        const response = await http.post({
            'url': `${listContactConfig.base_url}${listContactConfig.currentPath}/lists/${list.id}/add`,
            'data': {
                'vids': contactsIds,
            },
            'params': {
                [listContactConfig.apiKeyField]: listContactConfig.apiKeyValue
            }
        });

        if (response.data && response.data.updated.length !== contactsIds.length)
            logger.error(`### ERROR IN ASSOCIATE ALL CONTACTS TO LIST: ${contactsIds.length - response.data.updated.length} ###`);
        else
            logger.info(`###  ADD CONTACTS TO LIST "${list.name}" WITH SUCESS ###`);

        return Promise.resolve(response.data);

    } catch (err) {
        if (err.response && err.response.data && err.response.data) {

            logger.error(`### ERROR IN ASSOCIATE CONTACTS TO LIST: ${JSON.stringify(err.response.data)} ###`);

            return err.response.data;
        } else
            logger.error('### ERROR ASSOCIATE CONTACTS TO LIST ###');

        return Promise.reject(err);
    }
};

module.exports.getAllContacts = async (list) => {

    try {
        logger.info('###  GET ALL CONTACTS ###');

        const response = await http.get({
            'url': `${listContactConfig.base_url}${listContactConfig.currentPath}/lists/${list.id}/contacts/all`,
            'params': {
                [listContactConfig.apiKeyField]: listContactConfig.apiKeyValue,
                'property': ['firstname', 'lastname', 'email', 'gender'],
                'count': 100
            },
            'paramsSerializer': http.serializeParams
        });

        const { contacts } = response.data;

        if (!contacts) {
            logger.info('###  ERROR GET CONTACTS RESPONSE ###');
            return [];
        }

        logger.info('###  GET ALL CONTACTS WITH SUCCESS ###');

        return Promise.resolve(contacts.map(contact => factory.responseContactData(contact)));

    } catch (err) {

        if (err.response && err.response.data && err.response.data.message) {

            logger.error(`### ERROR IN GET CONTACTS: ${err.response.data.message} ###`);

            return Promise.reject(err.response.data);
        } else {

            logger.error('### ERROR GET IN CONTACT ###');

            return Promise.reject(err);
        }
    }
};