'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('routes', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('routes', [
            {
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Um Roteiro através dos tempos',
                name: 'Edifício da Reitoria do Porto'
            },
            {
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'O Porto de VGM - reflexão sobre o poeta e a sua obra',
                name: 'O Porto de Vasco Graça Moura'
            },
            {
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Natureza em si',
                name: 'Universidade Fora de Portas: Jardins, História, Património'
            }
        ], {});
    }
};
