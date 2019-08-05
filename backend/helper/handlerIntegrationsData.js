const fs = require('fs');
const logger = require('../engine/logger');
const PATH_DATA = `${process.cwd()}/app/scheduler/integrations.json`;


module.exports.getInfoData = (integrationName, field = '') => {
    try {
        let integrationData = {};

        if (fs.existsSync(PATH_DATA)) {
            const contentFile = fs.readFileSync(PATH_DATA, 'utf-8');
            integrationData = JSON.parse(contentFile);

            if (integrationData && integrationData[integrationName]) {
                // eslint-disable-next-line no-prototype-builtins
                if (field && integrationData[integrationName].hasOwnProperty(field))
                    return integrationData[integrationName][field];

                return integrationData[integrationName];
            }
        }

        return integrationData;

    } catch (err) {
        console.log(err);
        logger.error('### ERROR IN READ FILE INTEGRATIONS DATA');
    }
};

module.exports.setInfoData = (integrationName, content) => {
    try {
        let integrationData = {};

        if (!fs.existsSync(PATH_DATA))
            fs.writeFileSync(PATH_DATA, '{}');

        const contentFile = fs.readFileSync(PATH_DATA, 'utf-8');
        integrationData = JSON.parse(contentFile);


        if (!integrationData && !integrationData[integrationName])
            return logger.error('### ERROR IN SAVE DATA TO INTEGRATIONS DATA ###');

        fs.writeFileSync(PATH_DATA, JSON.stringify({
            ...integrationData,
            [integrationName]: {
                ...integrationData[integrationName],
                ...content
            }
        }, null, 4));

    } catch (err) {
        console.log(err);
        logger.error('### ERROR IN SAVE FILE INTEGRATIONS DATA');
    }
};