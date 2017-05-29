'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('pois', null, {});
    },
    up: (queryInterface) => {
        return queryInterface.bulkInsert('pois', [
            {
                // 1
                address: 'Av. de Rodrigues de Freitas, Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145779,
                longitude: -8.601001,
                name: 'Av. de Rodrigues de Freitas',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'Av. Francisco Xavier Esteves, 4300 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.154933,
                longitude: -8.565621,
                name: 'Av. Francisco Xavier Esteves',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'Praça de Gomes Teixeira, 4050 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.147268,
                longitude: -8.61584,
                name: 'Praça de Gomes Teixeira',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'Praça de Parada Leitão, 4050-064 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.147028,
                longitude: -8.616183,
                name: 'Praça de Parada Leitão',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'Praça Manuel Teixeira Gomes, 4460 Custóias, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.200853,
                longitude: -8.642952,
                name: 'Praça Manuel Teixeira Gomes',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. Bento Carqueja, 4350 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.160529,
                longitude: -8.590267,
                name: 'R. Bento Carqueja',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. António Arroio, 4150 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.159213,
                longitude: -8.651258,
                name: 'R. António Arroio',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. De Azevedo De Albuquerque, 4050 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145378,
                longitude: -8.618425,
                name: 'R. De Azevedo De Albuquerque',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. de Gonçalo Sampaio, Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.154539,
                longitude: -8.631140,
                name: 'R. de Gonçalo Sampaio, Porto, Portugal',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. de Luís Woodhouse, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.169777,
                longitude: -8.593635,
                name: 'R. de Luís Woodhouse',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. de Ricardo Severo, 4050 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.156591,
                longitude: -8.625074,
                name: 'R. de Ricardo Severo',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. de Sampaio Bruno, 4000 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146867,
                longitude: -8.610808,
                name: 'R. de Sampaio Bruno',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. Dr. Adriano de Paiva, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.165732,
                longitude: -8.608375,
                name: 'R. Dr. Adriano de Paiva',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. do Conde de Campo Bello, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.174296,
                longitude: -8.608704,
                name: 'R. do Conde de Campo Bello',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'Rua do Dr. Ferreira da Silva, 4050 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145638,
                longitude: -8.615452,
                name: 'Rua do Dr. Ferreira da Silva',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. Eng. Ezequiel de Campos, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.172424,
                longitude: -8.651922,
                name: 'R. Eng. Ezequiel de Campos',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. Gustavo de Sousa, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.165527,
                longitude: -8.669287,
                name: 'R. Gustavo de Sousa',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. Leonardo Coimbra, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.174405,
                longitude: -8.609082,
                name: 'R. Leonardo Coimbra',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. Prof. Augusto Nobre, Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.160027,
                longitude: -8.653772,
                name: 'R. Prof. Augusto Nobre',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. Prof. Duarte Leite, 4350 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.176621,
                longitude: -8.584076,
                name: 'R. Prof. Duarte Leite',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. Prof. Mendes Correia, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.170551,
                longitude: -8.595635,
                name: 'R. Prof. Mendes Correia',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. Raúl Brandão, 4150-570 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.148356,
                longitude: -8.668462,
                name: 'R. Raúl Brandão',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. Rocha Peixoto, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.167018,
                longitude: -8.656712,
                name: 'R. Rocha Peixoto',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 1
                address: 'R. Vitorino Damásio, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.169864,
                longitude: -8.593792,
                name: 'R. Vitorino Damásio',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // feup lugares
                address: 'R. Dr. Roberto Frias, 4200-464 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'A melhor faculdade de engenharia do país',
                latitude: 41.177929,
                longitude: -8.597834,
                name: 'Faculdade de Engenharia da Universidade do Porto',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 2
                address: 'R. Nova da Alfândega, 4400 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Espaço para eventos culturais',
                latitude: 41.143022,
                longitude: -8.621665,
                name: 'Alfândega do Porto',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 3
                address: 'Ponte Luís I, Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Uma ponte com estilo bastante peculiar e interessante',
                latitude: 41.139925,
                longitude: -8.609411,
                name: 'Ponte Luís I, Porto',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 4
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
                // 5
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
                // 6
                address: 'R. Dr. Plácido da Costa 91, 4200-450 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.178544,
                longitude: -8.600238,
                name: 'FADEUP',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 7
                address: 'Rua do Campo Alegre 1021/1055, 4169-007 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.151825,
                longitude: -8.636602,
                name: 'FCUP',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 8
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
                // 9
                address: '4050-039 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.155263,
                longitude: -8.620654,
                name: 'Museu da Faculdade de Farmácia do Porto',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 10
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
                // 11
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
                // 12
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
                // 13
                address: 'Rua do Campo Alegre 1191, 4150-173 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.153650,
                longitude: -8.6422468,
                name: 'Jardim Botânico do Porto',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 14
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
                // 15
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
                // 16
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
                // 17
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
                // 18
                address: 'Praça de Gomes Teixeira 10, 4050-011 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.147296,
                longitude: -8.616321,
                name: 'Igreja da Venerável Ordem Terceira de Nossa Senhora do Carmo - Igreja do Carmo',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 19
                address: 'Praça de Parada Leitão 45, 4050-011 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146902,
                longitude: -8.616401,
                name: 'Café Âncora D\'Ouro - Café Piolho',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 20
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
                // 21
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
                // 22
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
                // 23
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
                // 24
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
                // 25
                address: 'Rua das Carmelitas, nº151, 4050-162 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146253,
                longitude: -8.614867,
                name: 'Praça de Lisboa - Passeio dos Clérigos',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 26
                address: 'R. das Carmelitas 144, 4050-161 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146835,
                longitude: -8.614853,
                name: 'Livraria Chardron - Livraria Lello & Irmão',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 27
                address: 'Foz do Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146642,
                longitude: -8.658198,
                name: 'Foz',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 28
                address: 'Porto Ribeira',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.140615,
                longitude: -8.613095,
                name: 'Porto Ribeira',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 29
                address: 'Largo de Aviz - Santa Marinha, Vila Nova de Gaia, Norte, 4430-329, 4430-329',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.138249,
                longitude: -8.607804,
                name: 'Serra do Pilar',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 30
                address: 'Passeio de São Lázaro 33, 4000-098 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145936,
                longitude: -8.602697,
                name: 'Jardim de São Lázaro',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 31
                address: 'R. do Passeio Alegre 828, 4150-570 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.148633,
                longitude: -8.670534,
                name: 'Passeio Alegre/ Foz Velha',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 32
                address: 'Av. de Rodrigues de Freitas 265, 4049-021 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145295,
                longitude: -8.600536,
                name: 'Jardim da Faculdade de Belas Artes da Universidade do Porto',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 33
                address: 'Rua das Estrelas, Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.149948,
                longitude: -8.641652,
                name: 'Jardim do Clube Universitário do Porto',
                poi_type_id: 1
                // context_id: 1
            },
            {
                // 34
                address: 'Largo da Ponte D. Luiz, 4400-111 Vila Nova de Gaia',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.139004,
                longitude: -8.609186,
                name: 'Jardim da Casa Burmester',
                poi_type_id: 1
                // context_id: 1
            },

            {
                // 35
                address: 'Rua Dr. Abel Salazar, s/n, 4465-012 S. Mamede de Infesta',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.200728,
                longitude: -8.613088,
                name: 'Poente na Serra – Gondar – Minho”, Óleo s/ Madeira 23x35 cm',
                parent_id: 4,
                poi_type_id: 2
                // context_id: 1
            },
            {
                //  36
                address: 'Rua Dr. Abel Salazar, s/n, 4465-012 S. Mamede de Infesta',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.200648,
                longitude: -8.613094,
                name: '“Perspetiva de cinema” , Tinta da china s/ papel 22x33 cm',
                parent_id: 4,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 37
                address: 'Rua Dr. Abel Salazar, s/n, 4465-012 S. Mamede de Infesta',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.200631,
                longitude: -8.612973,
                name: 'Preparação histológica – Ovário de coelha',
                parent_id: 4,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 38
                address: 'R. Dr. Plácido da Costa 91, 4200-450 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Modalidade: Atletismo (Lançamentos). Data: início da década de 70. Material: madeira e metal. Dimensão: 18 cm. Peso: 1 kg. Clube Escola do Movimento.',
                latitude: 41.178112,
                longitude: -8.601523,
                name: 'Disco',
                parent_id: 6,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 39
                address: 'R. Dr. Plácido da Costa 91, 4200-450 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Modalidade: Ginástica. Data: década de 50/70. Material: madeira, pele e metal. Dimensão: 50 x 49 x24 cm. Utilizada para ser adaptada na trave sueca. Gabinete de Ginástica da FASEUP.',
                latitude: 41.177783,
                longitude: -8.600057,
                name: 'Sela',
                parent_id: 6,
                poi_type_id: 2
                // context_id: 1
            },
            {
                //  40
                address: 'R. Dr. Roberto Frias, 4200-464 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.178069,
                longitude: -8.597379,
                name: 'Círculo de reflexão (sistema Borda). Troughton & Simms',
                parent_id: 1,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 41
                address: 'R. Dr. Roberto Frias, 4200-464 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.177984,
                longitude: -8.596955,
                name: 'Modelo didático de maquina a vapor de James Watt, J. Schr der',
                parent_id: 1,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 42
                address: 'R. Dr. Roberto Frias, 4200-464 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.177874,
                longitude: -8.596057,
                name: 'Modelo de primeira solução para nova ponte ferroviária utilizando o cimbre da Ponte da Arrábida. Edgar Cardoso',
                parent_id: 1,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 43
                address: '4050-039 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.155019,
                longitude: -8.620654,
                name: 'A máquina de comprimidos',
                parent_id: 9,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 44
                address: '4050-039 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.155125,
                longitude: -8.620399,
                name: 'Pipeta',
                parent_id: 9,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 45
                address: '4050-039 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.155150,
                longitude: -8.620736,
                name: 'Moinho',
                parent_id: 9,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 46
                address: 'Praça Marquês de Pombal, nº30-44, 4000-390 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'O arquiteto surge representado de perfil, pose também associada ao referencial clássico.  Observa-se um registo rápido, com liberdade de expressão e abertura para uma forma de retratar mais expressionista. A escolha de linhas diluídas não permite identificar a natureza da indumentária, ocultando qualquer referência a vestuário ou elemento que estabeleça relação com um tempo específico. Os movimentos das pinceladas são mais notórios na zona dos olhos, da barba e das orelhas.',
                latitude: 41.160832,
                longitude: -8.604090,
                name: 'Retrato Marques da Silva - Veloso Salgado, Óleo s/ Tela, 61 x 50 cm, 1890',
                parent_id: 10,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 47
                address: 'Praça Marquês de Pombal, nº30-44, 4000-390 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'A maquete, embora uma versão simplificada do monumento, permite compreender uma composição tripartida que revive a Guerra Peninsular (Invasões Francesas). Os grupos escultóricos distribuídos pela base representam cenas de artilharia enaltecendo a importante participação do povo e o desastre da ponte das Barcas, sendo constante a presença do elemento feminino. No remate, a representação do desfecho da luta, com a vitória da força popular, representada pelo leão, sobre a  águia napoleónica.',
                latitude: 41.160673,
                longitude: -8.603899,
                name: 'Povo e Tropa” - Maquete para o Monumento aos Heróis da Guerra Peninsular, Barata Feyo (Atr.) [1947]',
                parent_id: 10,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 48
                address: 'Praça Marquês de Pombal, nº30-44, 4000-390 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Da maqueta, apenas a base pertence ao original. A Casa sobre o mar materializa uma reflexão sobre o Regionalismo Crítico, procurando integrar a arquitectura moderna nas paisagens existentes através da tradição dos materiais. Propondo como localização a Foz do Douro, Távora reflete sobre a aplicação do estilo internacional, adaptando-o. Descreve então uma habitação rodeada por um friso de azulejos, sustentada por uma estrutura de betão cravada no terreno rochoso e avançada em consola sobre o mar.',
                latitude: 41.160750,
                longitude: -8.604007,
                name: 'Maquete da Casa Sobre o Mar - Fernando Távora. Projeto para obtenção C.O.D.A., 41x 66x42 cm, [1952]',
                parent_id: 10,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 49
                address: 'Alameda Prof. Hernâni Monteiro, 4200-319 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Ao todo no Museu Maximiano existem 10 quadros deste género, todos da autoria de Enrique Zofio, alusivos às várias fases da gravidez. As esculturas são ao mesmo tempo fonte de conhecimento sobre uma prática obstétrica, manual além de instrumental bem como estemunho da evolução formal do fórceps. A que vemos na fotografia representa a fase final do parto e simula situações reais de gestação e parto.',
                latitude: 41.180731,
                longitude: -8.602471,
                name: 'Mulher grávida e instrumento médico. Peça de Enrique Zófio',
                parent_id: 11,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 50
                address: 'Alameda Prof. Hernâni Monteiro, 4200-319 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'A fotografia apresenta um estojo de amputação do século XVIII forrado a pele de peixe e flanela vermelha, composto com os instrumentos necessários ao exercício da amputação em aço com cabo de madeira. Acredita-se que o estojo que pertencera ao cirurgião José Marcelino Peres Pinto tenha uma origem Ibérica, embora, não haja nenhuma marca que remeta para um fabricante e consequentemente para uma localização geográfica. O Estojo vazio demonstra que havia um conhecimento por parte do artesão que o confecionava, sobre os instrumentos usados durante a cirurgia, uma vez que o estojo assume a forma dos mesmos de modo a melhor acomodá-los. Os materiais orgânicos dos quais alguns instrumentos eram feitos e a ausência da esterilização dos mesmo após as cirurgias (numa época anterior à descoberta do micróbio) contribuíram para a deterioração dos instrumentos o que levou a que algumas peçasse perdessem para sempre.',
                latitude: 41.180417,
                longitude: -8.601233,
                name: 'Estojo instrumentos médicos',
                parent_id: 11,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 51
                address: 'Alameda Prof. Hernâni Monteiro, 4200-319 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Este busto representa uma lesão dermatológica primária: dermite purpúrica em evolução hemosidérica. Pertenceu ao antigo Museu de Anatomia Patológica, tendo sido uma oferta feita ao Museu pelo Professor Daniel Serrão em 1971. Modelos de cera anatómicos foram introduzidos em Florença, no século XVI e no século XVII eram preferidos ao desenho anatómico enquanto modelos em três dimensões destinados ao treino de estudantes de medicina, na impossibilidade do contacto físico com um paciente portador da patologia.',
                latitude: 41.181179,
                longitude: -8.600084,
                name: 'Rosto em cera',
                parent_id: 11,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 52
                address: 'R. Jorge de Viterbo Ferreira 228, 4050-343 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146956,
                longitude: -8.624293,
                name: 'Peça anatómica',
                parent_id: 12,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 53
                address: 'Praça de Gomes Teixeira, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146777,
                longitude: -8.615948,
                name: 'Peça da coleção  egípcia',
                parent_id: 15,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 54
                address: 'Praça de Gomes Teixeira, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146810,
                longitude: -8.615608,
                name: 'Antílope bebé empalhado',
                parent_id: 15,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 55
                address: 'Praça de Gomes Teixeira, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146575,
                longitude: -8.615974,
                name: 'Quercus',
                parent_id: 15,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 56
                address: 'Praça de Gomes Teixeira, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146697,
                longitude: -8.615836,
                name: 'Fonógrafo de Edison',
                parent_id: 15,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 57
                address: 'Praça de Gomes Teixeira, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146790,
                longitude: -8.615382,
                name: 'Galvanómetro diferencial de Wiedemann',
                parent_id: 15,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 58
                address: 'Praça de Gomes Teixeira, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146575,
                longitude: -8.615406,
                name: 'Espectrofotómetro de Glan',
                parent_id: 15,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 59
                address: 'Av. de Rodrigues de Freitas 265, 4049-021 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Duas faces da ‘Base dos doze deuses’ no Museu do Louvre. Dois frisos de figuras: 3 jovens que dançam no registo inferior, e 3 mulheres empunhando armas e uma lira, junto a 1 personagem masculina coberta com 1 manto, no registo superior (reto) e 2 frisos de figuras: 3 raparigas que dançam, no registo inferior, e 2 casais, com uma esfinge em voo, no registo superior (verso) pedra negra, pena e tinta castanha, furos [picotado] nos contornos das figuras do registo inferior (verso) marca de agua com uma besta dentro de um circulo, cantos cortados. 417x286mm. Mecenato Unicer',
                latitude: 41.145589,
                longitude: -8.600899,
                name: 'Escola romana, S c. XVI Autor desconhecido',
                parent_id: 16,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 60
                address: 'Av. de Rodrigues de Freitas 265, 4049-021 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145608,
                longitude: -8.600633,
                name: 'Guardador de Sol, 1963. José́ Rodrigues',
                parent_id: 16,
                poi_type_id: 2
                // context_id: 1
            },
            {
                // 60
                address: 'Av. de Rodrigues de Freitas 265, 4049-021 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145487,
                longitude: -8.600749,
                name: 'Faina fluvial no Douro, 1962',
                parent_id: 16,
                poi_type_id: 2
                // context_id: 1
            }
        ], {});
    }
};
