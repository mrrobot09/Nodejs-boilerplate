let queries = {
    checkEmailCellPhone(type) {
        if (type === 'email') {
            return 'SELECT * FROM users WHERE email = :email'
        } else if (type === 'cell_phone') {
            return 'SELECT * FROM users WHERE phone = :phone'
        } else if (type === 'emailPhone') {
            return 'SELECT * FROM users where email = :email OR phone =:phone'
        }
    },

    signUp: function (type) {
        if (type === 'user') {
            return 'INSERT INTO users (name, username, email, phone, password, image, type, created_at, email_verified, cell_verified) VALUES' +
                ' (:name, :username, :email, :phone, :password, :image, :type, :createdAt, :email_verified, :cell_verified)'
        } else if (type === 'admin') {
            return 'INSERT INTO users (name, username, email, phone, password, image, type, created_at, email_verified, cell_verified) VALUES' +
                ' (:name, :username, :email, :phone, :password, :image, :type, :createdAt, :email_verified, :cell_verified)'
        }
    }
};

module.exports = queries;