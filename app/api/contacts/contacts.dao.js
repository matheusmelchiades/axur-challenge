const http = require('../../../helper/http-client');
const factory = require('../contacts/contacts.factory');
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

        return Promise.resolve(response.data);

    } catch (err) {
        if (err.response && err.response.data && err.response.data.errorType) {

            logger.error(`### ERROR IN CREATING LIST: ${err.response.data.errorType} ###`);

            return err.response.data;
        } else
            logger.error('### ERROR CREATE LIST CONTACTS ###');
        return err;
    }
};

module.exports.createAContact = async (contact) => {
    try {

        logger.info('###  CREATING A  CONTACT ###');

        const response = await http.post({
            'url': `${listContactConfig.base_url}${listContactConfig.currentPath}/contact`,
            'data': contact,
            'params': {
                [listContactConfig.apiKeyField]: listContactConfig.apiKeyValue
            }
        });

        contact = factory.responseData(response.data);

        logger.info(`###  CREATED CONTACT "ID=${contact.id}" "NAME=${contact.firstname}" WITH SUCCESS ###`);

        return Promise.resolve(contact);

    } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {

            logger.error(`### ERROR IN CREATING CONTACT: ${err.response.data.message} ###`);

            return err.response.data;
        } else
            logger.error('### ERROR CREATE CONTACT ###');
        return err;
    }
};

module.exports.addContactsToList = async (listId, contactsId = []) => {
    try {

        logger.info(`###  ADD CONTACTS TO LIST ${listId} ###`);

        const response = await http.post({
            'url': `${listContactConfig.base_url}${listContactConfig.currentPath}/lists/${listId}/add`,
            'data': {
                'vids': contactsId,
            },
            'params': {
                [listContactConfig.apiKeyField]: listContactConfig.apiKeyValue
            }
        });

        logger.info('###  ADD CONTACTS TO LIST WITH SUCESS ###');

        return Promise.resolve(response.data);

    } catch (err) {
        if (err.response && err.response.data && err.response.data) {

            logger.error(`### ERROR IN CREATING CONTACT: ${JSON.stringify(err.response.data)} ###`);

            return err.response.data;
        } else
            logger.error('### ERROR CREATE CONTACT ###');
        return err;
    }
};