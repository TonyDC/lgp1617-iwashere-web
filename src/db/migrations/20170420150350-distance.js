'use strict';

module.exports = {
    down: (queryInterface) => {
        // language=POSTGRES-PSQL
        return queryInterface.sequelize.query(`DROP FUNCTION get_distance_function(lat1 REAL, lng1 REAL, lat2 REAL, lng2 REAL)`);
    },

    up: (queryInterface) => {
        // Using the Spherical Law of Cosines
        // 6371000: Earth mean radius (in meters)

        // language=POSTGRES-PSQL
        return queryInterface.sequelize.query(`CREATE FUNCTION get_distance_function(lat1 REAL, lng1 REAL, lat2 REAL, lng2 REAL) 
            RETURNS DOUBLE PRECISION AS
                $body$
                BEGIN
                    RETURN (6371000 * acos(cos(radians(lat1)) * cos(radians(lat2)) * cos(radians(lng2) - radians(lng1)) + sin(radians(lat1)) * sin(radians(lat2))));
                END;
                $body$ LANGUAGE plpgsql`);
    }
};
