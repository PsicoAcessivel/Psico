import estilos from './Referencias.module.css'

export function Referencias() {
    const referencias = [
        {
            tema: "Uso de álcool e drogas",
            autor: "ALCOHOL AND DRUG FOUNDATION",
            titulo: "Understanding drug and alcohol addiction (dependence)",
            ano: "2025",
            link: "https://adf.org.au/insights/understanding-aod-dependence/",
        },
        {
            tema: "Transtornos mentais e diagnósticos diversos",
            autor: "AMERICAN PSYCHIATRIC ASSOCIATION",
            titulo: "Manual diagnóstico e estatístico de transtornos mentais: DSM-5-TR. 5. ed.",
            ano: "2022",
            link: "https://books.google.com.br/books?id=QL4rDAAAQBAJ&printsec=frontcover&hl=pt-BR#v=onepage&q&f=false",
        },
        {
            tema: "Saúde mental e a desinformação",
            autor: "AMERICAN PSYCHOLOGICAL ASSOCIATION",
            titulo: "Misinformation and mental health",
            ano: "[s.d.]",
            link: "https://www.apa.org/topics/journalism-facts/misinformation-mental-health",
        },
        {
            tema: "Saúde mental e controle da raiva",
            autor: "AMERICAN PSYCHOLOGICAL ASSOCIATION",
            titulo: "Anger",
            ano: "2012",
            link: "https://www.apa.org/news/press/releases/2012/05/anger",
        },
        {
            tema: "Desigualdade no acesso à saúde mental",
            autor: "BALTAZAR, Maria Luísa Caetano",
            titulo: "Desigualdade no acesso à saúde mental em crianças e adolescentes: revisão da bibliografia",
            ano: "2024",
            link: "http://hdl.handle.net/10400.5/119170",
        },
        {
            tema: "Crianças, adolescentes e redes sociais",
            autor: "BUTCHER, Isabel",
            titulo: "86% de crianças e adolescentes usuários de Internet possuem perfil em redes sociais",
            ano: "2023",
            link: "https://www.nic.br/noticia/na-midia/86-de-criancas-e-adolescentes-usuarios-de-internet-possuem-perfil-em-redes-sociais/",
        },
        {
            tema: "Telemedicina e telessaúde",
            autor: "CHAO, L W",
            titulo: "Telemedicina e Telessaúde – Um panorama no Brasil",
            ano: "2008",
            link: "#",
        },
        {
            tema: "Pensamentos e saúde mental",
            autor: "CNN BRASIL",
            titulo: "Cinco passos para parar de “remoer” seus pensamentos",
            ano: "2021",
            link: "https://www.cnnbrasil.com.br/saude/cinco-passos-para-parar-de-remoer-seus-pensamentos/",
        },
        {
            tema: "Bullying",
            autor: "COLÉGIO ELO",
            titulo: "Bullying: saiba o que fazer se você for vítima",
            ano: "2021",
            link: "https://colegioelo.com.br/bullying-o-que-fazer/",
        },
        {
            tema: "Acesso à informação na internet",
            autor: "COMITÊ GESTOR DA INTERNET NO BRASIL (CGI.br)",
            titulo: "Plataformas da internet são o principal meio de acesso à informação entre brasileiros e superam rádio e TV, aponta nova pesquisa",
            ano: "2024",
            link: "https://www.cgi.br/noticia/releases/plataformas-da-internet-sao-o-principal-meio-de-acesso-a-informacao-entre-brasileiros-e-superam-radio-e-tv-aponta-nova-pesquisa/",
        },
        {
            tema: "Pensamentos intrusivos",
            autor: "CONEXA SAÚDE",
            titulo: "Pensamentos intrusivos: definição, causas e como lidar",
            ano: "2026",
            link: "https://www.conexasaude.com.br/blog/pensamentos-intrusivos/",
        },
        {
            tema: "Ansiedade",
            autor: "EINSTEIN, Hospital Israelita Albert",
            titulo: "6 dicas para aprender a lidar com uma crise de ansiedade (e como evitá-la)",
            ano: "2025",
            link: "https://www.einstein.br/n/vida-saudavel/6-dicas-para-aprender-a-lidar-com-uma-crise-de-ansiedade-e-como-evita-la",
        },
        {
            tema: "Bullying e cyberbullying",
            autor: "EINSTEIN, Hospital Israelita Albert",
            titulo: "Como identificar e ajudar uma vítima de bullying ou cyberbullying?",
            ano: "2025",
            link: "https://www.einstein.br/n/vida-saudavel/como-identificar-e-ajudar-uma-vitima-de-bullying-ou-cyberbullying",
        },
        {
            tema: "Saúde mental de adolescentes",
            autor: "FREIRE, Tâmara",
            titulo: "IBGE alerta para quadro preocupante na saúde mental de adolescentes",
            ano: "2026",
            link: "https://agenciabrasil.ebc.com.br/saude/noticia/2026-03/ibge-alerta-para-quadro-preocupante-na-saude-mental-de-adolescentes",
        },
        {
            tema: "Como lidar com críticas",
            autor: "GILARDI, Daniela",
            titulo: "Como lidar com críticas sem deixar que elas te desequilibrem",
            ano: "2022",
            link: "https://www.psicologoeterapia.com.br/blog/como-lidar-com-criticas/",
        },
        {
            tema: "Hábitos e saúde mental",
            autor: "INSTITUTO DE LONGEVIDADE",
            titulo: "Hábitos para ter uma mente saudável: descubra 7 práticas para proteger o cérebro",
            ano: "2025",
            link: "https://institutodelongevidade.org/longevidade-e-saude/saude-mental/habitos-para-ter-uma-mente-saudavel",
        },
        {
            tema: "Invalidação emocional",
            autor: "INSTITUTO DE PSIQUIATRIA DO PARANÁ",
            titulo: "Invalidação emocional e suas consequências",
            ano: "2018",
            link: "https://institutodepsiquiatriapr.com.br/blog/invalidacao-emocional",
        },
        {
            tema: "Acesso ao tratamento em saúde mental",
            autor: "MARTINS, Ana Lúcia",
            titulo: "Apenas 5% dos brasileiros fazem terapia, mas 1 a cada 5 usam medicamentos, mostra pesquisa inédita sobre saúde mental",
            ano: "2023",
            link: "https://oglobo.globo.com/",
        },
        {
            tema: "Controle da raiva",
            autor: "MAYO CLINIC",
            titulo: "Anger management: 10 tips to tame your temper",
            ano: "2024",
            link: "https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/anger-management/art-20045434",
        },
        {
            tema: "Desinformação em saúde",
            autor: "NAN, Xiaoli",
            titulo: "Por que as pessoas acreditam em desinformação sobre saúde e quem está em risco? Uma revisão sistemática das diferenças individuais na suscetibilidade à desinformação em saúde",
            ano: "2022",
            link: "https://www.sciencedirect.com/science/article/abs/pii/S0277953622007043?via%3Dihub#references",
        },
        {
            tema: "Promoção da saúde mental na adolescência",
            autor: "PROMOÇÃO DA SAÚDE MENTAL",
            titulo: "Promoção da saúde mental: cuidados para adolescentes com sintomas depressivos em uma clínica escolar",
            ano: "2022",
            link: "https://rsdjournal.org/rsd/article/view/25980",
        },
        {
            tema: "Ansiedade",
            autor: "PUCRS",
            titulo: "5 ações diárias para reduzir a ansiedade",
            ano: "2024",
            link: "https://portal.pucrs.br/noticias/pesquisa/5-dicas-acoes-diarias-para-reduzir-a-ansiedade/",
        },
        {
            tema: "Comunicação familiar",
            autor: "PUCRS",
            titulo: "Comunicação familiar: estratégias essenciais para fortalecer laços",
            ano: "2025",
            link: "https://online.pucrs.br/blog/comunicacao-familiar-estrategias",
        },
        {
            tema: "Redes sociais e saúde mental",
            autor: "REIS, Silvana",
            titulo: "TikTok e saúde mental: como os conteúdos da rede promovem desinformação sobre temas como TDAH, TEA e outros",
            ano: "2026",
            link: "https://g1.globo.com/saude/noticia/2026/04/10/tiktok-e-saude-mental-como-os-conteudos-da-rede-promovem-desinformacao-sobre-temas-como-tdah-tea-e-outros.ghtml",
        },
        {
            tema: "Barreiras de acesso à saúde mental",
            autor: "SANTOS, Isabelle Rebouças dos",
            titulo: "Descrição de uso de serviços e barreiras de acesso a tratamento em saúde mental entre crianças e adolescentes de um hospital da cidade de São Paulo",
            ano: "2021",
            link: "#",
        },
        {
            tema: "Vulnerabilidade social e pobreza",
            autor: "SANTOS, Micaela",
            titulo: "Brasil chega aos menores níveis de pobreza e extrema pobreza da série histórica do IBGE",
            ano: "2025",
            link: "https://g1.globo.com/economia/noticia/2025/12/03/brasil-extrema-pobreza-da-serie-historica-do-ibge.ghtml",
        },
        {
            tema: "Fake news e saúde mental",
            autor: "SILVA, Daíse Tavares da",
            titulo: "Relação entre fake news e saúde mental na juventude: uma revisão de escopo",
            ano: "2024",
            link: "#",
        },
        {
            tema: "Vulnerabilidade social e saúde mental",
            autor: "SOUZA, Larissa et al.",
            titulo: "Crianças e adolescentes em vulnerabilidade social: bem-estar, saúde mental e participação em educação",
            ano: "2019",
            link: "https://www.scielo.br/j/cadbto/a/yLRT3x4JrDbH6T4djNw95DR/?lang=pt",
        },
        {
            tema: "Relaxamento e qualidade do sono",
            autor: "TOMAZ, Túlio",
            titulo: "7 técnicas de relaxamento para melhorar a qualidade do sono",
            ano: "2025",
            link: "https://dtuliotomaz.com/blog/7-tecnicas-de-relaxamento-para-melhorar-a-qualidade-do-sono/",
        },
        {
            tema: "Hábitos saudáveis e saúde mental",
            autor: "TOMAZ, Túlio",
            titulo: "Hábitos saudáveis para saúde mental: 10 dicas para o seu dia a dia",
            ano: "2025",
            link: "https://dtuliotomaz.com/blog/habitos-saudaveis-para-saude-mental-10-dicas-para-o-seu-dia-a-dia/",
        },
        {
            tema: "Saúde mental de crianças e adolescentes",
            autor: "UNITED NATIONS CHILDREN’S FUND (UNICEF)",
            titulo: "The State of the World’s Children 2021: On My Mind – Promoting, protecting and caring for children’s mental health",
            ano: "2021",
            link: "https://www.unicef.org/reports/state-worlds-children-2021",
        },
        {
            tema: "Drogas",
            autor: "UNITED NATIONS",
            titulo: "Drugs",
            ano: "[s.d.]",
            link: "https://www.un.org/en/global-issues/drugs",
        },
        {
            tema: "Transtornos de ansiedade",
            autor: "WORLD HEALTH ORGANIZATION",
            titulo: "Anxiety disorders",
            ano: "2025",
            link: "https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders",
        },
        {
            tema: "Depressão",
            autor: "WORLD HEALTH ORGANIZATION",
            titulo: "Depressive disorder (depression)",
            ano: "2025",
            link: "https://www.who.int/news-room/fact-sheets/detail/depression",
        },
        {
            tema: "Saúde mental",
            autor: "WORLD HEALTH ORGANIZATION",
            titulo: "Mental health",
            ano: "2025",
            link: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
        },
        {
            tema: "Saúde mental de adolescentes",
            autor: "WORLD HEALTH ORGANIZATION",
            titulo: "Mental health of adolescents",
            ano: "2025",
            link: "https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health",
        },
    ];

    return (
        <div className={estilos.container}>

            <section className={estilos.conteudo}>

                <h1 className={estilos.titulo1}>
                    Referências
                </h1>

                <p className={estilos.descricao}>
                    Esta página é dedicada a fornecer as referências
                    bibliográficas utilizadas para embasar o desenvolvimento
                    do projeto e todas as informações fornecidas nas demais
                    partes do site. Todas estão listadas em ordem alfabética
                    e você pode usar os links abaixo de cada referência para
                    acessá-las.
                </p>

                <div className={estilos.referencias}>

                    {referencias.map((referencia) => (
                        <article
                            key={referencia.link}
                            className={estilos.referencia}
                        >

                            <h2>
                                {referencia.tema}
                            </h2>

                            <p className={estilos.autor}>
                                {referencia.autor}
                            </p>

                            <p className={estilos.tituloReferencia}>
                                {referencia.titulo}
                            </p>

                            <p className={estilos.ano}>
                                {referencia.ano}
                            </p>

                            <a
                                href={referencia.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={estilos.link}
                            >
                                Acessar referência →
                            </a>

                        </article>
                    ))}

                </div>

            </section>

        </div>
    )
}