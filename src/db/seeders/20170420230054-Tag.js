'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('tags', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('tags', [
            { name: 'uporto' },
            { name: 'arte' },
            { name: 'ciência' },
            { name: 'medicina' },
            { name: 'botânica' },
            { name: 'engenharia' },
            { name: 'pintura' },
            { name: 'escultura' },
            { name: 'literatura' },
            { name: 'terra' },
            { name: 'ar' },
            { name: 'fogo' },
            { name: 'água' },
            { name: 'arquitetura' },
            { name: 'gastronomia' },
            { name: 'douro' },
            { name: 'natureza' },
            { name: 'feup' },
            { name: 'faup' },
            { name: 'fbaup' },
            { name: 'fep' },
            { name: 'fmup' },
            { name: 'fcup' },
            { name: 'fcnaup' },
            { name: 'fdup' },
            { name: 'ffup' },
            { name: 'flup' },
            { name: 'fmdup' },
            { name: 'fpceup' },
            { name: 'icbas' }
        ], {});
    }
};
