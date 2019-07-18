const handleFile = require('../../helper/handleFile')

const routes = [
    {
        'method': 'GET',
        'path': '/',
        'handler': () => {

            return handleFile.readFile().replace('\n', '<br>');
            // return {
            //     'server': 'RUNNING',
            // };
        }
    }
];


exports.routes = server => { return server.route(routes); };