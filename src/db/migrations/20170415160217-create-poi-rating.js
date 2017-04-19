'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('poi_ratings', {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            poi_id: {
                allowNull: false,
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    key: 'id',
                    model: 'pois'
                },
                values: [0, 1, 2, 3, 4, 5],
                type: Sequelize.BIGINT,
                unique: 'uniquePOIRating'
            },
            rating: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            updatedAt: {
                type: Sequelize.DATE
            },
            user_id: {
                allowNull: false,
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    key: 'uid',
                    model: 'users'
                },
                type: Sequelize.STRING,
                unique: 'uniquePOIRating'
            }
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE TRIGGER insert_poi_ratings_trigger
                BEFORE INSERT ON poi_ratings
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE TRIGGER update_poi_ratings_trigger
                BEFORE INSERT ON poi_ratings
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    },
    down: (queryInterface, Sequelize) => {
        // language=POSTGRES-PSQL
        return queryInterface.sequelize.query(`DROP TRIGGER update_poi_ratings_trigger ON poi_ratings`).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`DROP TRIGGER insert_poi_ratings_trigger ON poi_ratings`);
        }).
        then(() => {
            return queryInterface.dropTable('poi_ratings');
        });
    }
};
