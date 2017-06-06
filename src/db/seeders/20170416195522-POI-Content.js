'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('poi_contents', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('poi_contents', [
            {
                content_type_id: 1,
                poi_id: 121,
                url_l: 'initial-content/110/FADEUP.jpg',
                url_m: 'initial-content/110/FADEUP.jpg',
                url_s: 'initial-content/110/FADEUP.jpg',
                url_xs: 'initial-content/110/FADEUP.jpg'
            },
            {
                content_type_id: 1,
                poi_id: 123,
                url_l: 'initial-content/112/FFUP.jpg',
                url_m: 'initial-content/112/FFUP.jpg',
                url_s: 'initial-content/112/FFUP.jpg',
                url_xs: 'initial-content/112/FFUP.jpg'
            },
            {
                content_type_id: 1,
                poi_id: 125,
                url_l: 'initial-content/114/FIMS.jpg',
                url_m: 'initial-content/114/FIMS.jpg',
                url_s: 'initial-content/114/FIMS.jpg',
                url_xs: 'initial-content/114/FIMS.jpg'
            },
            {
                content_type_id: 1,
                poi_id: 126,
                url_l: 'initial-content/115/FMUP_01.jpg',
                url_m: 'initial-content/115/FMUP_01.jpg',
                url_s: 'initial-content/115/FMUP_01.jpg',
                url_xs: 'initial-content/115/FMUP_01.jpg'
            },
            {
                content_type_id: 1,
                poi_id: 126,
                url_l: 'initial-content/115/FMUP_02.jpg',
                url_m: 'initial-content/115/FMUP_02.jpg',
                url_s: 'initial-content/115/FMUP_02.jpg',
                url_xs: 'initial-content/115/FMUP_02.jpg'
            },
            {
                content_type_id: 1,
                poi_id: 126,
                url_l: 'initial-content/115/FMUP_03.jpg',
                url_m: 'initial-content/115/FMUP_03.jpg',
                url_s: 'initial-content/115/FMUP_03.jpg',
                url_xs: 'initial-content/115/FMUP_03.jpg'
            },
            {
                content_type_id: 1,
                poi_id: 127,
                url_l: 'initial-content/116/ICBAS.jpg',
                url_m: 'initial-content/116/ICBAS.jpg',
                url_s: 'initial-content/116/ICBAS.jpg',
                url_xs: 'initial-content/116/ICBAS.jpg'
            },
            {
                content_type_id: 1,
                poi_id: 129,
                url_l: 'initial-content/118/REITORIA.jpg',
                url_m: 'initial-content/118/REITORIA.jpg',
                url_s: 'initial-content/118/REITORIA.jpg',
                url_xs: 'initial-content/118/REITORIA.jpg'
            },
            {
                content_type_id: 1,
                poi_id: 150,
                url_l: 'initial-content/139/Poente na Serra_l.png',
                url_m: 'initial-content/139/Poente na Serra_m.png',
                url_s: 'initial-content/139/Poente na Serra_s.png',
                url_xs: 'initial-content/139/Poente na Serra_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 151,
                url_l: 'initial-content/140/Perspetiva de cinema_l.png',
                url_m: 'initial-content/140/Perspetiva de cinema_m.png',
                url_s: 'initial-content/140/Perspetiva de cinema_s.png',
                url_xs: 'initial-content/140/Perspetiva de cinema_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 152,
                url_l: 'initial-content/141/Ovario de coelha_l.png',
                url_m: 'initial-content/141/Ovario de coelha_m.png',
                url_s: 'initial-content/141/Ovario de coelha_s.png',
                url_xs: 'initial-content/141/Ovario de coelha_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 153,
                url_l: 'initial-content/142/Disco_l.gif',
                url_m: 'initial-content/142/Disco_m.gif',
                url_s: 'initial-content/142/Disco_s.gif',
                url_xs: 'initial-content/142/Disco_xs.gif'
            },
            {
                content_type_id: 1,
                poi_id: 154,
                url_l: 'initial-content/143/Sela_l.gif',
                url_m: 'initial-content/143/Sela_m.gif',
                url_s: 'initial-content/143/Sela_s.gif',
                url_xs: 'initial-content/143/Sela_xs.gif'
            },
            {
                content_type_id: 1,
                poi_id: 155,
                url_l: 'initial-content/144/Circulo de reflexao_l.gif',
                url_m: 'initial-content/144/Circulo de reflexao_m.gif',
                url_s: 'initial-content/144/Circulo de reflexao_s.gif',
                url_xs: 'initial-content/144/Circulo de reflexao_xs.gif'
            },
            {
                content_type_id: 1,
                poi_id: 159,
                url_l: 'initial-content/148/Moinho_l.gif',
                url_m: 'initial-content/148/Moinho_m.gif',
                url_s: 'initial-content/148/Moinho_s.gif',
                url_xs: 'initial-content/148/Moinho_xs.gif'
            },
            {
                content_type_id: 1,
                poi_id: 160,
                url_l: 'initial-content/149/Pipeta_l.png',
                url_m: 'initial-content/149/Pipeta_m.png',
                url_s: 'initial-content/149/Pipeta_s.png',
                url_xs: 'initial-content/149/Pipeta_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 162,
                url_l: 'initial-content/151/Povo e Tropa_l.gif',
                url_m: 'initial-content/151/Povo e Tropa_m.gif',
                url_s: 'initial-content/151/Povo e Tropa_s.gif',
                url_xs: 'initial-content/151/Povo e Tropa_xs.gif'
            },
            {
                content_type_id: 1,
                poi_id: 163,
                url_l: 'initial-content/153/Mulher gravida e instrumento medico_1_l.png',
                url_m: 'initial-content/153/Mulher gravida e instrumento medico_1_m.png',
                url_s: 'initial-content/153/Mulher gravida e instrumento medico_1_s.png',
                url_xs: 'initial-content/153/Mulher gravida e instrumento medico_1_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 164,
                url_l: 'initial-content/153/Mulher gravida e instrumento medico_2_l.png',
                url_m: 'initial-content/153/Mulher gravida e instrumento medico_2_m.png',
                url_s: 'initial-content/153/Mulher gravida e instrumento medico_2_s.png',
                url_xs: 'initial-content/153/Mulher gravida e instrumento medico_2_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 164,
                url_l: 'initial-content/153/Mulher gravida e instrumento medico_3_l.png',
                url_m: 'initial-content/153/Mulher gravida e instrumento medico_3_m.png',
                url_s: 'initial-content/153/Mulher gravida e instrumento medico_3_s.png',
                url_xs: 'initial-content/153/Mulher gravida e instrumento medico_3_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 165,
                url_l: 'initial-content/154/Estojo instrumentos medicos_1_l.png',
                url_m: 'initial-content/154/Estojo instrumentos medicos_1_m.png',
                url_s: 'initial-content/154/Estojo instrumentos medicos_1_s.png',
                url_xs: 'initial-content/154/Estojo instrumentos medicos_1_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 165,
                url_l: 'initial-content/154/Estojo instrumentos medicos_2_l.png',
                url_m: 'initial-content/154/Estojo instrumentos medicos_2_m.png',
                url_s: 'initial-content/154/Estojo instrumentos medicos_2_s.png',
                url_xs: 'initial-content/154/Estojo instrumentos medicos_2_xs.png'
            },
            {
                content_type_id: 1,
                poi_id: 166,
                url_l: 'initial-content/155/Rosto em cera_l.gif',
                url_m: 'initial-content/155/Rosto em cera_m.gif',
                url_s: 'initial-content/155/Rosto em cera_s.gif',
                url_xs: 'initial-content/155/Rosto em cera_xs.gif'
            },
            {
                content_type_id: 1,
                poi_id: 167,
                url_l: 'initial-content/156/heart_l.gif',
                url_m: 'initial-content/156/heart_m.gif',
                url_s: 'initial-content/156/heart_s.gif',
                url_xs: 'initial-content/156/heart_xs.gif'
            },
            {
                content_type_id: 1,
                poi_id: 171,
                url_l: 'initial-content/160/Fonografo de Edison_l.gif',
                url_m: 'initial-content/160/Fonografo de Edison_m.gif',
                url_s: 'initial-content/160/Fonografo de Edison_s.gif',
                url_xs: 'initial-content/160/Fonografo de Edison_xs.gif'
            },
            {
                content_type_id: 1,
                poi_id: 176,
                url_l: 'initial-content/165/Faina fluvial no Douro_l.png',
                url_m: 'initial-content/165/Faina fluvial no Douro_m.png',
                url_s: 'initial-content/165/Faina fluvial no Douro_s.png',
                url_xs: 'initial-content/165/Faina fluvial no Douro_xs.png'
            }
        ], {});
    }
};
