const db = require('../util/database');

/**
 * Class User
 * 
 *  - execute verwenden (Prepared Statements) um Sicherheit 
 *    zu verbessern
 *    http://stackoverflow.com/questions/8263371/how-can-prepared-statements-protect-from-sql-injection-attacks
 * 
 *  - Jeder SQL Befehl gibt ein Promise-Objekt zurück!
 * 
 * 
 */
module.exports = class User {
 
    constructor( id, firstName, lastName, email, password, community, admin ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.community = community;
        this.isadmin = admin;
    }

    save() {
        return db.execute(
            'INSERT INTO no_users (first_name, last_name, email, password, community, isadmin) VALUES (?, ?, ?, ?, ?, ?)',
            [this.firstName, this.lastName, this.email, this.password, this.community, this.isadmin]
        );
    }

    static getByEmail( email ) {
        return db.execute(
            'SELECT * FROM no_users WHERE email = ?',
            [email]
        );
    }

};