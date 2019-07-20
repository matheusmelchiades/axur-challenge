const fs = require('fs');
const logger = require('./logger');
const PATH = `${process.cwd()}/app/scheduler`;

module.exports.load = async () => {
    logger.info('### START SCHEDULES ###');

    if (!fs.existsSync(PATH))
        return logger.info('### NOT HAVE SCHEDULER ###');


    const files = fs.readdirSync(PATH);

    if (!files.length)
        return logger.info('### NOT HAVE SCHEDULES ###');

    files.map(file => {
        const { run } = require(`${PATH}/${file}`);

        if (!run) return;

        logger.info(`### ${file.split('.')[0].toUpperCase()} STARTING ###`);

        run();
    });
};

