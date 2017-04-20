'use strict';

module.exports = {
    down: (queryInterface) => {
        // language=POSTGRES-PSQL
        return queryInterface.sequelize.query(`DROP FUNCTION register_dates_trigger_body()`);
    },
    up: (queryInterface) => {
        // language=POSTGRES-PSQL
        return queryInterface.sequelize.query(`
            CREATE FUNCTION register_dates_trigger_body() RETURNS trigger AS 
            $body$
            BEGIN
                IF (TG_OP = 'INSERT') THEN
                    NEW."createdAt" := current_timestamp;
                ELSIF (TG_OP = 'UPDATE') THEN
                    NEW."updatedAt" := current_timestamp;
                END IF;
                
                RETURN NEW;
            END;
            $body$ LANGUAGE plpgsql
        `);
    }
};
