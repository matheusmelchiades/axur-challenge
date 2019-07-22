const qs = require('querystring');
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

module.exports.requestRaterLimit = async (config, optionsRequets = { reqPerMlSec: 0, maxPerRequest: 1 }, factories = {}) => {
    let data = config.data || [],
        breakBlock = Math.ceil(Math.abs(data.length / optionsRequets.maxPerRequest)),
        result = { 'hits': [], 'errors': [] };

    logger.info(`### TOTAL TO RESQUESTS TO DO ${data.length} ###`);
    logger.info(`### RESQUESTS WILL BREAK IN BLOCKS OF ${breakBlock} ###`);
    logger.info(`### RESQUESTS WILL BREAK TIME OF ${optionsRequets.reqPerMlSec} MILISECONDS ###`);

    for (let i = 1; i <= breakBlock; i++) {

        logger.info(`### REMAINING ITENS TO REQUEST: ${data.length}, BLOCK: ${i} ###`);

        const blockData = data.splice(0, optionsRequets.maxPerRequest);

        const promises = blockData.map((data, index) => {
            return new Promise((resolve, reject) => {

                return axios({ ...config, 'data': data })
                    .then(response => {
                        if (factories && factories.success && typeof factories.success === 'function')
                            return resolve(factories.success(response.data));

                        return resolve(response.data);
                    })
                    .catch(err => {

                        logger.error(`### ERROR REQUEST: index ${index} of block ${i} ###`);

                        if (factories && factories.error && typeof factories.error === 'function')
                            return reject(factories.error(err));

                        return reject(err);
                    });

            });
        });

        await Promise.all(promises)
            .then(results => result.hits = [...result.hits, ...results])
            .catch(err => result.errors = [...result.errors, err]);

        //DELAY
        await new Promise(resolve => setTimeout(resolve, optionsRequets.reqPerMlSec));
    }

    logger.info('### FINALIZED REQUESTS ###');

    return result;
};

module.exports.serializeParams = (params) => {
    return qs.stringify(params);
};