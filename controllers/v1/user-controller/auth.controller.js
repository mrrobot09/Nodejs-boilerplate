let jwt = require('jsonwebtoken');
let jwtToken = require('../../../config/env/development');

let config = require('../../../config/default/default');
let db = require('../../../config/connection');
let queries = require('../../../config/queries/quries');
let sequelize = require('sequelize');
let crypto = require('crypto');
let helperFunction = require('../../../helpers/commonFunctions');
let authService = require('../../../services/auth.service');
let moment = require('moment');

function signIn(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    let responseObject = {
        id: '',
        firstName: '',
        lastName: '',
        fullName: '',
        username: '',
        email: '',
        phone: '',
        token: '',
        image: '',
        birthDate: '',
        type: '',
        createdAt: '',
        email_verified: '',
        cell_verified: '',
    };

    if (username === undefined || username === '') {
        helperFunction.apiReponse({}, config.errors.insufficient_parameters, true, 200, res)
    } else {
        db.query(queries.singIn(), {
            replacements: {param: username},
            type: sequelize.QueryTypes.SELECT,
            logging: false,
        }).then( function (user) {
            if(user.length === 0) {
                helperFunction.apiReponse({}, config.errors.user_not_found, true, 200, res)
            } else {
                let hash = crypto.createHash('sha256').update(password).digest('base64');

                responseObject.id = user[0].id;
                responseObject.first_name = user[0].first_name;
                responseObject.last_name = user[0].last_name;
                responseObject.full_name = user[0].full_name;
                responseObject.username = user[0].username;
                responseObject.email = user[0].email;
                responseObject.phone = user[0].phone;
                responseObject.image = user[0].image;
                responseObject.birth_date = user[0].birth_date;
                responseObject.type = user[0].type;
                responseObject.createdAt = user[0].createdAt;
                responseObject.email_verified = user[0].email_verified;
                responseObject.cell_verified = user[0].cell_verified;

                if (responseObject.birthDate === null || responseObject.birthDate === 'null') {
                    responseObject.birthDate = '';
                }

                //set token for current User
                let token;
                token = jwt.sign({
                    id: responseObject.id,
                    email: responseObject.email
                }, jwtToken.JWT_SECRET);

                responseObject.token = token;

                if(user[0].password === null) {
                    helperFunction.apiReponse({}, config.errors.set_new_Password, true, 200, res)
                } else if(hash === user[0].password) {
                    helperFunction.apiReponse(responseObject, 'User logged in successfully', false, 200, res)
                } else {
                    helperFunction.apiReponse({}, config.errors.password_not_match, true, 200, res)
                }
            }
            return null;
        }).catch(function (err) {
            console.log(err)
            helperFunction.apiReponse({}, config.errors.db_error, true, 400, res)
        })
    }
}

function signUp(req, res, next) {
    let created = moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString();
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let fullName = firstName + " " + lastName;
    let username = req.body.username;
    let email = req.body.email;
    let phone = req.body.phone;
    let password = req.body.password;
    let image = req.files.image;
    let birthDate = req.body.birthDate;
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
                db.query(queries.checkEmailCellPhone('emailOrPhone'), {
                    replacements: {
                        email: email,
                        phone: phone
                    },
                    type: sequelize.QueryTypes.SELECT,
                    logging: false
                }).then(function (user) {
                    if (user.length === 0) {
                        authService.registerUser(firstName, lastName, fullName, username, email, phone, hashPassword, image, birthDate, type, createdAt, res);
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

module.exports = {
    signIn,
    signUp
};