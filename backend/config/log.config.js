const bunyan = require('bunyan'),
    LOG_FOLDER = './logs';

module.exports = {

    // logging settings
    'core_logging': {

        // destination folder
        'folder': `${LOG_FOLDER}`,

        // bunyan options
        'options': {

            // log reference
            'name': 'core',

            'serializers': bunyan.stdSerializers,

            // output streams
            'streams': [

                // console output
                {
                    'stream': process.stdout,
                    'level': 'debug'
                },
                {
                    'type': 'rotating-file',
                    'period': '1d',
                    'count': 365,
                    // 'path': `${LOG_FOLDER}/core.${process.pid}.log`,
                    'path': `${LOG_FOLDER}/core.log`,
                    'level': bunyan.DEBUG
                }
            ]
        }
    }
};
