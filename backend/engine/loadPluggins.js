const good = require('good');
const hapiRoutes = require('hapi-routes');
const logSqueezeArgs = [{
    'log': '*',
    'response': '*',
    'request': '*',
    'request-internal': '*'
}];


const getPlugins = () => {
    let plugins = [];

    // ROUTES
    plugins.push({
        'plugin': hapiRoutes,
        'options': {
            'dir': `${__dirname}/../app/api/**/**.routes.js`,
        },
    });

    plugins.push({
        'plugin': good,
        'options': {
            'reporters': {
                'console': [
                    {
                        'module': 'good-squeeze',
                        'name': 'Squeeze',
                        'args': logSqueezeArgs,
                    }, {
                        'module': 'good-console',
                        'args': [
                            {
                                'format': 'HH:mm:ss DD.MM.YYYY'
                            }
                        ]
                    },
                    'stdout'
                ],
                'file': [
                    {
                        'module': 'good-squeeze',
                        'name': 'Squeeze',
                        'args': logSqueezeArgs
                    }, {
                        'module': 'good-squeeze',
                        'name': 'SafeJson'
                    }, {
                        'module': 'rotating-file-stream',
                        'args': [
                            'http-logs',
                            {
                                'interval': '1d',
                                'compress': true,
                                'path': './logs'
                            }
                        ]
                    }
                ]
            }
        }
    });

    return plugins;
};


module.exports = (server) => {
    const AllPlugins = getPlugins();

    let promises = AllPlugins.map(plugin => server.register(plugin));

    return Promise.all(promises);
};