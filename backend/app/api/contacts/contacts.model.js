const config = require('../../../config/ecosystem.config');
const integrationsData = require('../../../helper/handlerIntegrationsData');
const handler = require('./contacts.dao');
const factory = require('./contacts.factory');
const helper = require('../../../helper/handlerFile');

module.exports.restoreData = async () => {

    const dataFile = helper.convertCsvToJson(config.data.url);
    const contacts = dataFile.map(contact => factory.createAContact(contact));

    const results = await handler.createManyContacts(contacts);

    return results.hits;
};

module.exports.associateContactToList = async (list, contacts) => {
    const contactsIds = contacts.map(contact => contact.id);

    const result = await handler.addContactsToList(list, contactsIds);

    return result;
};

module.exports.getContacts = async () => {
    let contacts = [];
    const listData = integrationsData.getInfoData('hubspot', 'listData');

    if (listData && listData.id) {
        contacts = await handler.getAllContacts(listData);

        if (!contacts.length)
            return [];

        return contacts;
    }

    return contacts;
};

module.exports.getDomains = async () => {
    let result = [];
    const list = integrationsData.getInfoData('hubspot', 'listData');

    if (list && list.id) {
        result = await handler.getAllContacts(list);

        if (result.length) {
            // FORMAT DOMAINS BY EMAILS
            result = result.map(contact => factory.getDomainByEmail(contact));

            // COUNT DOMAINS REPEATED
            return countDomains(result);

        } else
            return [];
    }

    return result;
};

function countDomains(domains) {
    const result = [];

    domains.map(current => {
        const filterEquals = obj => obj.domain === current.domain;
        const getDomainsFiltred = domains.filter(filterEquals);
        const checkAlreadyPushed = (toCheck) => result.some(d => d.domain === toCheck.domain);

        if (checkAlreadyPushed(current)) return;

        result.push({
            'domain': current.domain,
            'quantity': getDomainsFiltred.length
        });
    });

    return result;
}

