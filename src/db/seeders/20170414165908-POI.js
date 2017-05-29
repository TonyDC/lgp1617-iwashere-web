'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('pois', null, {});
    },
    up: (queryInterface) => {
        return queryInterface.bulkInsert('pois', [
            {
                address: 'R. Dr. Roberto Frias, 4200-464 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 2,
                description: 'A melhor faculdade de engenharia do país',
                latitude: 41.1785734,
                longitude: -8.598412,
                name: 'Faculdade de Engenharia da Universidade do Porto',
                poi_type_id: 1
            },
            {
                address: 'R. Nova da Alfândega, 4400 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 2,
                description: 'Espaço para eventos culturais',
                latitude: 41.143022,
                longitude: -8.621665,
                name: 'Alfândega do Porto',
                poi_type_id: 1
            },
            {
                address: 'Ponte Luís I, Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 2,
                description: 'Uma ponte com estilo bastante peculiar e interessante',
                latitude: 41.139925,
                longitude: -8.609411,
                name: 'Ponte Luís I, Porto',
                poi_type_id: 1
            }
        ], {});
    }
};
