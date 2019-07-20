const http = require('../../helper/http-client');
const logger = require('../../engine/logger');
const integrationsConfig = require('../../config/ecosystem.config').integrations;
const handlerListContacts = require('../api/contacts/contacts.dao');

const startHubspot = async () => {
    // const list = await handlerListContacts.createLitsContacts();

    // console.log(list.name)
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

