/* eslint-disable camelcase,lines-around-directive,max-lines */
'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('pois', null, {});
    },
    up: (queryInterface) => {
        return queryInterface.bulkInsert('pois', [
            // People
            {
                // 1
                address: 'Av. de Rodrigues de Freitas, Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'José Joaquim Rodrigues de Freitas Júnior, nascido no Porto a 24 de janeiro de 1840, foi engenheiro, professor, pedagogo, publicista, político, economista e filósofo. No ano de 1855, somente com 15 anos de idade, ingressou no curso de Engenheiro de Pontes e Estradas da Academia Politécnica do Porto. Após um percurso académico repleto de louvores, começou uma carreira enquanto docente mas na área de Economia. Decorria o ano de 1864 quando foi nomeado lente-substituto da 11ª e 12ª cadeira, tornando-se o segundo ex-aluno da APP a integrar o seu corpo docente. Em 1867 passou a lente proprietário de Comércio.',
                latitude: 41.145779,
                longitude: -8.601001,
                name: 'José Rodrigues de Freitas',
                poi_type_id: 1

            },
            {
                // 2
                address: 'Av. Francisco Xavier Esteves, 4300 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Francisco Xavier Esteves, nascido a 8 de outubro de 1864, foi engenheiro,professor, governante e industrial. No início da sua carreira académica em 1886, ingressou em Engenharia na Academia Politécnica do Porto. Após concluir a licenciatura, tornou-se docente no Instituto Industrial e Comercial do Porto e na Faculdade Técnica da Universidade do Porto. Posteriormente construiu a empresa Xavier Esteves e C.ª, importadora de maquinaria para a agricultura e indústria e material circulante para o caminho-de-ferro e exportadora de produtos industriais, a par do envolvimento na vida política.',
                latitude: 41.154933,
                longitude: -8.565621,
                name: 'Francisco Xavier Esteves',
                poi_type_id: 1
            },
            {
                // 3
                address: 'Praça de Gomes Teixeira, 4050 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Francisco Gomes Teixeira, matemático, nasceu a 28 de janeiro de 1851 no conselho de Armamar. Concluiu a sua formação académica em 1875 na Universidade de Coimbra, ao obter o grau de Grão Doutor com a classificação de vinte valores. Posteriormente nomeado professor catedrático na FMUC, acabou por se transferir para a Academia Politécnica do Porto em 1883, tornando-se diretor e professor. No ano de 1911 foi eleito o primeiro reitor da Universidade de Porto, aquando da sua criação. Não descurando as suas funções de docente, lecionou na FCUP até 1929, envolvendo-se, em simultâneo, na vida política nacional.',
                latitude: 41.147268,
                longitude: -8.615843,
                name: 'Francisco Gomes Teixeira',
                poi_type_id: 1
            },
            {
                // 4
                address: 'Praça de Parada Leitão, 4050-064 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Nascido no ano de 1809 em Cernache do Bonjardim, concelho da Sertã, José Guilherme de Parada e Silva Leitão foi militar, engenheiro, professor e publicista. Em 1837 tornou-se bacharel em Filosofia Natural e em Matemática pela Universidade de Coimbra. Estudou ainda na Academia Politécnica do Porto, que lhe conferiu carta de curso de Engenharia de Pontes e Estradas. Foi também dirigente nesta Academia enquanto docente de Física. Conhecido defensor do ensino industrial, lecionou e dirigiu a Escola Industrial do Porto, participando no 1.º ensaio de telegrafia elétrica que ligou a Associação Comercial do Porto à Associação Industrial do Porto.',
                latitude: 41.147028,
                longitude: -8.616183,
                name: 'José Guilherme de Parada Leitão',
                poi_type_id: 1
            },
            {
                // 5
                address: 'Praça Manuel Teixeira Gomes, 4460 Custóias, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Manuel Teixeira Gomes, nascido a 27 de maio de 1860 em Portimão, foi estadista, diplomata e escritor. Tencionou seguir a carreira do Pai em Medicina, contudo abandonou os estudos em busca de uma vida boémia e literária em Lisboa. Em 1881, após ter cumprido serviço militar, frequentou a Academia Politécnica o Porto, tendo como colegas Soares dos Reis e Marques de Oliveira. Com tamanha influencia artística, fundou o jornal de teatro Gil Vicente juntamente com Joaquim Coimbra e Queirós Veloso. Em 1923 foi eleito Presidente da República Portuguesa.',
                latitude: 41.200853,
                longitude: -8.642952,
                name: 'Manuel Teixeira Gomes',
                poi_type_id: 1
            },
            {
                // 6
                address: 'R. António Arroio, 4150 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'António José Arroio, nascido a 19 de fevereiro de 1856 no Porto, foi engenheiro, político, professor e crítico de arte. Fruto de uma forte educação musical, formou-se numa área totalmente diferente. Cursou Engenharia na Academia Politécnica do Porto em 1878, formação que lhe valeu um emprego na construção dos Caminhos-de-Ferro da Beira-Baixa, Beira-Alta, Sul e Sudoeste. Já em 1881 ingressou no Ministério das Obras Públicas onde foi responsável pelos serviços de inspeção e receção de material comprado no estrangeiro até 1990.',
                latitude: 41.159213,
                longitude: -8.651258,
                name: 'António José Arroio',
                poi_type_id: 1
            },
            {
                // 7
                address: 'R. Bento Carqueja, 4350 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Bento Carqueja, nascido a 6 de novembro de 1860 em Oliveira de Azeméis, foi professor, jornalista e benemérito. Em 1878 ingressou no Curso Superior de Agricultura na APP, sendo que o terminou quatro anos depois com uma excelente classificação. Foi nomeado professor da APP em 1898 onde permaneceu até 1915. Neste ano, foi convidado a lecionar as cadeiras de Economia Política, de Contabilidade e de Legislação das Obras Públicas na Faculdade Técnica, atual FEUP. Mais tarde, ascendeu ao cargo de Professor Catedrático da FCUP. Enquanto benemérito, doou o seu salário de professor ao Instituto de Investigação Científica de Ciências Económico-Sociais.',
                latitude: 41.160529,
                longitude: -8.590267,
                name: 'Bento Carqueja',
                poi_type_id: 1
            },
            {
                // 8
                address: 'R. De Azevedo De Albuquerque, 4050 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Joaquim de Azevedo Sousa Vieira da Silva Albuquerque, nascido no Porto em 1839, foi um notório matemático, professor e político. Formado no ano de 1861 em Engenharia de Pontes e Estradas na Academia Politécnica do Porto, lecionou diversas disciplinas no Lyceu do Porto. Anos mais tarde, reconhecido o seu valor académico, passou a ser docente na Academia Politécnica do Porto. Ministrou três cadeiras e desempenhou as funções de secretário interino na mesma em 1876. Atraído pela vida política, foi candidato a deputado durante a Monarquia, posteriormente revelando-se Maçom. Já em 1904, foi membro da Comissão Municipal Republicana do Porto.',
                latitude: 41.145378,
                longitude: -8.618425,
                name: 'R. Joaquim Azevedo de Albuquerque',
                poi_type_id: 1
            },
            {
                // 9
                address: 'R. de Gonçalo Sampaio, Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Gonçalo António da Silva Ferreira Sampaio, nascido a 29 de março de 1865 no concelho da Póvoa de Lanhoso, foi professor universitário e naturalista botânico. Em 1890 matriculou-se na Academia Politécnica do Porto onde cursou Química Mineral, Botânica e Zoologia, contudo, não concluiu o curso. Durante o primeiro ano frequentou a 7ª cadeira, Química Inorgânica e a 10ª, Botânica. No segundo ano inscreveu-se de novo na 7ª cadeira e ainda na 8ª, Química Inorgânica e Analítica e na 11ª, Zoologia. No ano de 1894-1895 obteve aprovação na 7ª, na 10ª e na 11ª cadeira.',
                latitude: 41.154539,
                longitude: -8.631140,
                name: 'Gonçalo Ferreira Sampaio',
                poi_type_id: 1
            },
            {
                // 10
                address: 'R. de Luís Woodhouse, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Nascido a 31 de julho de 1858 no Porto, Luís Inácio Woodhouse foi matemático, diretor da FCUP e vice-reitor da UP. Luís Woodhouse formou-se na FMUC entre 1876 e 1881 e foi docente no IICP, na APP e na FCUP. Na Academia Politécnica lecionou a 2.ª cadeira (Cálculo Diferencial, Integral, das diferenças e das variações), tendo sido nomeado lente proprietário em 1884. Lecionou ainda a 1.ª cadeira (Geometria analítica, Álgebra Superior, Trigonometria Esférica) em 1885. Após a criação da UP transferiu-se para a secção de Matemática da FCUP onde lhe foi conferido o grau de doutor em Ciências Matemáticas.',
                latitude: 41.169777,
                longitude: -8.593635,
                name: 'Luís Woodhouse',
                poi_type_id: 1
            },
            {
                // 11
                address: 'R. de Ricardo Severo, 4050 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Ricardo Severo da Fonseca e Costa, nascido no ano de 1869 em Lisboa, foi engenheiro, arqueólogo e político. Formou-se como engenheiro civil de obras públicas em 1890 e engenheiro civil de minas em 1891 na Academia Politécnica do Porto. Participou na fundação da Revista de Ciências Naturais e Sociais em 1890. No ano seguinte teve uma intervenção bastante ativa na revolução republicana no Porto que, devido ao seu fracasso, o obrigou a viajar para o Brasil.',
                latitude: 41.156591,
                longitude: -8.625074,
                name: 'Ricardo Severo',
                poi_type_id: 1
            },
            {
                // 12
                address: 'R. Dr. Adriano de Paiva, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Adriano de Paiva de Faria Leite Brandão, nascido em Braga a 22 de abril de 1847, foi professor e pioneiro da telescopia elétrica. Doutorou-se em Filosofia em 1868 e após expor publicamente o seu trabalho Exposição dos Princípios Fundamentais da Termodinâmica em 1872, foi nomeado docente substituto temporário na APP da secção da 7.ª, 8.ª e 9.ª cadeira. Foi promovido a lente substituto vitalício em 1875 e no ano seguinte passou a lente proprietário da 9.ª cadeira. Já em 1885 começou a lecionar a 6.ª cadeira. Durante os anos letivos de 1898-1899 e 1899-1900 foi diretor interino da APP.',
                latitude: 41.165732,
                longitude: -8.608375,
                name: 'Adriano de Paiva Brandão (Conde de Campo Belo)',
                poi_type_id: 1
            },
            {
                // 13
                address: 'Rua do Dr. Ferreira da Silva, 4050 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Nascido a 28 de julho de 1853 no concelho de Oliveira de Azeméis, António Joaquim Ferreira da Silva foi químico e professor universitário. Frequentou duas cadeiras na Academia Politécnica no Porto tendo depois obtido o grau de bacharel na Universidade de Coimbra em 1876. Posteriormente doutorou-se em Ciências Físico-Químicas e em Farmácia pelas faculdades de Ciências em 1918 e na Farmácia da Universidade do Porto em 1922. Lente na Academia Politécnica do Porto e professor nas faculdades de Medicina, Engenharia, Farmácia e Ciências, foi diretor desta última e Vice-reitor da U.Porto. Criou e dirigiu o Laboratório Municipal do Porto.',
                latitude: 41.145638,
                longitude: -8.615452,
                name: 'António Ferreira da Silva',
                poi_type_id: 1
            },
            {
                // 14
                address: 'R. Gustavo de Sousa, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Gustavo Adolfo Gonçalves de Sousa, nascido na cidade do Porto em 1818, foi engenheiro e docente. Ingressou na Academia Portuense de Belas Artes em 1841, mas foi na Academia Politécnica do Porto que obteve a carta de curso de Engenharia Civil de Pontes e Estradas em 1850. Foi nomeado lente substituto da secção de matemática da APP em 1851, tornando-se, assim, no primeiro docente totalmente formado pela mesma. Integrou a comissão de obras da sede da APP e entre 1860 e 1879 dirigiu as obras do Palácio da Bolsa, tendo riscado a Escadaria Nobre (1862) e o famoso Salão Árabe.',
                latitude: 41.165527,
                longitude: -8.669287,
                name: 'Gustavo Gonçalves de Sousa',
                poi_type_id: 1
            },
            {
                // 15
                address: 'R. Leonardo Coimbra, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Nascido a 29 de dezembro de 1883 no concelho de Felgueiras, Leonardo José Coimbra foi professor, orador, político e filósofo. Realizou a sua formação secundária e académica em várias cidades do país: fez os estudos secundários em Penafiel, ingressou na Universidade de Coimbra, na Escola Naval de Lisboa, na Academia Politécnica do Porto e no Curso Superior de Letras. Tendo sido docente em diversos liceus, o seu principal cargo foi enquanto professor catedrático e diretor do grupo de Filosofia na Faculdade de Letras da Universidade do Porto. Foi eleito Ministro da Instrução Pública em 1919 e 1922.',
                latitude: 41.174405,
                longitude: -8.609082,
                name: 'Leonardo Coimbra',
                poi_type_id: 1
            },
            {
                // 16
                address: 'R. Prof. Augusto Nobre, Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Nascido a 25 de junho de 1865 no Porto, Augusto Pereira Nobre foi zoólogo, professor universitário e o terceiro reitor da UP. Ingressou na Academia Politécnica do Porto para estudar os preparatórios de Medicina, contudo, a sua vocação era a Zoologia. Aquando do seu regresso ao Porto em 1890 regressou à APP na condição de assistente. No ano seguinte foi nomeado ajudante do professor Aarão de Lacerda na cadeira de Zoologia. Em 1918 obteve o grau de doutor em Ciências Histórico-Naturais na FCUP, pelo que em 1921 passou a dirigir o Instituto de Zoologia. Foi responsável pela criação do Museu de Zoologia.',
                latitude: 41.160027,
                longitude: -8.653772,
                name: 'Augusto Nobre',
                poi_type_id: 1
            },
            {
                // 17
                address: 'R. Prof. Duarte Leite, 4350 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Nascido a 11 de agosto de 1864, Duarte Augusto Leite foi matemático,historiador, professor universitário e político. Concluídos os estudos académicos, integrou o corpo docente da Academia Politécnica do Porto enquanto lente da 4ª cadeira (Geometria descritiva). Em 1889 começou a lecionar a 5ª cadeira (Geometria e Geodesia). Em 1910 foi transferido para a FCUP, onde integrou o 2º grupo da 1ª secção e lhe foi conferido o grau de doutor em Ciências Matemáticas no ano de 1818. Foi Ministro das Finanças em 1911 e chefe do Governo e Ministro do Interior entre 1912 e 1913',
                latitude: 41.176621,
                longitude: -8.584076,
                name: 'Duarte Leite',
                poi_type_id: 1
            },
            {
                // 18
                address: 'R. Prof. Mendes Correia, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Nascido a 4 de abril de 1888 no Porto, António Augusto Esteves Mendes foi professor universitário, antropólogo e historiador. Matriculou-se na Academia Politécnica do Porto no Curso Preparatório de Medicina. Porém, continuou os estudos na Escola Médico-Cirúrgica do Porto. Na FCUP doutorou-se em 1922 em Ciências Histórico-Naturais, onde tomou posse como professor catedrático do subgrupo de Antropologia. Foi ainda diretor do Instituto de Investigação Científica de Antropologia em 1921 e também nomeado professor ordinário na FLUP no mesmo ano. Fundou o Gabinete de História da Cidade em 1936, referente à preservação e divulgação do património histórico e cultural da cidade.',
                latitude: 41.170551,
                longitude: -8.595635,
                name: 'António Mendes Correia',
                poi_type_id: 1
            },
            {
                // 19
                address: 'R. Raúl Brandão, 4150-570 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Raúl Germano Brandão, nascido a 12 de março de 1867 no Porto, foi escritor, jornalista e militar. Quando ingressou na Academia Politécnica do Porto encontrou outros amigos aspirantes a escritores, profissão que almejava. Um ano após a sua entrada na Escola do Exército em Lisboa em 1888, conseguiu estrear-se enquanto escritor com a coletânea de contos naturalistas Impressões e Paisagens. Em 1899, em parceria com Júlio Brandão, escreveu a peça Noite de Natal, apresentada no Teatro D.Maria.',
                latitude: 41.148288,
                longitude: -8.668356,
                name: 'Raúl Brandão',
                poi_type_id: 1
            },
            {
                // 20
                address: 'R. Rocha Peixoto, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Nascido a 18 de maio de 1866, António Augusto César Octaviano da Rocha Peixoto foi naturalista, etnógrafo, arqueólogo e bibliotecário. Em 1887, na Academia Politécnica do Porto, fundou com Fonseca Cardoso, João Barreira, Ricardo Severo e Xavier Pinho a Sociedade Carlos Ribeiro. Este grupo reunia-se numa casa em Moinho de Vento para debater a crise nacional. Assim resultou a publicação da Revista de Sciencias Naturaes e Sociaes. Enquanto estudante, Rocha Peixoto colaborou em opúsculos e jornais e publicou artigos acerca da degradação do Museu Municipal do Porto. Em meados de 1900 foi nomeado Conservador do mesmo.',
                latitude: 41.167018,
                longitude: -8.656712,
                name: 'Rocha Peixoto',
                poi_type_id: 1
            },
            {
                // 21
                address: 'R. Vitorino Damásio, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'José Vitorino Damásio, nascido a 2 de novembro de 1807, foi combatente liberal, professor, fundador da AIP e pioneiro da telegrafia elétrica. Em 1828 interrompeu os estudos para aderir ao movimento liberal na cidade do Porto. Ingressou de novo na Universidade de Coimbra em 1837, onde se tornou bacharel. No mesmo ano foi nomeado docente da 3ª cadeira (Geometria Descritiva, Mecânica Racional, Cinemática das Máquinas) na Academia Politécnica do Porto. Em 1840 lecionou também a 6ª cadeira (Artilharia e Tática naval e construções públicas). Acompanhou a edificação da Ponte Pênsil do Porto, concluída em 1842.',
                latitude: 41.169864,
                longitude: -8.593792,
                name: 'Vitorino Damásio',
                poi_type_id: 1
            },
            {
                // 22
                address: 'Av. de Camilo, 4300 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Camilo Castelo Branco nasceu em Lisboa a 16 de março de 1825 e foi um ilustre escritor e romancista. No ano de 1843, já casado e com uma filha com poucos meses, ingressou no primeiro ano de Anatomia da Escola Médico-Cirúrgica e depois em Química, na Academia Politécnica do Porto. Já em 1844 frequentou o primeiro ano de Medicina e no ano posterior voltou a inscrever-se na Escola Médica. Porém, acabou por perder o ano por faltas por levar uma vida boémia. Mais tarde participou em certames poéticos que levaram à publicação das suas primeiras obras dentro desse género literário.',
                latitude: 41.148708,
                longitude: -8.595570,
                name: 'Camilo Castelo Branco',
                poi_type_id: 1
            },
            {
                // 23
                address: 'Largo do Dr. Pedro Vitorino, 4000 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Joaquim Pedro Vitorino Ribeiro, nascido a 20 de janeiro de 1882 no Porto, foi médico, historiador, arqueólogo, etnógrafo, militar, e crítico de arte. Frequentou a Academia Politécnica do Porto entre 1902 e 1905, na qual acompanhou a Estudantina Académica do Porto à Galiza em 1902. Transitou para a Escola Médico-Cirúrgica em 1910, tendo depois partido para Paris para se especializar em Radiologia. Em 1938 abandona o cargo de vice-diretor no Museu Municipal do Porto para assumir a função de chefe dos Serviços de Radiologia da FMUP.',
                latitude: 41.142542,
                longitude: -8.612488,
                name: 'Joaquim Pedro Vitorino',
                poi_type_id: 1
            },
            {
                // 24
                address: 'R. de António Patrício, Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'António Patrício, nascido a 7 de março de 1878 no Porto, foi escritor e diplomata. Ingressou na Academia Politécnica do Porto com apenas 15 anos na condição de aluno voluntário. Contudo, uma vez que não obteve muito sucesso nesta sua primeira tentativa no ensino superior, abandonou a Academia sem qualquer grau académico. No ano de 1901 matriculou-se na Escola Médico-Cirúrgica do Porto, onde conseguiu terminar o curso de Medicina em 1908 com a classificação de 14 valores. Ainda enquanto estudante universitário, publicou o seu primeiro livro intitulado Oceano em 1905.',
                latitude: 41.158395,
                longitude: -8.639022,
                name: 'António Patrício',
                poi_type_id: 1
            },
            {
                // 25
                address: 'Rua de Júlio Dinis, 4050 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Joaquim Guilherme Gomes Coelho, nascido a 14 de novembro de 1839 no Porto, foi médico, escritor e professor. Em 1853 ingressou na Academia Politécnica do Porto. Frequentou as cadeiras de química, matemática, física, botânica e zoologia com boas classificações, porém optou por se matricular na Escola Médico-Cirúrgica do Porto em 1856. Após terminar o curso de Medicina, enveredou pela carreira de docente pois considerava que exercer exigia uma grande responsabilidade. Sob o pseudónimo Júlio Dinis, conhecemos-lhe diversas obras, como por exemplo, As Pupilas do Senhor Reitor, publicada em 1867. ',
                latitude: 41.152858,
                longitude: -8.626292,
                name: 'Júlio Dinis',
                poi_type_id: 1
            },
            {
                // 26
                address: 'R. Dr. Aarão de Lacerda, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Aarão Ferreira de Lacerda, nascido a 3 de outubro de 1863 em Vila Nova de Paiva, foi zoólogo, médico e professor universitário. Frequentou Filosofia na Universidade de Coimbra e em 1887 foi nomeado lente substituto da secção de Filosofia da APP. Em 1890 assumiu o cargo de lente proprietário da 11ª cadeira, Zoologia. Enveredou por uma carreira política e após o término do mandato regressou à APP em 1897. Começou a lecionar a 20ª cadeira em 1910 e após a criação da Universidade do Porto em 1911, integrou o 1ª grupo da 3ª secção da FCUP.',
                latitude: 41.167965,
                longitude: -8.658377,
                name: 'Aarão Ferreira de Lacerda',
                poi_type_id: 1
            },
            {
                // 27
                address: 'R. Dr. Plácido da Costa, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'António Plácido da Costa, nascido a 1 de setembro de 1848, foi médico, oftalmologista, professor universitário e inventor. Concluiu o liceu e ingressou de imediato na Academia Politécnica do Porto, na qual permaneceu até 1868. Foi na APP que realizou exames de Física, Química, Zoologia e Botânica e foi premiado na cadeira de Botânica por um trabalho na área de Histologia Vegetal, em 1867. Em 1874 inscreveu-se na Escola Médico-Cirúrgica do Porto, onde foi condiscípulo de Ricardo Jorge. Mais tarde voltou à Escola Médica para apresentar as suas invenções.',
                latitude: 41.179139,
                longitude: -8.601130,
                name: 'António Plácido da Costa',
                poi_type_id: 1
            },
            {
                // 28
                address: 'R. Eng. Ezequiel de Campos, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Ezequiel de Campos, nascido a 12 de dezembro de 1874 no concelho da Póvoa de Varzim, foi engenheiro e professor. Concluiu os estudos do ensino secundário em 1892 no Porto. Contudo, uma vez que a família não dispunha de meios financeiros para frequentar o ensino superior, foi financiado por um amigo benemérito. Assim, ingressou na Academia Politécnica do Porto no ano de 1992 no curso de Engenharia Civil. Décadas mais tarde, exerceu funções de docente no Instituto Superior do Comércio do Porto entre 1925 e 1927 e na FEUP entre 1928 e 1944.',
                latitude: 41.172370,
                longitude: -8.651875,
                name: 'Ezequiel de Campos',
                poi_type_id: 1
            },
            {
                // 29
                address: 'Rua do Doutor Manuel Pereira da Silva',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Manuel Joaquim Pereira da Silva, nascido em 1801, foi professor e militar. Em 1836 foi nomeado lente da 11ª cadeira, Comércio, na Academia Real da Marinha e Comércio da Cidade do Porto. Já em 1838 passou a lecionar essa cadeira na Academia Politécnica do Porto, tendo-a ministrado até ao ano de 1863. Publicou algumas obras e foi cavaleiro da Ordem da Nossa Senhora da Conceição.',
                latitude: 41.17881,
                longitude: -8.5973,
                name: 'Manuel Pereira da Silva',
                poi_type_id: 1
            },
            {
                // 30
                address: 'Alameda Prof. Hernâni Monteiro, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Nascido no Porto a 18 de maio de 1891, Hernâni Bastos Monteiro foi médico, professor universitário e escritor. Frequentou a Academia Politécnica do Porto entre 1907 e 1910, contudo no ano seguinte transitou para a FMUP, onde concluiu o curso de Medicina em 1915. Ficou responsável pelo catálogo do Museu de Anatomia Normal da FMUP. Em 1918 foi nomeado regente da cadeira de Anatomia Topográfica, sendo que em 1924 passou a Professor Catedrático da mesma juntamente com Medicina Operatória. Fundou os Laboratórios de Cirurgia Experimental e de Radiologia em 1928 e o Laboratório de Embriologia e Teratologia. ',
                latitude: 41.1831,
                longitude: -8.60105,
                name: 'Hernâni Bastos Monteiro',
                poi_type_id: 1
            },
            {
                // 31
                address: 'Largo do Prof. Abel Salazar, 4050-011 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Abel Salazar, nascido a 19 de julho de 1889 em Guimarães, foi médico, cientista, professor, artista plástico, crítico de arte, prosador e pensador. Matriculou-se na Escola Médico-Cirúrgica em 1909, concluindo o curso de Medicina após 6 anos. Em 1919, com apenas 30 anos, foi nomeado professor catedrático de Histologia e Embriologia. No próprio ano fundou o Instituto de Histologia juntamente com o Instituto de Anatomia, entregue a Pires de Lima. Após uma pausa de 4 anos, quando regressa à FMUP, descobre o seu instituto abandonado, tendo de o reconstruir. Representou a FMUP enquanto cientista e professor em diversos congressos europeus.',
                latitude: 41.14709,
                longitude: -8.61736,
                name: 'Abel Salazar',
                poi_type_id: 1
            },
            {
                // 32
                address: 'Praceta Jaime Cortesão, 4250 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Nascido a 29 de abril de 1884 em Cantanhede, Jaime Zuarte Cortesão foi médico, político, escritor e historiador. Tendo estudado Grego e Direito na Universidade de Coimbra, optou depois por seguir Medicina na Escola Médico-Cirúrgica do Porto. Com uma curta carreira médica, começou a lecionar História e Literatura no liceu entre 1911 e 1915. Na vida política foi deputado nas legislaturas de 1915 a 1917. Dedicou-se ainda à poesia, destacando-se o poema heróico A Morte da Águia.',
                latitude: 41.17313,
                longitude: -8.64062,
                name: 'Jaime Cortesão',
                poi_type_id: 1
            },
            {
                // 33
                address: 'R. Dr. Alberto de Aguiar, 4350-307 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Alberto de Aguiar, nascido no Porto a 22 de setembro de 1868, foi médico, analista e professor universitário. Licenciou-se em 1893 na Escola Médico-Cirúrgica do Porto, doutorando-se três anos depois. Foi docente de diversas cadeiras na FMUP entre 1896 e o ano da sua jubilação, 1935: Bacteriologia, Parasitologia, Patologia Geral, Química Biológica e Fisiologia. Para além de ter sido diretor da FMUP, foi também professor na FFUP. Dirigiu durante cinco anos o Laboratório Nobre, resultante de uma parceria entre a Escola Médico-Cirúrgica e o Hospital de Santo António. Foi Presidente do Senado da CMP entre 2 de janeiro e 30 de junho de 1926.',
                latitude: 41.15736,
                longitude: -8.59237,
                name: 'Alberto de Aguiar',
                poi_type_id: 1
            },
            {
                // 34
                address: 'R. Dr. Eduardo Santos Silva, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Nascido a 18 de março de 1879 no Porto, Eduardo Ferreira dos Santos Silva foi                médico, professor e político. Ingressou na Escola Médico-Cirúrgica do Porto em 1897 onde cursou Medicina. Contudo, após ter terminado o curso, não exerceu de imediato Medicina. Foi nomeado para lecionar Geografia, Ciências Naturais, Francês e Português no Liceu Central do Porto em 1905. Especializou em dermatologia e sifiligrafia em Paris no ano de 1909. Foi presidente do Senado da Câmara Municipal do Porto até 1921. Demitiu-se devido a divergências com o Partido Republicano.',
                latitude: 41.17845,
                longitude: -8.5869,
                name: 'Eduardo Santos Silva',
                poi_type_id: 1
            },
            {
                // 35
                address: 'R. Dr. Manuel Laranjeira, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Manuel Fernandes Laranjeira, nascido a 17 de agosto de 1877 em Santa Maria da Feira, foi médico, poeta, dramaturgo e articulista. Ingressou na Escola Médico-Cirúrgica do Porto em 1899 e quando terminou o curso começou a lecionar a cadeira de Biologia. Afetado a nível mental pela Sífilis, entrou num grave estado de depressão. Antes de cometer suicídio em 1912, recebeu o título de Doutor em Medicina e escreveu sobre crítica social, artística, literária e política. Participou também em várias conferências.',
                latitude: 41.17223,
                longitude: -8.59828,
                name: 'Manuel Laranjeira',
                poi_type_id: 1
            },
            {
                // 36
                address: 'R. Dr. Manuel Monterroso, 4250 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Nascido em 1875 na casa de família, Manuel Aníbal da Costa Monterroso foi médico, professor e caricaturista. Terminou o curso em Medicina na Escola Médico-Cirúrgica do Porto em 1902. Começou a sua atividade como médico quando foi admitido na Assistência Nacional aos Tuberculosos sendo que, mais tarde, foi nomeado Delegado de Saúde do Porto. Foi Major Médico Miliciano durante a 1ª Guerra Mundial. Mostrando uma faceta artística, publicou os seus trabalhos humorísticos em periódicos nacionais e internacionais. Entre os anos 40 e 60 participou em várias exposições na Sociedade Nacional de Belas Artes. Foi ordenado Cavaleiro da Ordem de Santiago.',
                latitude: 41.17738,
                longitude: -8.62759,
                name: 'Manuel Monterroso',
                poi_type_id: 1
            },
            {
                // 37
                address: 'R. Dr. José Domingues de Oliveira, 4450-718 Leça da Palmeira, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'José Domingues de Oliveira Júnior, nascido em Leça da Palmeira a 17 de fevereiro de 1865, foi médico e pioneiro da curieterapia. Cursou Medicina na Escola Médico-Cirúrgica do Porto, tendo terminado em 1888. No ano seguinte continuou os estudos em Paris e, quando regressou a Portugal, começou a exercer. Em 1891começou a trabalhar na área de Sanidade Marítima, tendo publicado uma obra com o mesmo nome em 1911. Foi delegado da Estação de Saúde do Porto, motivo pelo qual recebeu o grau de cavaleiro da Ordem de Santiago da Espada em 1900.',
                latitude: 41.19063,
                longitude: -8.69948,
                name: 'José Domingues de Oliveira',
                poi_type_id: 1
            },
            {
                // 38
                address: 'R. Dr. Roberto Frias, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Nascido a 5 de junho de 1853 em Nova Goa, Roberto Belarmino do Rosário Frias foi médico, cirurgião e professor universitário. Matriculou-se no curso de Medicina na Escola Médico-Cirúrgica do Porto, onde terminou a licenciatura em 1880. Depois de se ter mudado para a Caparica, sentiu necessidade de prosseguir os estudos no estrangeiro. É assim que acaba por ser docente na Escola Médica de Goa. Quando regressa ao Porto, foi nomeado Lente Demonstrador da Secção Cirúrgica entre 1887 e 1895. Ocupou posteriormente o lugar de Lente Substituto.',
                latitude: 41.1785,
                longitude: -8.59892,
                name: 'Roberto Frias',
                poi_type_id: 1
            },
            {
                // 39
                address: 'R. Dr. Roberto Frias, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'António de Sousa Magalhães e Lemos, nascido a 18 de agosto de 1855 em Felgueiras, foi neurologista, psiquiatra e professor universitário. Ingressou na Escola Médico-Cirúrgica do Porto, tendo concluído o curso em 1882. Foi nomeado médico-ajudante do Hospital Conde Ferreira, em 1892 ocupou o cargo de médico-adjunto e mais tarde foi diretor. Em 1887 foi Lente auxiliar no IICP. Foi nomeado professor de Neurologia e de Psiquiatria na FMUP. Na mesma instituição, recebeu o grau de Doutor em 1917. Foi membro do Conselho Médico Legal, professor de Psiquiatria Forense no curso superior do Instituto de Medicina Legal.',
                latitude: 41.14757,
                longitude: -8.60943,
                name: 'Magalhães Lemos',
                poi_type_id: 1
            },
            {
                // 40
                address: 'R. do Dr. Ricardo Jorge, 4000 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Nascido no Porto a 9 de maio 1858, Ricardo de Almeida Jorge foi médico, professor universitário e escritor. Foi estudante de Medicina na Escola Médico-Cirúrgica do Porto entre 1874 e 1879. Contudo, em 1883 viajou para o estrangeiro para completar os estudos de Neurologia. Interessado pelo tema da Saúde Pública, promoveu quatro conferências que alertavam para essa questão. Deste modo, conferindo prestigio, foi convidado a chefiar o Laboratório Municipal de Bacteriologia. Em 1895 foi indigitado Professor Titular da cadeira de Higiene e Medicina Legal da Escola Médico-Cirúrgica do Porto. Entre 1914 e 1915 foi presidente da Sociedade das Ciências Médicas.',
                latitude: 41.15027,
                longitude: -8.61207,
                name: 'Ricardo Jorge',
                poi_type_id: 1
            },
            // Streets
            {
                // 41
                address: 'Av. de Rodrigues de Freitas, Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145779,
                longitude: -8.601001,
                name: 'Av. de Rodrigues de Freitas',
                parent_id: 1,
                poi_type_id: 2
            },
            {
                // 42
                address: 'Av. Francisco Xavier Esteves, 4300 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.154933,
                longitude: -8.565621,
                name: 'Av. Francisco Xavier Esteves',
                parent_id: 2,
                poi_type_id: 2
            },
            {
                // 43
                address: 'Praça de Gomes Teixeira, 4050 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.147268,
                longitude: -8.615843,
                name: 'Praça de Gomes Teixeira',
                parent_id: 3,
                poi_type_id: 2
            },
            {
                // 44
                address: 'Praça de Parada Leitão, 4050-064 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.147028,
                longitude: -8.616183,
                name: 'Praça de Parada Leitão',
                parent_id: 4,
                poi_type_id: 2
            },
            {
                // 45
                address: 'Praça Manuel Teixeira Gomes, 4460 Custóias, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.200853,
                longitude: -8.642952,
                name: 'Praça Manuel Teixeira Gomes',
                parent_id: 5,
                poi_type_id: 2
            },
            {
                // 46
                address: 'R. António Arroio, 4150 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.159213,
                longitude: -8.651258,
                name: 'R. António Arroio',
                parent_id: 6,
                poi_type_id: 2
            },
            {
                // 47
                address: 'R. Bento Carqueja, 4350 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.160529,
                longitude: -8.590267,
                name: 'R. Bento Carqueja',
                parent_id: 7,
                poi_type_id: 2
            },
            {
                // 48
                address: 'R. De Azevedo De Albuquerque, 4050 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145378,
                longitude: -8.618425,
                name: 'R. De Azevedo De Albuquerque',
                parent_id: 8,
                poi_type_id: 2
            },
            {
                // 49
                address: 'R. de Gonçalo Sampaio, Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.154539,
                longitude: -8.631140,
                name: 'R. de Gonçalo Sampaio, Porto, Portugal',
                parent_id: 9,
                poi_type_id: 2
            },
            {
                // 50
                address: 'R. de Luís Woodhouse, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.169777,
                longitude: -8.593635,
                name: 'R. de Luís Woodhouse',
                parent_id: 10,
                poi_type_id: 2
            },
            {
                // 51
                address: 'R. de Ricardo Severo, 4050 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.156591,
                longitude: -8.625074,
                name: 'R. de Ricardo Severo',
                parent_id: 11,
                poi_type_id: 2
            },
            {
                // 52
                address: 'R. de Sampaio Bruno, 4000 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146867,
                longitude: -8.610808,
                name: 'R. de Sampaio Bruno',
                poi_type_id: 2
            },
            {
                // 53
                address: 'R. Dr. Adriano de Paiva, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.165732,
                longitude: -8.608375,
                name: 'R. Dr. Adriano de Paiva',
                parent_id: 12,
                poi_type_id: 2
            },
            {
                // 54
                address: 'R. do Conde de Campo Bello, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.174296,
                longitude: -8.608704,
                name: 'R. do Conde de Campo Bello',
                parent_id: 12,
                poi_type_id: 2
            },
            {
                // 55
                address: 'Rua do Dr. Ferreira da Silva, 4050 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145638,
                longitude: -8.615452,
                name: 'Rua do Dr. Ferreira da Silva',
                parent_id: 13,
                poi_type_id: 2
            },
            {
                // 56
                address: 'R. Eng. Ezequiel de Campos, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.172424,
                longitude: -8.651922,
                name: 'R. Eng. Ezequiel de Campos',
                parent_id: 28,
                poi_type_id: 2
            },
            {
                // 57
                address: 'R. Gustavo de Sousa, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.165527,
                longitude: -8.669287,
                name: 'R. Gustavo de Sousa',
                parent_id: 14,
                poi_type_id: 2
            },
            {
                // 58
                address: 'R. Leonardo Coimbra, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.174405,
                longitude: -8.609082,
                name: 'R. Leonardo Coimbra',
                parent_id: 15,
                poi_type_id: 2
            },
            {
                // 59
                address: 'R. Prof. Augusto Nobre, Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.160027,
                longitude: -8.653772,
                name: 'R. Prof. Augusto Nobre',
                parent_id: 16,
                poi_type_id: 2
            },
            {
                // 60
                address: 'R. Prof. Duarte Leite, 4350 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.176621,
                longitude: -8.584076,
                name: 'R. Prof. Duarte Leite',
                parent_id: 17,
                poi_type_id: 2
            },
            {
                // 61
                address: 'R. Prof. Mendes Correia, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.170551,
                longitude: -8.595635,
                name: 'R. Prof. Mendes Correia',
                parent_id: 18,
                poi_type_id: 2
            },
            {
                // 62
                address: 'R. Raúl Brandão, 4150-570 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.148356,
                longitude: -8.668462,
                name: 'R. Raúl Brandão',
                parent_id: 19,
                poi_type_id: 2
            },
            {
                // 63
                address: 'R. Rocha Peixoto, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.167018,
                longitude: -8.656712,
                name: 'R. Rocha Peixoto',
                parent_id: 20,
                poi_type_id: 2
            },
            {
                // 64
                address: 'R. Vitorino Damásio, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.169864,
                longitude: -8.593792,
                name: 'R. Vitorino Damásio',
                parent_id: 21,
                poi_type_id: 2
            },
            {
                // 65
                address: 'Alameda de Basílio Teles, Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.147413,
                longitude: -8.633173,
                name: 'Alameda de Basílio Teles',
                poi_type_id: 2
            },
            {
                // 66
                address: 'Alameda Prof. Hernâni Monteiro, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.183132,
                longitude: -8.601141,
                name: 'Alameda Prof. Hernâni Monteiro',
                parent_id: 30,
                poi_type_id: 2
            },
            {
                // 67
                address: 'Av. de Camilo, 4300 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.148708,
                longitude: -8.595570,
                name: 'Av. de Camilo',
                parent_id: 22,
                poi_type_id: 2
            },
            {
                // 68
                address: 'Largo do Dr. Pedro Vitorino, 4000 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.142542,
                longitude: -8.612488,
                name: 'Largo do Dr. Pedro Vitorino',
                parent_id: 23,
                poi_type_id: 2
            },
            {
                // 69
                address: 'Largo do Prof. Abel Salazar, 4050-011 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.147251,
                longitude: -8.617274,
                name: 'Largo do Prof. Abel Salazar',
                parent_id: 31,
                poi_type_id: 2
            },
            {
                // 70
                address: 'Praceta Jaime Cortesão, 4250 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.173093,
                longitude: -8.640759,
                name: 'Praceta Jaime Cortesão',
                parent_id: 32,
                poi_type_id: 2
            },
            {
                // 71
                address: 'R. de António Patrício, Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.158395,
                longitude: -8.639022,
                name: 'R. de António Patrício',
                parent_id: 24,
                poi_type_id: 2
            },
            {
                // 72
                address: 'Rua de Júlio Dinis, 4050 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.152858,
                longitude: -8.626292,
                name: 'Rua de Júlio Dinis',
                parent_id: 25,
                poi_type_id: 2
            },
            {
                // 73
                address: 'R. Dr. Aarão de Lacerda, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.167965,
                longitude: -8.658377,
                name: 'R. Dr. Aarão de Lacerda',
                parent_id: 26,
                poi_type_id: 2
            },
            {
                // 74
                address: 'R. Dr. Alberto de Aguiar, 4350-307 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.157347,
                longitude: -8.592323,
                name: 'R. Dr. Alberto de Aguiar',
                parent_id: 33,
                poi_type_id: 2
            },
            {
                // 75
                address: 'R. Dr. Eduardo Santos Silva, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.157347,
                longitude: -8.592323,
                name: 'Eduardo Santos Silva',
                parent_id: 34,
                poi_type_id: 2
            },
            {
                // 76
                address: 'R. Dr. Manuel Laranjeira, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.172161,
                longitude: -8.598267,
                name: 'R. Dr. Manuel Laranjeira',
                parent_id: 35,
                poi_type_id: 2
            },
            {
                // 77
                address: 'R. Dr. Manuel Monterroso, 4250 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.176986,
                longitude: -8.627373,
                name: 'R. Dr. Manuel Monterroso',
                parent_id: 36,
                poi_type_id: 2
            },
            {
                // 78
                address: 'R. Dr. José Domingues de Oliveira, 4450-718 Leça da Palmeira, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.190553,
                longitude: -8.699493,
                name: 'R. Dr. José Domingues de Oliveira',
                parent_id: 37,
                poi_type_id: 2
            },
            {
                // 79
                address: 'R. Dr. Plácido da Costa, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.179139,
                longitude: -8.601130,
                name: 'R. Dr. Plácido da Costa',
                parent_id: 27,
                poi_type_id: 2
            },
            {
                // 80
                address: 'R. Dr. Roberto Frias, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.178434,
                longitude: -8.598960,
                name: 'R. Dr. Roberto Frias',
                parent_id: 38,
                poi_type_id: 2
            },
            {
                // 81
                address: 'R. do Dr. Magalhães Lemos, 4000 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.147568,
                longitude: -8.609482,
                name: 'R. do Dr. Magalhães Lemos',
                parent_id: 39,
                poi_type_id: 2
            },
            {
                // 82
                address: 'R. do Dr. Ricardo Jorge, 4000 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.150246,
                longitude: -8.612185,
                name: 'R. do Dr. Ricardo Jorge',
                parent_id: 40,
                poi_type_id: 2
            },
            {
                // 83
                address: 'Avenida Arquitecto Fernando Távora, 4455, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.213334,
                longitude: -8.683361,
                name: 'Avenida Arquitecto Fernando Távora',
                poi_type_id: 2
            },
            {
                // 84
                address: 'Largo Soares dos Reis, 4300-096 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146114,
                longitude: -8.595632,
                name: 'Largo Soares dos Reis',
                poi_type_id: 2
            },
            {
                // 85
                address: 'R. Acácio Lino, 4250 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.170019,
                longitude: -8.623059,
                name: 'R. Acácio Lino',
                poi_type_id: 2
            },
            {
                // 86
                address: 'R. António Correia da Silva, 4250 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.175769,
                longitude: -8.642452,
                name: 'R. António Correia da Silva',
                poi_type_id: 2
            },
            {
                // 87
                address: 'R. António José da Costa, Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.158545,
                longitude: -8.637166,
                name: 'R. António José da Costa',
                poi_type_id: 2
            },
            {
                // 88
                address: 'R. Arquitecto Cassiano Barbosa, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.166005,
                longitude: -8.647571,
                name: 'R. Arquitecto Cassiano Barbosa',
                poi_type_id: 2
            },
            {
                // 89
                address: 'R. Artur Loureiro, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.163246,
                longitude: -8.638224,
                name: 'R. Artur Loureiro',
                poi_type_id: 2
            },
            {
                // 90
                address: 'R. Aurélia de Sousa, 4000-099 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.159630,
                longitude: -8.599794,
                name: 'R. Aurélia de Sousa',
                poi_type_id: 2
            },
            {
                // 91
                address: 'R. Dominguez Alvarez, Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.160124,
                longitude: -8.648343,
                name: 'R. Dominguez Alvarez',
                poi_type_id: 2
            },
            {
                // 92
                address: 'R. de António Cardoso, Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.156839,
                longitude: -8.641542,
                name: 'R. de António Cardoso',
                poi_type_id: 2
            },
            {
                // 93
                address: 'R. de Arménio Losa, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.170620,
                longitude: -8.663680,
                name: 'R. de Arménio Losa',
                poi_type_id: 2
            },
            {
                // 94
                address: 'R. de Francisco Oliveira Ferreira, 4100-431 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.169568,
                longitude: -8.664652,
                name: 'R. de Francisco Oliveira Ferreira',
                poi_type_id: 2
            },
            {
                // 95
                address: 'R. de Januário Godinho, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.170205,
                longitude: -8.664834,
                name: 'R. de Januário Godinho',
                poi_type_id: 2
            },
            {
                // 96
                address: 'R. de Joaquim Lopes, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.170220,
                longitude: -8.665393,
                name: 'R. de Joaquim Lopes',
                poi_type_id: 2
            },
            {
                // 97
                address: 'R. de Júlio Ramos, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.170482,
                longitude: -8.606685,
                name: 'R. de Júlio Ramos',
                poi_type_id: 2
            },
            {
                // 98
                address: 'R. de Rogério Azevedo, 4250 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.177735,
                longitude: -8.619741,
                name: 'R. de Rogério Azevedo',
                poi_type_id: 2
            },
            {
                // 99
                address: 'R. de Silva Porto, 4250 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.170687,
                longitude: -8.618450,
                name: 'R. de Silva Porto',
                poi_type_id: 2
            },
            {
                // 100
                address: 'R. de Tomás Soller, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.170144,
                longitude: -8.664970,
                name: 'R. de Tomás Soller',
                poi_type_id: 2
            },
            {
                // 101
                address: 'R. do Dr. Manuel Pereira da Silva, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.17881,
                longitude: -8.5973,
                name: 'R. do Dr. Manuel Pereira da Silva',
                parent_id: 29,
                poi_type_id: 2
            },
            {
                // 102
                address: 'R. Dr. Alberto Aires de Gouveia, 4050 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.147026,
                longitude: -8.620348,
                name: 'R. Dr. Alberto Aires de Gouveia',
                poi_type_id: 2
            },
            {
                // 103
                address: 'R. António Carneiro, 4300 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.149103,
                longitude: -8.593615,
                name: 'R. António Carneiro',
                poi_type_id: 2
            },
            {
                // 104
                address: 'R. do Prof. António Cruz, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.174876,
                longitude: -8.589014,
                name: 'R. do Prof. António Cruz',
                poi_type_id: 2
            },
            {
                // 105
                address: 'R. Henrique Medina, 4250 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.174085,
                longitude: -8.626097,
                name: 'R. Henrique Medina',
                poi_type_id: 2
            },
            {
                // 106
                address: 'R. Henrique Pousão, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.162739,
                longitude: -8.637735,
                name: 'R. Henrique Pousão',
                poi_type_id: 2
            },
            {
                // 107
                address: 'R. Joaquim Vitorino Ribeiro, 4350 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.168723,
                longitude: -8.583355,
                name: 'R. Joaquim Vitorino Ribeiro',
                poi_type_id: 2
            },
            {
                // 108
                address: 'R. Jorge Gigante, Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.175718,
                longitude: -8.616518,
                name: 'R. Jorge Gigante',
                poi_type_id: 2
            },
            {
                // 109
                address: 'R. José Teixeira Barreto, 4300 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.154344,
                longitude: -8.594435,
                name: 'R. José Teixeira Barreto',
                poi_type_id: 2
            },
            {
                // 110
                address: 'R. Júlio de Brito, 4150 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.154899,
                longitude: -8.667430,
                name: 'R. Júlio de Brito',
                poi_type_id: 2
            },
            {
                // 111
                address: 'R. Mário Bonito, Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.176358,
                longitude: -8.615067,
                name: 'R. Mário Bonito',
                poi_type_id: 2
            },
            {
                // 112
                address: 'R. Marques de Oliveira, 4250 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.169280,
                longitude: -8.624661,
                name: 'R. Marques de Oliveira',
                poi_type_id: 2
            },
            {
                // 113
                address: 'R. Mte. Guilherme Camarinha, 4200 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.184645,
                longitude: -8.602407,
                name: 'R. Mte. Guilherme Camarinha',
                poi_type_id: 2
            },
            {
                // 114
                address: 'R. Vieira Portuense, 4050 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.162150,
                longitude: -8.628169,
                name: 'R. Vieira Portuense',
                poi_type_id: 2
            },
            {
                // 115
                address: 'R. Eng. Ezequiel de Campos, 4100 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.172370,
                longitude: -8.651875,
                name: 'R. Eng. Ezequiel de Campos',
                poi_type_id: 2
            },
            // Places
            {
                // 116
                address: 'R. Dr. Roberto Frias, 4200-464 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.177929,
                longitude: -8.597834,
                name: 'Faculdade de Engenharia da Universidade do Porto',
                poi_type_id: 2
            },
            {
                // 117
                address: 'R. Nova da Alfândega, 4400 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.143022,
                longitude: -8.621665,
                name: 'Alfândega do Porto',
                poi_type_id: 2
            },
            {
                // 118
                address: 'Ponte Luís I, Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.139925,
                longitude: -8.609411,
                name: 'Ponte Luís I, Porto',
                poi_type_id: 2
            },
            {
                // 119
                address: 'Rua Dr. Abel Salazar, s/n, 4465-012 S. Mamede de Infesta',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.200729780141224,
                longitude: -8.613021075725555,
                name: 'Casa Museu Abel Salazar',
                poi_type_id: 2
            },
            {
                // 120
                address: 'Dr. Augusto Nobre, Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.1635497,
                longitude: -8.6863686,
                name: 'Espaço Zoológico Marítimo',
                poi_type_id: 2
            },
            {
                // 121
                address: 'R. Dr. Plácido da Costa 91, 4200-450 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.178544,
                longitude: -8.600238,
                name: 'FADEUP',
                poi_type_id: 2
            },
            {
                // 122
                address: 'Rua do Campo Alegre 1021/1055, 4169-007 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.151825,
                longitude: -8.636602,
                name: 'FCUP',
                poi_type_id: 2
            },
            {
                // 123
                address: 'R. Jorge de Viterbo Ferreira 228, 4050-313 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.147587,
                longitude: -8.6243802,
                name: 'FFUP',
                poi_type_id: 2
            },
            {
                // 124
                address: '4050-039 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.155263,
                longitude: -8.620654,
                name: 'Museu da Faculdade de Farmácia do Porto',
                poi_type_id: 2
            },
            {
                // 125
                address: 'Praça Marquês de Pombal, nº30-44, 4000-390 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.160725,
                longitude: -8.604092,
                name: 'Fundação Instituto Arquitecto José Marques da Silva',
                poi_type_id: 2
            },
            {
                // 126
                address: 'Alameda Prof. Hernâni Monteiro, 4200-319 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.181159,
                longitude: -8.601503,
                name: 'FMUP',
                poi_type_id: 2
            },
            {
                // 127
                address: 'R. Jorge de Viterbo Ferreira 228, 4050-343 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.1471952,
                longitude: -8.6245894,
                name: 'ICBAS',
                poi_type_id: 2
            },
            {
                // 128
                address: 'Rua do Campo Alegre 1191, 4150-173 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.153650,
                longitude: -8.6422468,
                name: 'Jardim Botânico do Porto',
                poi_type_id: 2
            },
            {
                // 129
                address: 'Praça de Gomes Teixeira, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146552,
                longitude: -8.615617,
                name: 'Reitoria',
                poi_type_id: 2
            },
            {
                // 130
                address: 'Praça de Gomes Teixeira, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146810,
                longitude: -8.615904,
                name: 'MHNCUP',
                poi_type_id: 2
            },
            {
                // 131
                address: 'Av. de Rodrigues de Freitas 265, 4049-021 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145629,
                longitude: -8.600817,
                name: 'FBAUP',
                poi_type_id: 2
            },
            {
                // 132
                address: 'Praça de Gomes Teixeira 10, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.147077,
                longitude: -8.615628,
                name: 'Praça Gomes Teixeira - Praça dos Leões',
                poi_type_id: 2
            },
            {
                // 133
                address: 'Praça de Gomes Teixeira 10, 4050-011 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.147296,
                longitude: -8.616321,
                name: 'Igreja da Venerável Ordem Terceira de Nossa Senhora do Carmo - Igreja do Carmo',
                poi_type_id: 2
            },
            {
                // 134
                address: 'Praça de Parada Leitão 45, 4050-011 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146902,
                longitude: -8.616401,
                name: 'Café Âncora D\'Ouro - Café Piolho',
                poi_type_id: 2
            },
            {
                // 135
                address: 'Largo Prof. Abel Salazar 4099-001 PORTO',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146995,
                longitude: -8.618565,
                name: 'Hospital de Santo António',
                poi_type_id: 2
            },
            {
                // 136
                address: 'R. Campo dos Mártires da Pátria 4099, 4050-076 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145227,
                longitude: -8.617723,
                name: 'Palácio da Justiça - Tribunal da Relação do Porto',
                poi_type_id: 2
            },
            {
                // 137
                address: 'Jardim João Chagas - Jardim da Cordoaria, 4050-366 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145773,
                longitude: -8.616704,
                name: 'Jardim João Chagas - Jardim da Cordoaria',
                poi_type_id: 2
            },
            {
                // 138
                address: 'Largo Amor de Perdição, 4050-008 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.144772,
                longitude: -8.615884,
                name: 'Antiga Cadeia da Relação - Centro Português de Fotografia',
                poi_type_id: 2
            },
            {
                // 139
                address: 'R. de São Filipe de Nery, 4050-546 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145807,
                longitude: -8.613981,
                name: 'Igreja e Torre dos Clérigos',
                poi_type_id: 2
            },
            {
                // 140
                address: 'Rua das Carmelitas, nº151, 4050-162 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146253,
                longitude: -8.614867,
                name: 'Praça de Lisboa - Passeio dos Clérigos',
                poi_type_id: 2
            },
            {
                // 141
                address: 'R. das Carmelitas 144, 4050-161 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146835,
                longitude: -8.614853,
                name: 'Livraria Chardron - Livraria Lello & Irmão',
                poi_type_id: 2
            },
            {
                // 142
                address: 'Foz do Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146642,
                longitude: -8.658198,
                name: 'Foz',
                poi_type_id: 2
            },
            {
                // 143
                address: 'Porto Ribeira',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.140615,
                longitude: -8.613095,
                name: 'Porto Ribeira',
                poi_type_id: 2
            },
            {
                // 144
                address: 'Largo de Aviz - Santa Marinha, Vila Nova de Gaia, Norte, 4430-329, 4430-329',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.138249,
                longitude: -8.607804,
                name: 'Serra do Pilar',
                poi_type_id: 2
            },
            {
                // 145
                address: 'Passeio de São Lázaro 33, 4000-098 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145936,
                longitude: -8.602697,
                name: 'Jardim de São Lázaro',
                poi_type_id: 2
            },
            {
                // 146
                address: 'R. do Passeio Alegre 828, 4150-570 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.148633,
                longitude: -8.670534,
                name: 'Passeio Alegre/ Foz Velha',
                poi_type_id: 2
            },
            {
                // 147
                address: 'Av. de Rodrigues de Freitas 265, 4049-021 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145295,
                longitude: -8.600536,
                name: 'Jardim da Faculdade de Belas Artes da Universidade do Porto',
                poi_type_id: 2
            },
            {
                // 148
                address: 'Rua das Estrelas, Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.149948,
                longitude: -8.641652,
                name: 'Jardim do Clube Universitário do Porto',
                poi_type_id: 2
            },
            {
                // 149
                address: 'Largo da Ponte D. Luiz, 4400-111 Vila Nova de Gaia',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.139004,
                longitude: -8.609186,
                name: 'Jardim da Casa Burmester',
                poi_type_id: 2
            },
            // Objects
            {
                // 150
                address: 'Rua Dr. Abel Salazar, s/n, 4465-012 S. Mamede de Infesta',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'A pintura Poente na Serra (Gondar-Minho) ” de Abel Salazar é realizada a óleo sob madeira, tal como grande parte das suas pinturas. É datada de 1919 sendo a mais antiga que se conhece do artista. Através duma perspetiva aérea apresenta uma zona montanhosa da Serra em tons de verdes e castanhos. A pincelada apresenta-se vigorosa e com camadas de tinta expressivas num primeiro plano, assumindo-se vaporosa no plano de fundo. Está técnica remete o observador para uma estética impressionista, assim como outras paisagens de Abel Salazar. As paisagens foram de facto um dos primeiros temas que abordou na pintura e neste contexto focou-se principalmente nas terras portuguesas.',
                latitude: 41.200728,
                longitude: -8.613088,
                name: 'Poente na Serra – Gondar – Minho”, Óleo s/ Madeira 23x35 cm',
                parent_id: 119,
                poi_type_id: 3
            },
            {
                //  151
                address: 'Rua Dr. Abel Salazar, s/n, 4465-012 S. Mamede de Infesta',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Neste desenho realizado em 1931 por Abel Salazar a tinta da china é apresentada uma cena realizada em esboço rápido que invoca de imediato a facilidade com que o artista concretiza composições de cariz anatómico, derivada das suas competências de observação precisa e síntese. As figuras estão inseridas num momento do quotidiano, numa atividade cultural, que se presume ser uma sala de teatro ou cinema. Isto nota-se pela orientação direcional das figuras, como se estivessem á espera de algo prestes a ser apresentado. O artista assim demonstra uma noção de humanidade nas figuras populares que retrata.',
                latitude: 41.200648,
                longitude: -8.613094,
                name: '“Perspetiva de cinema” , Tinta da china s/ papel 22x33 cm',
                parent_id: 119,
                poi_type_id: 3
            },
            {
                // 152
                address: 'Rua Dr. Abel Salazar, s/n, 4465-012 S. Mamede de Infesta',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Este objeto pertence a um conjunto de características semelhantes inserido na investigação da estrutura e evolução do ovário de coelha, que era o seu objeto de estudo predileto. Desta forma conduziu experiências de coloração e cortes de ovário, nas quais encontra um fio condutor para fazer a distinção das estruturas das células e dos tecidos que analisa. E assim, recorre ao tingimento com corantes específicos eletivos, que só tingem alguns pormenores de estrutura, ou corando só os núcleos celulares.',
                latitude: 41.200631,
                longitude: -8.612973,
                name: 'Preparação histológica – Ovário de coelha',
                parent_id: 119,
                poi_type_id: 3
            },
            {
                // 153
                address: 'R. Dr. Plácido da Costa 91, 4200-450 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Modalidade: Atletismo (Lançamentos). Data: início da década de 70. Material: madeira e metal. Dimensão: 18 cm. Peso: 1 kg. Clube Escola do Movimento.',
                latitude: 41.178112,
                longitude: -8.601523,
                name: 'Disco',
                parent_id: 121,
                poi_type_id: 3
            },
            {
                // 154
                address: 'R. Dr. Plácido da Costa 91, 4200-450 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Modalidade: Ginástica. Data: década de 50/70. Material: madeira, pele e metal. Dimensão: 50 x 49 x24 cm. Utilizada para ser adaptada na trave sueca. Gabinete de Ginástica da FASEUP.',
                latitude: 41.177783,
                longitude: -8.600057,
                name: 'Sela',
                parent_id: 121,
                poi_type_id: 3
            },
            {
                //  155
                address: 'R. Dr. Roberto Frias, 4200-464 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Desenvolvido na 2ª metade do séc. XVIII, o círculo de reflexão veio suplantar o octante e o sextante em precisão, com o objetivo de possibilitar determinações rigorosas da longitude no mar. Estas determinações eram feitas a partir de tabelas elaboradas com base em medidas, necessariamente precisas, das distâncias angulares entre a lua e certas estrelas, de acordo com o chamado “método lunar”, rival do “método cronométrico” O princípio de funcionamento consiste na conjugação da imagem de dois objetos, sendo que uma delas é obtida por dupla reflexão, agora sobre o arco (360º). Desconhece-se a sua data de aquisição, sendo mencionado pela primeira vez na Relação de mobília, utensílios e outros objetos existentes na Academia Politécnica no ano letivo de 1872-73, da autoria do seu guarda-mor. Com funções associadas à prática da aula de Náutica, o círculo de reflexão tipo "Borda" é como um sextante cujo o limbo é um círculo completo, permitindo fazer observações cruzadas devido ao afastamento do espelho pequeno, sendo esta possibilidade a principal inovação do instrumento.',
                latitude: 41.178069,
                longitude: -8.597379,
                name: 'Círculo de reflexão (sistema Borda). Troughton & Simms',
                parent_id: 1,
                poi_type_id: 3
            },
            {
                // 156
                address: 'R. Dr. Roberto Frias, 4200-464 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Inserida cronologicamente entre a conceção da 1ª máquina a vapor de Thomas Newcomen e John Calley em 1705 e a introdução da mesma no contexto português em 1819, destaca-se a melhorada máquina de James Watt. Este modelo didático foi utilizado desde de 1888, até aos anos sessenta do século XX. Servindo de apoio ao ensino das máquinas térmicas e da tecnologia a vapor. O modelo encontra-se em bom estado e está protegido por uma vitrine. Encontra-se com algumas peças em falta e com espaços abertos para que os alunos possam ver os componentes por dentro da máquina a trabalhar, ao mesmo tempo que o professor dá à manivela. A constante evolução do programa desta disciplina e da própria faculdade de engenharia, levará à exclusão do manuseamento deste modelo passando a ser exposto juntamente com as restantes 23 peças da coleção do fabricante J. Schröder.',
                latitude: 41.177984,
                longitude: -8.596955,
                name: 'Modelo didático de maquina a vapor de James Watt, J. Schr der',
                parent_id: 116,
                poi_type_id: 3
            },
            {
                // 157
                address: 'R. Dr. Roberto Frias, 4200-464 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Maquete em acrílico com base em madeira, atualmente exposta na ala dedicada a Edgar Cardoso, antigo aluno de Civil da Faculdade de Engenharia da Universidade do Porto. Modelo didático da máquina a vapor de James Watt. Departamento da engenharia  mecânica. Fotografia tirada por Patrícia Duarte no dia 01/05/2017 Profissionalmente foi docente no Instituto Superior Técnico, realizando uma vasta quantidade de obras, na qual a ponte de S. João, foi o seu último trabalho realizado quando este já tinha 70 anos em 1984. Relativamente ao modelo, este foi utilizado no ensino para prevenção de catástrofes naturais, uma vez que o engenheiro através de instrumentos mecânicos construídos pelo próprio, permitia uma simulação de turbulências, como podemos constatar na fita cola presente na maquete.',
                latitude: 41.177874,
                longitude: -8.596057,
                name: 'Modelo de primeira solução para nova ponte ferroviária utilizando o cimbre da Ponte da Arrábida. Edgar Cardoso',
                parent_id: 116,
                poi_type_id: 3
            },
            {
                // 158
                address: '4050-039 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'A máquina de comprimidos, atualmente presente no átrio 3 da Faculdade de Farmácia da Universidade do Porto, foi parte da indemnização que a Alemanha teve de suportar na sequência da Primeira Guerra Mundial (1914-1918). Assim, a sua cronologia enquadrar-se-á necessariamente no segundo quartel da primeira metade do século XX e, possivelmente, será anterior a 1918.',
                latitude: 41.155019,
                longitude: -8.620654,
                name: 'A máquina de comprimidos',
                parent_id: 124,
                poi_type_id: 3
            },
            {
                // 159
                address: '4050-039 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.155150,
                longitude: -8.620736,
                name: 'Moinho',
                parent_id: 124,
                poi_type_id: 3
            },
            {
                // 160
                address: '4050-039 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'A pipeta, atualmente presente no Museu da Faculdade de Farmácia da Universidade do Porto (Gabinete 24-303), possui símbolos associados ao nazismo e, por isso, a sua cronologia será necessariamente anterior a 1945. A pipeta, em vidro transparente, apresenta na dilatação da parte média uma águia e uma cruz suástica, associadas ao nazismo. Possui ainda, na mesma área, a inscrição “5 CCM A 20o C”.',
                latitude: 41.155125,
                longitude: -8.620399,
                name: 'Pipeta',
                parent_id: 124,
                poi_type_id: 3
            },
            {
                // 161
                address: 'Praça Marquês de Pombal, nº30-44, 4000-390 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'O arquiteto surge representado de perfil, pose também associada ao referencial clássico.  Observa-se um registo rápido, com liberdade de expressão e abertura para uma forma de retratar mais expressionista. A escolha de linhas diluídas não permite identificar a natureza da indumentária, ocultando qualquer referência a vestuário ou elemento que estabeleça relação com um tempo específico. Os movimentos das pinceladas são mais notórios na zona dos olhos, da barba e das orelhas.',
                latitude: 41.160832,
                longitude: -8.604090,
                name: 'Retrato Marques da Silva - Veloso Salgado, Óleo s/ Tela, 61 x 50 cm, 1890',
                parent_id: 125,
                poi_type_id: 3
            },
            {
                // 162
                address: 'Praça Marquês de Pombal, nº30-44, 4000-390 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'A maquete, embora uma versão simplificada do monumento, permite compreender uma composição tripartida que revive a Guerra Peninsular (Invasões Francesas). Os grupos escultóricos distribuídos pela base representam cenas de artilharia enaltecendo a importante participação do povo e o desastre da ponte das Barcas, sendo constante a presença do elemento feminino. No remate, a representação do desfecho da luta, com a vitória da força popular, representada pelo leão, sobre a  águia napoleónica.',
                latitude: 41.160673,
                longitude: -8.603899,
                name: 'Povo e Tropa” - Maquete para o Monumento aos Heróis da Guerra Peninsular, Barata Feyo (Atr.) [1947]',
                parent_id: 125,
                poi_type_id: 3
            },
            {
                // 163
                address: 'Praça Marquês de Pombal, nº30-44, 4000-390 Porto, Portugal',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Da maqueta, apenas a base pertence ao original. A Casa sobre o mar materializa uma reflexão sobre o Regionalismo Crítico, procurando integrar a arquitectura moderna nas paisagens existentes através da tradição dos materiais. Propondo como localização a Foz do Douro, Távora reflete sobre a aplicação do estilo internacional, adaptando-o. Descreve então uma habitação rodeada por um friso de azulejos, sustentada por uma estrutura de betão cravada no terreno rochoso e avançada em consola sobre o mar.',
                latitude: 41.160750,
                longitude: -8.604007,
                name: 'Maquete da Casa Sobre o Mar - Fernando Távora. Projeto para obtenção C.O.D.A., 41x 66x42 cm, [1952]',
                parent_id: 125,
                poi_type_id: 3
            },
            {
                // 164
                address: 'Alameda Prof. Hernâni Monteiro, 4200-319 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Ao todo no Museu Maximiano existem 10 quadros deste género, todos da autoria de Enrique Zofio, alusivos às várias fases da gravidez. As esculturas são ao mesmo tempo fonte de conhecimento sobre uma prática obstétrica, manual além de instrumental bem como estemunho da evolução formal do fórceps. A que vemos na fotografia representa a fase final do parto e simula situações reais de gestação e parto.',
                latitude: 41.180731,
                longitude: -8.602471,
                name: 'Mulher grávida e instrumento médico. Peça de Enrique Zófio',
                parent_id: 126,
                poi_type_id: 3
            },
            {
                // 165
                address: 'Alameda Prof. Hernâni Monteiro, 4200-319 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'A fotografia apresenta um estojo de amputação do século XVIII forrado a pele de peixe e flanela vermelha, composto com os instrumentos necessários ao exercício da amputação em aço com cabo de madeira. Acredita-se que o estojo que pertencera ao cirurgião José Marcelino Peres Pinto tenha uma origem Ibérica, embora, não haja nenhuma marca que remeta para um fabricante e consequentemente para uma localização geográfica. O Estojo vazio demonstra que havia um conhecimento por parte do artesão que o confecionava, sobre os instrumentos usados durante a cirurgia, uma vez que o estojo assume a forma dos mesmos de modo a melhor acomodá-los. Os materiais orgânicos dos quais alguns instrumentos eram feitos e a ausência da esterilização dos mesmo após as cirurgias (numa época anterior à descoberta do micróbio) contribuíram para a deterioração dos instrumentos o que levou a que algumas peçasse perdessem para sempre.',
                latitude: 41.180417,
                longitude: -8.601233,
                name: 'Estojo instrumentos médicos',
                parent_id: 126,
                poi_type_id: 3
            },
            {
                // 166
                address: 'Alameda Prof. Hernâni Monteiro, 4200-319 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Este busto representa uma lesão dermatológica primária: dermite purpúrica em evolução hemosidérica. Pertenceu ao antigo Museu de Anatomia Patológica, tendo sido uma oferta feita ao Museu pelo Professor Daniel Serrão em 1971. Modelos de cera anatómicos foram introduzidos em Florença, no século XVI e no século XVII eram preferidos ao desenho anatómico enquanto modelos em três dimensões destinados ao treino de estudantes de medicina, na impossibilidade do contacto físico com um paciente portador da patologia.',
                latitude: 41.181179,
                longitude: -8.600084,
                name: 'Rosto em cera',
                parent_id: 126,
                poi_type_id: 3
            },
            {
                // 167
                address: 'R. Jorge de Viterbo Ferreira 228, 4050-343 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146956,
                longitude: -8.624293,
                name: 'Peça anatómica',
                parent_id: 126,
                poi_type_id: 3
            },
            {
                // 168
                address: 'Praça de Gomes Teixeira, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'A Estatueta funerária de Horudja é uma figura mumiforme de faiança esverdeada. Apresenta os membros não individualizados e uma série de detalhes em relevo, sendo estes: o rosto, a pera entrançada, a cabeleira, a corda na mão direita, as mãos e os alviões diferente nas mesmas. Esta escultura conta com uma base pilar dorsal que está assente sobre uma base de madeira não original e apresenta, ainda, uma inscrição hieróglifa com um total de nove linhas horizontais delimitadas. A sua história remonta, segundo o que consta, a uma apreensão de um navio, no Rio Tejo, no decorrer da 1º Guerra Mundial, estando também interligada com a coleção do Museu de Berlim. Existe ainda uma possível tradução da inscrição. As suas dimensões são: 17cm (altura) x 2,60 cm (largura).',
                latitude: 41.146777,
                longitude: -8.615686,
                name: 'Peça da coleção egípcia',
                parent_id: 130,
                poi_type_id: 3
            },
            {
                // 169
                address: 'Praça de Gomes Teixeira, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.146810,
                longitude: -8.615608,
                name: 'Antílope bebé empalhado',
                parent_id: 130,
                poi_type_id: 3
            },
            {
                // 170
                address: 'Praça de Gomes Teixeira, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'A coleção do herbário do Quercus x alvesii Vila-Viçosa et. al.(designação científica) é um exemplar de referência taxonómica para um novo híbrido descoberto na natureza que resultou do cruzamento de duas espécies: carvalhiça e azinheira. Esta nova descoberta teve como nome uma dedicatória ao botânico Paulo Jorge Mendes Alves (1975). Esta amostra insere-se na coleção de Quercus de Herbário do Museu de História Natural e da Ciência da Universidade do Porto e consta na base de uma nova listagem de carvalhos de origem nacional. A sua data de colheita remete para o dia 09 de dezembro de 2015. As suas dimensões são 43cm (altura) x 27cm (largura). Teve como lugar de colheita o Baixo-Alentejo e como coletores Carlos Vila Viçosa e Arlindo Rim.',
                latitude: 41.146575,
                longitude: -8.615974,
                name: 'Quercus',
                parent_id: 130,
                poi_type_id: 3
            },
            {
                // 171
                address: 'Praça de Gomes Teixeira, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'O fonógrafo de Edison além de produzir registos sonoros trouxe uma novidade, relativamente ao que já existia, reproduzir os mesmos. Edison foi o seu inventor e facultou a E. Hardy, um fabricante francês, um modelo da sua invenção para que a partir dela resultassem inúmeros exemplares, apresentados na Exposição Universal de Paris. Neste exemplar em particular temos uma agulha conectada a uma membrana que entra vibração pela atuação do som que sai, posteriormente, por uma corneta. Este fonógrafo permite apenas uma pequena quantidade de reproduções e tem capacidade para entre cinquenta a sessenta palavras.',
                latitude: 41.146697,
                longitude: -8.615836,
                name: 'Fonógrafo de Edison',
                parent_id: 130,
                poi_type_id: 3
            },
            {
                // 172
                address: 'Praça de Gomes Teixeira, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'O galvanómetro é uma bússola de tangentes de género Wiedemann, com numerosas modificações suportadas por D’Arsonval, que tem em vista pesquisas fisiológicas, executando medidas muito variadas, tais como: temperaturas, forças eletromotrizes, intensidades, entre outras medidas. A sua aquisição exprime uma mudança radical no ensino da Física pela Academia Politécnica (1837-1911), dado que este instrumento proporcionou uma medição rigorosa de grandezas físicas e até à época o ensino passava pela simples demonstração qualitativa dos fenómenos.',
                latitude: 41.146790,
                longitude: -8.615382,
                name: 'Galvanómetro diferencial de Wiedemann',
                parent_id: 130,
                poi_type_id: 3
            },
            {
                // 173
                address: 'Praça de Gomes Teixeira, 4050-159 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'O espectrofotómetro de Glan, criado no século XIX por Gustave Hufner e Paul Glan, representa um avanço relativamente ao espectroscópio, isto porque neste instrumento é possível medir a intensidade luminosa, por comparação do espectro de luz sob a análise com o da fonte de luz já caraterizada. Neste espectrofotómetro, a luz de duas fontes luminosas incide numa fenda dividida em duas partes iguais. Cada um destes feixes é, de seguida, levado a atravessar um prisma de Wollaston, emergindo desdobrado em dois feixes ortogonais entre si e com polarizações lineares, obtendo-se quatro imagens da fenda. Ao trazer à correspondência os brilhos dos dois espectros, por rotação de um prisma de Nicai de um ângulo mensurável, é possível obter a informação sobre a intensidade original da luz que se encontra em estudo.',
                latitude: 41.146575,
                longitude: -8.615406,
                name: 'Espectrofotómetro de Glan',
                parent_id: 130,
                poi_type_id: 3
            },
            {
                // 174
                address: 'Av. de Rodrigues de Freitas 265, 4049-021 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Duas faces da ‘Base dos doze deuses’ no Museu do Louvre. Dois frisos de figuras: 3 jovens que dançam no registo inferior, e 3 mulheres empunhando armas e uma lira, junto a 1 personagem masculina coberta com 1 manto, no registo superior (reto) e 2 frisos de figuras: 3 raparigas que dançam, no registo inferior, e 2 casais, com uma esfinge em voo, no registo superior (verso) pedra negra, pena e tinta castanha, furos [picotado] nos contornos das figuras do registo inferior (verso) marca de agua com uma besta dentro de um circulo, cantos cortados. 417x286mm. Mecenato Unicer',
                latitude: 41.145589,
                longitude: -8.600899,
                name: 'Escola romana, S c. XVI Autor desconhecido',
                parent_id: 131,
                poi_type_id: 3
            },
            {
                // 175
                address: 'Av. de Rodrigues de Freitas 265, 4049-021 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145608,
                longitude: -8.600633,
                name: 'Guardador de Sol, 1963. José́ Rodrigues',
                parent_id: 131,
                poi_type_id: 3
            },
            {
                // 176
                address: 'Av. de Rodrigues de Freitas 265, 4049-021 Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 3,
                description: 'Lorem ipsum dolor sit amet, quam ac. Eros nunc arcu. Eleifend sit, lacus amet pede egestas nam in, tempor egestas donec semper cras purus. Massa amet ut, nec in augue suspendisse justo dictum, posuere interdum, arcu iaculis eu egestas ligula vestibulum ipsum, diam risus eu et. Maecenas eget leo vestibulum scelerisque eget, vestibulum massa pulvinar, fringilla velit magna libero quisque sed, sollicitudin tenetur, pellentesque eget placerat ipsum consequat donec enim. Ligula vitae eget sed sed, viverra orci, dui lobortis neque nibh luctus tellus vitae, sit viverra leo est massa sit parturient.',
                latitude: 41.145487,
                longitude: -8.600749,
                name: 'Faina fluvial no Douro, 1962',
                parent_id: 131,
                poi_type_id: 3
            },
            {
                // 176
                address: 'Jardim Botânico da Universidade do Porto',
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 5,
                description: 'O Caranguejo-angular é um item que contem dois exemplares que pertencem a uma coleção que se encontra em modo de preservação. Esta preservação é realizada em meio líquido – Coleção Nápoles. Esta coleção foi inserida no Museu de Zoologia por parte de Augusto Nobre, conceituado cientista, político e professor na Universidade do Porto. Foi também um dos fundadores da zoologia moderna e pioneiro no estudo da Biologia Marinha em Portugal. Uma fração desta coleção foi obtida por parte da Academia Politécnica do Porto â Estação Marítima de Nápoles. Alguns dos recipientes que fazem parte da mesma, constam ter sido trocas realizadas entre Augusto Nobre e Siegfred Jaffé.',
                latitude: 41.146188,
                longitude: -8.615757,
                name: 'Caranguejo-angular',
                parent_id: 130,
                poi_type_id: 3
            }
        ], {});
    }
};
