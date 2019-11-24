const db = require('../util/database');

/**
 * Class Community
 * 
 *  - execute verwenden (Prepared Statements) um Sicherheit 
 *    zu verbessern
 *    http://stackoverflow.com/questions/8263371/how-can-prepared-statements-protect-from-sql-injection-attacks
 * 
 *  - Jeder SQL Befehl gibt ein Promise-Objekt zurück!
 * 
 * 
 */
module.exports = class Community {
 
    constructor( id, name ) {
        this.id = id;
        this.name = name;
    }

    save() {
        return db.execute(
            'INSERT INTO no_communities (name) VALUES (?)',
            [this.name]
        );
    }

    update() {
        return db.execute(
            'UPDATE no_communities SET name = ? WHERE id = ?',
            [this.name, this.id]
        );
    }

    static saveMultiple( newElements ) {

        return Community.getAll()
            .then( ([existing, meta]) => {
                return existing; // => turns into existingElements
            })
            .then( existingElements => {
                
                for (let i = newElements.length - 1; i >= 0; --i) {
                    // suche index in bestehenden Elementen
                    let exIndex = existingElements.findIndex( e => e.name === newElements[i].verein );
                    if( exIndex != -1 ){
                        // suche Index in neuen Elementen und lösche - wird nicht gebraucht
                        let index = newElements.findIndex( n => n.verein === newElements[i].verein )
                        newElements.splice( index, 1 );
                    }
                }

                let query = 'INSERT INTO no_communities (name) ';
                let values = 'VALUES ';
                let suffix = '';

                console.log(newElements);

                for ( var i=0; i<newElements.length; i++){
                    suffix = i != (newElements.length - 1) ? ',' : ';';
                    values += '("' + newElements[i].verein + '")' + suffix;
                }
                if( values != '' ) {
                    query += values;        
                }

                console.log(query);
                
                if( newElements.length == 0) {
                    return new Promise((resolve, reject) => {
                        resolve('Alle Daten aktuell');
                    });
                }else{
                    return db.execute( query );
                }

            })
            .catch( err => console.log(err) );  

    }

    static getAll() {
        return db.execute(
            'SELECT * FROM no_communities' // returns a promise
        );
    }

    static getById( comId ) {
        return db.execute(
            'SELECT * FROM no_communities WHERE id = ?',
            [comId]
        );
    }

    static getByName( name ) {
        return db.execute(
            'SELECT * FROM no_communities WHERE name = ?',
            [name]
        );
    }

    static deleteById( comId ) {
        return db.execute(
            'DELETE FROM no_communities WHERE id = ?',
            [comId]
        );
    }

    // updateVisibility

};