const axios = require('axios');
const logger = require('../engine/logger');


module.exports.post = (options) => {
    return axios({
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
        },
        ...options
    });
};

module.exports.get = (options) => {
    return axios({
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json',
        },
        ...options
    });
};

module.exports.checkStatusApi = (integrations) => {

    logger.info('### START CHECK STATUS APIs ###');

    const apis = Object.keys(integrations).map(key => {
        return {
            'name': key,
            'url': integrations[key].base_url
        };
    });

    const promises = apis.map((api, index) => {

        logger.info(`### CHECK ${index + 1} OF ${apis.length} ###`);

        return new Promise(resolve => {

            axios({
                'method': 'GET',
                'url': api.url
            })
                .then(() => {
                    logger.info(`### API "${api.name}" IS RUNNING ###`);
                    resolve({ ...api, status: 'SUCCESS' });
                })
                .catch(() => {
                    logger.error(`### API "${api.name}" IS NOT RUNNIG ###`);
                    resolve({ ...api, status: 'ERROR' });
                });
        });
    });

    return Promise.all(promises);
};

module.exports.requestRaterLimit = (config, reqPerMlSec, maxPerRequest) => {

};