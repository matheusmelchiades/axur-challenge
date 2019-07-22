module.exports = {
    'server': {
        'host': 'localhost',
        'port': '5000',
    },
    'data': {
        'url': 'contatos.csv'
    },
    'integrations': {
        'hubspot': {
            'base_url': 'https://api.hubapi.com',
            'currentPath': '/contacts/v1',
            'apiKeyField': 'hapikey',
            'apiKeyValue': 'demo',
            'ratelimit': 100,
            'listName': `test.${new Date().getTime()}`
            // 'listName': `matheus.maciel.${new Date().getTime()}`
        }
    },
};