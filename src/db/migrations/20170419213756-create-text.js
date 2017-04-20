'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('text', {
            content_id: {
                allowNull: false,
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    key: 'id',
                    model: 'contents'
                },
                type: Sequelize.BIGINT
            },
            body: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            },
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE TRIGGER timestamp_text_trigger
                BEFORE INSERT OR UPDATE ON text
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_text_trigger ON text`).
        then(() => {
            queryInterface.dropTable('text');
        });
    }
};
