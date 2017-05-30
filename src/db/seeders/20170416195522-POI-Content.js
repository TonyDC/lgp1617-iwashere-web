'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('poi_contents', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('poi_contents', [
            {
                content_type_id: 1,
                poi_id: 1,
                url_l: 'HnOTfIIX4LbhzZNwKW9fwXOqJvc2/0164604285b520a3302292c498ef7cb10a3a8f879d43ca90b1ea36c892ce8f8f - 170678 - large_7b56473e43bbb9dc9e7edc7fe1cb6e88.jpeg',
                url_m: 'HnOTfIIX4LbhzZNwKW9fwXOqJvc2/0263bcb896493b7319d0a8ef80038251b145e30bd11027d33261900a339f437b - 282727 - medium_2e1e0a87e2e5bf4e37ce3bb4959eb3c5.jpeg',
                url_s: 'HnOTfIIX4LbhzZNwKW9fwXOqJvc2/0a1dce237beaede1423ccf746a13376ef8b782cfd29210914e29cc747fdac406 - 170678 - small_2c93d42b36e8ee76a39e6c7c62bf3736.jpeg',
                url_xs: 'HnOTfIIX4LbhzZNwKW9fwXOqJvc2/11f3d5689593af6de4844f08a710db66f7b1e7ee8342ff41005aaae009debc61 - 282727 - xsmall_50b7f55b7f52e18be8bf2d9b724534e7.jpeg'
            },
            {
                content_type_id: 1,
                poi_id: 1,
                url_l: 'HnOTfIIX4LbhzZNwKW9fwXOqJvc2/0164604285b520a3302292c498ef7cb10a3a8f879d43ca90b1ea36c892ce8f8f - 170678 - large_7b56473e43bbb9dc9e7edc7fe1cb6e88.jpeg',
                url_m: 'HnOTfIIX4LbhzZNwKW9fwXOqJvc2/0263bcb896493b7319d0a8ef80038251b145e30bd11027d33261900a339f437b - 282727 - medium_2e1e0a87e2e5bf4e37ce3bb4959eb3c5.jpeg',
                url_s: 'HnOTfIIX4LbhzZNwKW9fwXOqJvc2/0a1dce237beaede1423ccf746a13376ef8b782cfd29210914e29cc747fdac406 - 170678 - small_2c93d42b36e8ee76a39e6c7c62bf3736.jpeg',
                url_xs: 'HnOTfIIX4LbhzZNwKW9fwXOqJvc2/11f3d5689593af6de4844f08a710db66f7b1e7ee8342ff41005aaae009debc61 - 282727 - xsmall_50b7f55b7f52e18be8bf2d9b724534e7.jpeg'
            },
            {
                content_type_id: 1,
                poi_id: 139,
                url_l: 'initial-content/139/Poente na Serra_l.png',
                url_m: 'initial-content/139/Poente na Serra_m.png',
                url_s: 'initial-content/139/Poente na Serra_s.png',
                url_xs: 'initial-content/139/Poente na Serra_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 140,
                url_l: 'initial-content/140/Perspetiva de cinema_l.png',
                url_m: 'initial-content/140/Perspetiva de cinema_m.png',
                url_s: 'initial-content/140/Perspetiva de cinema_s.png',
                url_xs: 'initial-content/140/Perspetiva de cinema_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 141,
                url_l: 'initial-content/141/Ovario de coelha_l.png',
                url_m: 'initial-content/141/Ovario de coelha_m.png',
                url_s: 'initial-content/141/Ovario de coelha_s.png',
                url_xs: 'initial-content/141/Ovario de coelha_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 142,
                url_l: 'initial-content/142/Disco_l.gif',
                url_m: 'initial-content/142/Disco_m.gif',
                url_s: 'initial-content/142/Disco_s.gif',
                url_xs: 'initial-content/142/Disco_xs.gif'
            },
            {
                content_type_id: 1,
                poi_id: 143,
                url_l: 'initial-content/143/Sela_l.gif',
                url_m: 'initial-content/143/Sela_m.gif',
                url_s: 'initial-content/143/Sela_s.gif',
                url_xs: 'initial-content/143/Sela_xs.gif'
            },
            {
                content_type_id: 1,
                poi_id: 144,
                url_l: 'initial-content/144/Circulo de reflexao_l.gif',
                url_m: 'initial-content/144/Circulo de reflexao_m.gif',
                url_s: 'initial-content/144/Circulo de reflexao_s.gif',
                url_xs: 'initial-content/144/Circulo de reflexao_xs.gif'
            },
            {
                content_type_id: 1,
                poi_id: 148,
                url_l: 'initial-content/148/Moinho_l.gif',
                url_m: 'initial-content/148/Moinho_m.gif',
                url_s: 'initial-content/148/Moinho_s.gif',
                url_xs: 'initial-content/148/Moinho_xs.gif'
            },
            {
                content_type_id: 1,
                poi_id: 149,
                url_l: 'initial-content/149/Pipeta_l.png',
                url_m: 'initial-content/149/Pipeta_m.png',
                url_s: 'initial-content/149/Pipeta_s.png',
                url_xs: 'initial-content/149/Pipeta_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 151,
                url_l: 'initial-content/151/Povo e Tropa_l.gif',
                url_m: 'initial-content/151/Povo e Tropa_m.gif',
                url_s: 'initial-content/151/Povo e Tropa_s.gif',
                url_xs: 'initial-content/151/Povo e Tropa_xs.gif'
            },
            {
                content_type_id: 1,
                poi_id: 153,
                url_l: 'initial-content/153/Mulher gravida e instrumento medico_1_l.png',
                url_m: 'initial-content/153/Mulher gravida e instrumento medico_1_m.png',
                url_s: 'initial-content/153/Mulher gravida e instrumento medico_1_s.png',
                url_xs: 'initial-content/153/Mulher gravida e instrumento medico_1_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 153,
                url_l: 'initial-content/153/Mulher gravida e instrumento medico_2_l.png',
                url_m: 'initial-content/153/Mulher gravida e instrumento medico_2_m.png',
                url_s: 'initial-content/153/Mulher gravida e instrumento medico_2_s.png',
                url_xs: 'initial-content/153/Mulher gravida e instrumento medico_2_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 153,
                url_l: 'initial-content/153/Mulher gravida e instrumento medico_3_l.png',
                url_m: 'initial-content/153/Mulher gravida e instrumento medico_3_m.png',
                url_s: 'initial-content/153/Mulher gravida e instrumento medico_3_s.png',
                url_xs: 'initial-content/153/Mulher gravida e instrumento medico_3_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 154,
                url_l: 'initial-content/154/Estojo instrumentos medicos_1_l.png',
                url_m: 'initial-content/154/Estojo instrumentos medicos_1_m.png',
                url_s: 'initial-content/154/Estojo instrumentos medicos_1_s.png',
                url_xs: 'initial-content/154/Estojo instrumentos medicos_1_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 154,
                url_l: 'initial-content/154/Estojo instrumentos medicos_2_l.png',
                url_m: 'initial-content/154/Estojo instrumentos medicos_2_m.png',
                url_s: 'initial-content/154/Estojo instrumentos medicos_2_s.png',
                url_xs: 'initial-content/154/Estojo instrumentos medicos_2_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 155,
                url_l: 'initial-content/155/Rosto em cera_l.gif',
                url_m: 'initial-content/155/Rosto em cera_m.gif',
                url_s: 'initial-content/155/Rosto em cera_s.gif',
                url_xs: 'initial-content/155/Rosto em cera_xs.gif'
            },
            {
                content_type_id: 1,
                poi_id: 156,
                url_l: 'initial-content/156/heart_l.gif',
                url_m: 'initial-content/156/heart_m.gif',
                url_s: 'initial-content/156/heart_s.gif',
                url_xs: 'initial-content/156/heart_xs.gif'
            },
            {
                content_type_id: 1,
                poi_id: 160,
                url_l: 'initial-content/160/Fonografo de Edison_l.gif',
                url_m: 'initial-content/160/Fonografo de Edison_m.gif',
                url_s: 'initial-content/160/Fonografo de Edison_s.gif',
                url_xs: 'initial-content/160/Fonografo de Edison_xs.gif'
            },
            {
                content_type_id: 1,
                poi_id: 165,
                url_l: 'initial-content/165/Faina fluvial no Douro_l.png',
                url_m: 'initial-content/165/Faina fluvial no Douro_m.png',
                url_s: 'initial-content/165/Faina fluvial no Douro_s.png',
                url_xs: 'initial-content/165/Faina fluvial no Douro_xs.png'
            }
        ], {});
    }
};
