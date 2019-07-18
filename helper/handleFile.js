const fs = require('fs');
const path = './assets/contatos.csv';

module.exports.readFile = () => {
    return fs.readFileSync(path, 'utf-8');
};
