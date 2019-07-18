const fs = require('fs');
const bunyan = require('bunyan');
const config = require('../config/log.config');
const chalk = require('chalk');

let rotatingLogger = null;

const logger = () => {

    // create log folder
    if (!fs.existsSync(config.core_logging.folder))
        fs.mkdirSync(config.core_logging.folder);

    if (!rotatingLogger)
        rotatingLogger = bunyan.createLogger(config.core_logging.options);

    rotatingLogger.loggerRoutes = loggerRoutes;

    return rotatingLogger;

};

const loggerRoutes = (server) => {

    const routes = server.table();

    routes.map(route => {
        server.log(['startup', 'route-load'], chalk.green(route.method) + ' ' + route.path);
    });
};

module.exports = logger();