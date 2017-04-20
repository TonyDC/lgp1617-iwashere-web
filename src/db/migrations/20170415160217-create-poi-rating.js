'use strict';

const ZERO_RATING = 0;
const ONE_RATING = 1;
const TWO_RATING = 2;
const THREE_RATING = 3;
const FOUR_RATING = 4;
const FIVE_RATING = 5;
const RATING_VALUES = [ZERO_RATING, ONE_RATING, TWO_RATING, THREE_RATING, FOUR_RATING, FIVE_RATING];

module.exports = {
    down: (queryInterface) => {
        // language=POSTGRES-PSQL
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_poi_ratings_trigger ON poi_ratings`).
        then(() => {
            return queryInterface.dropTable('poi_ratings');
        });
    },
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
                type: Sequelize.BIGINT,
                unique: 'uniquePOIRating'
            },
            rating: {
                allowNull: false,
                type: Sequelize.INTEGER,
                values: RATING_VALUES
            },
            updatedAt: { type: Sequelize.DATE },
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
                CREATE TRIGGER timestamp_poi_ratings_trigger
                BEFORE INSERT OR UPDATE ON poi_ratings
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    }
};
