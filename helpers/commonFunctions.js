let helperFunctions = {
    apiReponse(data, message, error, status, res,) {
        res.status(status).send({
            data: data,
            message: message,
            error: error
        });
    }
};

module.exports = helperFunctions;