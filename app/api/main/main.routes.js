const routes = [
    {
        'method': 'GET',
        'path': '/',
        'handler': async () => {
            return {
                'server': 'RUNNING',
            };
        }
    }
];


exports.routes = server => { return server.route(routes); };