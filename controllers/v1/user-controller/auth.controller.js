let config = require('../../../config/default/default');
let db = require('../../../config/connection');
let queries = require('../../../config/queries/quries');
let sequelize = require('sequelize');
let crypto = require('crypto');

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
            return res.status(200).send({
                message: config.errors.empty_parameter,
                error: true
            });
        } else {
            if (!image) {
                return res.status(200).send({
                    message: 'no image',
                    error: true
                });
            } else if(image.mimetype === "image/jpeg" ||image.mimetype === "image/png"||image.mimetype === "image/gif" ) {

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
                        return res.status(200).send({
                            data: {},
                            message: config.errors.user_already_exists,
                            error: true
                        })
                    }

                }).catch(function (err) {
                    return res.status(200).send({
                        message: config.errors.db_error,
                        error: true,
                        err: err
                    })
                })
            }
        }

    } else {
        return res.status(400).send({
            message: config.errors.insufficient_parameters,
            error: true
        });
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
            return res.status(200).send({
                data: responseObject,
                message: config.success.user_registration,
                error: false
            })
        } else {
            return res.status(200).send({
                data: {},
                message: config.errors.user_already_exists,
                error: false
            })
        }
    }).catch(function (err) {
        return res.status(400).send({
            message: config.errors.db_error,
            error: true
        });
    })
}

module.exports = {
    signUp
};