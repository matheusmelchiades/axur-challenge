const http = require('../../helper/http-client');
const logger = require('../../engine/logger');
const handlerListContacts = require('../api/contacts/contacts.dao');
const modelContact = require('../api/contacts/contacts.model');
const integrationsConfig = require('../../config/ecosystem.config').integrations;
const integrationsData = require('../../helper/handlerIntegrationsData');

const startHubspot = async () => {
    let hubspotList = integrationsData.getInfoData('hubspot', 'listData');

    if (hubspotList && hubspotList.id)
        return logger.info(`### LIST CONTACTS ALREADY CREATED: ${hubspotList.id} ###`);

    const list = await handlerListContacts.createLitsContacts();

    const contacts = await modelContact.restoreData();

    await modelContact.associateContactToList(list, contacts);

    integrationsData.setInfoData('hubspot', {
        'listData': list
    });
};

const startIntegration = (apis) => {
    switch (apis.name) {
        case 'hubspot':
            return startHubspot();
        default:
            return;
    }
};

module.exports.run = async () => {
    try {

        const apiStatus = await http.checkStatusApi(integrationsConfig);

        const apisRunnings = apiStatus.filter(api => api.status === 'SUCCESS');


        await Promise.all(apisRunnings.map(api => startIntegration(api)));

    } catch (err) {
        logger.error('### ERROR IN RUNNING JOBS ###');
        console.log(err);
    }
};

