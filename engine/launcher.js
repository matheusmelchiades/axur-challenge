const Hapi = require('hapi');
const config = require('../config/ecosystem.config');
const loadPlugins = require('./loadPluggins');
const logger = require('./logger');


const createInstanceServer = () => {

    return new Hapi.server({
        'host': config.server.host,
        'port': config.server.port,
        'routes': {
            'cors': {
                'origin': ['*']
            }
        }
    });
};

module.exports.start = async () => {

    try {

        logger.info('Start a server');

        let server = createInstanceServer();

        await loadPlugins(server);

        logger.loggerRoutes(server);

        await server.start();

        logger.info(`Server running at: ${server.info.uri}`);

    } catch (err) {
        logger.error(`Error in start server: ${err.message}`);
    }

};