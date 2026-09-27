class User {
    static ROLES = {
        ADMIN: 'admin',
        MANAGER: 'manager',
        CUSTOMER: 'customer'
    };

    constructor(id, fullName, email, password, role = User.ROLES.CUSTOMER, phone = '') {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.phone = phone;
        this.createdAt = new Date().toISOString();
    }
}

module.exports = User;