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

            ]
        }
    }
};
