const PATH_DATA = 'assets/contatos.csv';
const handler = require('./contacts.dao');
const factory = require('./contacts.factory');
const helper = require('../../../helper/handleFileCsv');

(module.exports.restoreData = () => {
    const dataFile = helper.convertCsvToJson(PATH_DATA);
    const contacts = dataFile.map(contact => factory.createAContact(contact));

    const promises = contacts.map(contact => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return handler.createAContact(contact)
                    .then(result => resolve(result))
                    .catch(err => console.log('ERROR', err.message));
            }, 1800);
        });
    });

    console.log('OLD', contacts.length)
    Promise.all(promises)
        .then(r => console.log(r.length))
        .catch(err => console.log(err))
})();