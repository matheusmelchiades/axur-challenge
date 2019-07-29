const handler = require('./contacts.controller');

const routes = [
    {
        'method': 'GET',
        'path': '/contacts',
        'handler': handler.getContacts
    },
    {
        'method': 'GET',
        'path': '/contacts/domains',
        'handler': handler.getDomains
    }
];


exports.routes = server => { return server.route(routes); };