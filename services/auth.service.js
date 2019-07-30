let config = require('../config/default/default');
let db = require('../config/connection');
let queries = require('../config/queries/quries');
let sequelize = require('sequelize');
let helperFunction = require('../helpers/commonFunctions');

let authServiceMethods = {
    registerUser(firstName, lastName, fullName, username, email, phone, hashPassword, image, birthDate, type, createdAt, res) {
        let responseObject = {
            id: '',
            firstName: firstName,
            lastName: lastName,
            fullName: fullName,
            username: username,
            email: email,
            phone: phone,
            image: image.name,
            birthDate: birthDate,
            type: type,
            createdAt: createdAt,
            email_verified: '0',
            cell_verified: '1',
        };
        db.query(queries.signUp('user'), {
            replacements: {
                firstName: firstName,
                lastName: lastName,
                fullName: fullName,
                username: username,
                email: email,
                phone: phone,
                password: hashPassword,
                image: image.name,
                birthDate: birthDate,
                type: type,
                createdAt: createdAt,
                email_verified: '0',
                cell_verified: '1',
            },
            type: sequelize.QueryTypes.INSERT,
            logging: false
        }).then(function (userData) {
            if (userData) {
                helperFunction.apiReponse(responseObject, config.success.user_registration, false, 200, res)
            } else {
                helperFunction.apiReponse({}, config.errors.user_already_exists, false, 200, res)
            }
        }).catch(function (err) {
            console.log(err);
            helperFunction.apiReponse({}, config.errors.db_error, true, 400, res)
        })
    }
};

module.exports = authServiceMethods;