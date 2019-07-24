let queries = {
    checkEmailCellPhone(type) {
        if (type === 'email') {
            return 'SELECT * FROM users WHERE email = :email'
        } else if (type === 'cell_phone') {
            return 'SELECT * FROM users WHERE phone = :phone'
        } else if (type === 'emailOrPhone') {
            return 'SELECT * FROM users where email = :email OR phone =:phone'
        }
    },

    singIn() {
        return 'SELECT * FROM users WHERE (email = :param OR username = :param OR phone = :param)'
    },

    signUp(type) {
        if (type === 'user') {
            return 'INSERT INTO users (first_name, last_name, full_name, username, email, phone, password, image, birth_date, type, created_at, email_verified, cell_verified) VALUES' +
                ' (:firstName, :lastName, :fullName, :username, :email, :phone, :password, :image, :birthDate, :type, :createdAt, :email_verified, :cell_verified)'
        } else if (type === 'admin') {
            return 'INSERT INTO users (first_name, last_name, full_name, username, email, phone, password, image, birth_date, type, created_at, email_verified, cell_verified) VALUES' +
                ' (:firstName, :lastName, :fullName, :username, :email, :phone, :password, :image, :birthDate, :type, :createdAt, :email_verified, :cell_verified)'
        }
    }
};

module.exports = queries;