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
                'value': new Date().getTime().toString().slice(0, 2) + contact.email
            },
            {
                'property': 'gender',
                'value': contact.gender
            },
        ]
    };
};

module.exports.responseListContactData = (data) => {
    return {
        'id': data.listId,
        'name': data.name,
        'createdAt': data.createdAt
    };
};

module.exports.responseContactData = (data) => {
    return {
        'id': data.vid,
        'firstname': data.properties.firstname.value,
        'lastname': data.properties.lastname.value,
        'email': data.properties.email.value,
        'gender': data.properties.gender.value,
    };
};

module.exports.responseErrorData = (err = {}) => {
    return {
        'status': err.response && err.response.status ? err.response.status : null,
        'error': err.response.data && err.response.data.error ? err.response.data.error : 'ERROR',
        'message': err.response.data && err.response.data.message ? err.response.data.message : 'Error in response',
        'errorData': err.config && err.config.data ? err.config.data : {}
    };
};

module.exports.getDomainByEmail = (contact) => {
    return {
        'domain': contact.email.split('@').slice(1)[0] || ''
    };
};