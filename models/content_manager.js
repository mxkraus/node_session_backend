const db = require('../util/database');

/**
 * Class ContentManager
 * 
 *  - kümmert sich um das Daten-Handling
 * 
 * 
 */

module.exports = class ContentManager {

    static saveContent( id, communityName, description ) {
        return db.execute(
            'INSERT INTO no_content (community, description) VALUES (?, ?)',
            [communityName, description]
        );
    }

    static getContent( communityName ) {
        return db.execute(
            'SELECT * FROM no_content WHERE community = ?', 
            [communityName]
        );
    }

    static updateContent( communityName, description ) {
        return db.execute(
            'UPDATE no_content SET description = ? WHERE community = ?',
            [description, communityName]
        )
    }

}