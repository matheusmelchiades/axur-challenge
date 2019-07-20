module.exports.createAContact = (contact) => {
    return {
        'properties': [
            {
                'property': 'firstname',
                'value': contact.first_name
            },
            {
                'property': 'lastname',
                'value': contact.last_name
            },
            {
                'property': 'email',
                'value': new Date().getTime().toString() + contact.email
            },
            {
                'property': 'gender',
                'value': contact.gender
            },
        ]
    };
};

module.exports.responseData = (data) => {
    return {
        'id': data.vid,
        'firstname': data.properties.firstname.value,
        'lastname': data.properties.lastname.value,
        'email': data.properties.email.value,
        'gender': data.properties.gender.value,
    };
};