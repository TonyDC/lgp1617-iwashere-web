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
                description: 'A melhor faculdade de engenharia do país',
                latitude: 41.1785734,
                longitude: -8.598412,
                name: 'Faculdade de Engenharia da Universidade do Porto',
                poi_type_id: 1
            },
            {
                address: 'R. Nova da Alfândega, 4400 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Espaço para eventos culturais',
                latitude: 41.143022,
                longitude: -8.621665,
                name: 'Alfândega do Porto',
                poi_type_id: 1
            },
            {
                address: 'Ponte Luís I, Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Uma ponte com estilo bastante peculiar e interessante',
                latitude: 41.139925,
                longitude: -8.609411,
                name: 'Ponte Luís I, Porto',
                poi_type_id: 1
            },
            {
                address: 'Rua Dr. Abel Salazar, s/n, 4465-012 S. Mamede de Infesta',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.200729780141224,
                longitude: -8.613021075725555,
                name: 'Casa Museu Abel Salazar',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'Dr. Augusto Nobre, Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.1635497,
                longitude: -8.6863686,
                name: 'Espaço Zoológico Marítimo',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'R. Dr. Plácido da Costa 91, 4200-450 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.178400,
                longitude: -8.600227,
                name: 'FADEUP',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'R. Jorge de Viterbo Ferreira 228, 4050-313 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.147587,
                longitude: -8.6243802,
                name: 'FFUP',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'Praça Marquês de Pombal, nº30-44, 4000-390 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.160725,
                longitude: -8.604092,
                name: 'Fundação Instituto Arquitecto José Marques da Silva',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'Alameda Prof. Hernâni Monteiro, 4200-319 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.181159,
                longitude: -8.601503,
                name: 'FMUP',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'R. Jorge de Viterbo Ferreira 228, 4050-343 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.1471952,
                longitude: -8.6245894,
                name: 'ICBAS',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'Rua do Campo Alegre 1191, 4150-173 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.153904,
                longitude: -8.642406,
                name: 'Jardim Botânico',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'Praça de Gomes Teixeira, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146552,
                longitude: -8.615617,
                name: 'Reitoria',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'Praça de Gomes Teixeira, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146810,
                longitude: -8.615904,
                name: 'MHNCUP',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'Av. de Rodrigues de Freitas 265, 4049-021 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145629,
                longitude: -8.600817,
                name: 'FBAUP',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'Praça de Gomes Teixeira 10, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.147077,
                longitude: -8.615628,
                name: 'Praça Gomes Teixeira - Praça dos Leões',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'Praça de Gomes Teixeira 10, 4050-011 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.1473441,
                longitude: -8.6185373,
                name: 'Igreja da Venerável Ordem Terceira de Nossa Senhora do Carmo - Igreja do Carmo',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'Praça de Parada Leitão 45, 4050-011 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146921,
                longitude: -8.61483,
                name: 'Café Âncora D\'Ouro - Café Piolho',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'Largo Prof. Abel Salazar 4099-001 PORTO',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146995,
                longitude: -8.618565,
                name: 'Hospital de Santo António',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'R. Campo dos Mártires da Pátria 4099, 4050-076 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145227,
                longitude: -8.617723,
                name: 'Palácio da Justiça - Tribunal da Relação do Porto',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'Jardim João Chagas - Jardim da Cordoaria, 4050-366 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145773,
                longitude: -8.616704,
                name: 'Jardim João Chagas - Jardim da Cordoaria',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'Largo Amor de Perdição, 4050-008 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.144772,
                longitude: -8.615884,
                name: 'Antiga Cadeia da Relação - Centro Português de Fotografia',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'R. de São Filipe de Nery, 4050-546 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145807,
                longitude: -8.613981,
                name: 'Igreja e Torre dos Clérigos',
                poi_type_id: 1
                // context_id: 1
            },
            {
                address: 'Rua das Carmelitas, nº151, 4050-162 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145807,
                longitude: -8.613981,
                name: 'Praça de Lisboa - Passeio dos Clérigos',
                poi_type_id: 1
                // context_id: 1
            }
        ], {});
    }
};
