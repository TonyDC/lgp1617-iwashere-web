'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`DROP FUNCTION register_dates_trigger_body()`);
    },
    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE FUNCTION register_dates_trigger_body() RETURNS trigger AS 
            $body$
            BEGIN
                IF (TG_OP = 'INSERT') THEN
                    NEW.created_at := current_timestamp;
                ELSIF (TG_OP = 'UPDATE') THEN
                    NEW.updated_at := current_timestamp;
                END IF;
                
                RETURN NEW;
            END;
            $body$ LANGUAGE plpgsql
        `);
    }
};
