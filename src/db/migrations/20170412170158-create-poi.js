'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('pois', {
            address: {
                allowNull: false,
                type: Sequelize.STRING
            },
            description: {
                allowNull: false,
                type: Sequelize.STRING
            },
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            latitude: {
                allowNull: false,
                type: Sequelize.REAL
            },
            longitude: {
                allowNull: false,
                type: Sequelize.REAL
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            text: {
                allowNull: false,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }).
        then(() => {
            // language=POSTGRES-SQL
            return queryInterface.sequelize.query(`CREATE INDEX poi_latitude_longitude_index ON pois USING BTREE (latitude, longitude)`);
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE FUNCTION poi_description_trigger_body() RETURNS trigger AS
                        $body$
                        BEGIN
                            NEW.text := NEW.name || ' ' || NEW.description || ' ' || NEW.address;
                            RETURN NEW;
                        END;
                        $body$ LANGUAGE plpgsql`);
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE TRIGGER update_poi_text_trigger
                BEFORE UPDATE ON pois
                FOR EACH ROW
                WHEN (OLD.name != NEW.name OR OLD.description != NEW.description OR OLD.address != NEW.address)
                EXECUTE PROCEDURE poi_description_trigger_body()`);
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE TRIGGER insert_poi_text_trigger
                BEFORE INSERT ON pois
                FOR EACH ROW
                EXECUTE PROCEDURE poi_description_trigger_body()`);
        }).
        then(() => {
            // language=POSTGRES-SQL
            return queryInterface.sequelize.query(`CREATE INDEX poi_text_index ON pois USING GIN (to_tsvector('portuguese', text))`);
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeIndex('pois', 'poi_text_index').
        then(() => {
            return queryInterface.sequelize.query(`DROP TRIGGER insert_poi_text_trigger ON pois`);
        }).
        then(() => {
            return queryInterface.sequelize.query(`DROP TRIGGER update_poi_text_trigger ON pois`);
        }).
        then(() => {
            return queryInterface.sequelize.query(`DROP FUNCTION poi_description_trigger_body()`);
        }).
        then(() => {
            return queryInterface.removeIndex('pois', 'poi_latitude_longitude_index');
        }).
        then(() => {
            return queryInterface.dropTable('pois');
        });
    }
};
