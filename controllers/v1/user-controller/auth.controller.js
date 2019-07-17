let config = require('../../../config/default/default');
let db = require('../../../config/connection');
let queries = require('../../../config/queries/quries');
let sequelize = require('sequelize');
let crypto = require('crypto');
let helperFunction = require('../../../helpers/commonFunctions')

function signUp(req, res, next) {
    let created = new Date();
    let name = req.body.name;
    let username = req.body.username;
    let email = req.body.email;
    let phone = req.body.phone;
    let password = req.body.password;
    let image = req.files.image;
    let type = req.body.type;
    let createdAt = created;
    let hashPassword = crypto.createHash('sha256').update(password).digest('base64'); //password encrypted

    if (email !== undefined && password !== undefined && username !== undefined && type !== undefined) {
        if (email === '' || password === '' || username === '' || type === '') {
            helperFunction.apiReponse({}, config.errors.empty_parameter, true, 200, res)
        } else {
            if (!image) {
                helperFunction.apiReponse({}, 'No image', true, 200, res)
            } else if (image.mimetype === "image/jpeg" || image.mimetype === "image/png" || image.mimetype === "image/gif") {

                //check if thee user already exists
                db.query(queries.checkEmailCellPhone('emailPhone'), {
                    replacements: {
                        email: email,
                        phone: phone
                    },
                    type: sequelize.QueryTypes.SELECT,
                    logging: false
                }).then(function (user) {
                    if (user.length === 0) {
                        signUpUser(name, username, email, phone, hashPassword, image, type, createdAt, res);
                    } else {
                        helperFunction.apiReponse({}, config.errors.user_already_exists, true, 200, res)
                    }

                }).catch(function (err) {
                    helperFunction.apiReponse({}, config.errors.db_error, true, 200, res)
                })
            }
        }

    } else {
        helperFunction.apiReponse({}, config.errors.insufficient_parameters, true, 400, res)
    }
}

function signUpUser(name, username, email, phone, hashPassword, image, type, createdAt, res) {
    let responseObject = {
        id: '',
        name: name,
        username: username,
        email: email,
        phone: phone,
        password: hashPassword,
        image: image.name,
        type: type,
        createdAt: createdAt,
        email_verified: '0',
        cell_verified: '1',
    };
    db.query(queries.signUp('user'), {
        replacements: {
            name: name,
            username: username,
            email: email,
            phone: phone,
            password: hashPassword,
            image: image.name,
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
        helperFunction.apiReponse({}, config.errors.db_error, true, 400, res)
    })
}

module.exports = {
    signUp
};