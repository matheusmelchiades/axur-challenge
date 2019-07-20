const routes = [
    {
        'method': 'GET',
        'path': '/contacts',
        'handler': async () => {
            return {
                'server': 'RUNNING',
            };
        }
    }
];


exports.routes = server => { return server.route(routes); };