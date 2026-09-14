import estilos from './Definicoes.module.css'

export function Definicoes (){
    const definicoes = [
        {
        titulo: "Ansiedade",
        texto:"Pessoas com transtornos de ansiedade frequentemente experimentam medo e preocupação intensos e excessivos. Esses sentimentos são tipicamente acompanhados por tensão física e outros sintomas comportamentais e cognitivos. São difíceis de controlar, causam sofrimento significativo e podem durar muito tempo se não forem tratados. Os transtornos de ansiedade interferem nas atividades diárias e podem prejudicar a vida familiar, social, escolar ou profissional da pessoa.",
        cor:"rosa",
        },
        {
        titulo: "Depressão",
        texto:"Pessoas com transtornos de ansiedade frequentemente experimentam medo e preocupação intensos e excessivos. Esses sentimentos são tipicamente acompanhados por tensão física e outros sintomas comportamentais e cognitivos. São difíceis de controlar, causam sofrimento significativo e podem durar muito tempo se não forem tratados. Os transtornos de ansiedade interferem nas atividades diárias e podem prejudicar a vida familiar, social, escolar ou profissional da pessoa.",
        cor: "roxo",
        },
        {
        titulo: "Saúde Mental",
        texto:"Pessoas com transtornos de ansiedade frequentemente experimentam medo e preocupação intensos e excessivos. Esses sentimentos são tipicamente acompanhados por tensão física e outros sintomas comportamentais e cognitivos. São difíceis de controlar, causam sofrimento significativo e podem durar muito tempo se não forem tratados. Os transtornos de ansiedade interferem nas atividades diárias e podem prejudicar a vida familiar, social, escolar ou profissional da pessoa.",
        cor: "roxo",
    },
    {
        titulo: "Raiva",
        texto:"Pessoas com transtornos de ansiedade frequentemente experimentam medo e preocupação intensos e excessivos. Esses sentimentos são tipicamente acompanhados por tensão física e outros sintomas comportamentais e cognitivos. São difíceis de controlar, causam sofrimento significativo e podem durar muito tempo se não forem tratados. Os transtornos de ansiedade interferem nas atividades diárias e podem prejudicar a vida familiar, social, escolar ou profissional da pessoa.",
        cor: "rosa",
    },
     {
        titulo: "Drogas",
        texto:"Pessoas com transtornos de ansiedade frequentemente experimentam medo e preocupação intensos e excessivos. Esses sentimentos são tipicamente acompanhados por tensão física e outros sintomas comportamentais e cognitivos. São difíceis de controlar, causam sofrimento significativo e podem durar muito tempo se não forem tratados. Os transtornos de ansiedade interferem nas atividades diárias e podem prejudicar a vida familiar, social, escolar ou profissional da pessoa.",
        cor: "rosa",
    },
     {
        titulo: "Bullying",
        texto:"Pessoas com transtornos de ansiedade frequentemente experimentam medo e preocupação intensos e excessivos. Esses sentimentos são tipicamente acompanhados por tensão física e outros sintomas comportamentais e cognitivos. São difíceis de controlar, causam sofrimento significativo e podem durar muito tempo se não forem tratados. Os transtornos de ansiedade interferem nas atividades diárias e podem prejudicar a vida familiar, social, escolar ou profissional da pessoa.",
        cor: "roxo",
    },
     {
        titulo: "Vicio e Dependência",
        texto:"Pessoas com transtornos de ansiedade frequentemente experimentam medo e preocupação intensos e excessivos. Esses sentimentos são tipicamente acompanhados por tensão física e outros sintomas comportamentais e cognitivos. São difíceis de controlar, causam sofrimento significativo e podem durar muito tempo se não forem tratados. Os transtornos de ansiedade interferem nas atividades diárias e podem prejudicar a vida familiar, social, escolar ou profissional da pessoa.",
        cor: "roxo",
    },
    
    ];

    return(
    <div className={estilos.container}>
              <section className={estilos.conteudo}>

           <h2 className={estilos.titulo1}>
        Biblioteca de Conteúdos/Definições
      </h2>
      <div className={estilos.grid}>
        {definicoes.map((definicao) => (
            <div
            key={definicao.titulo}
            className={`${estilos.card} ${
                definicao.cor === "rosa" ? estilos.rosa : estilos.roxo
            }`}
            >
                <div className={estilos.info}>
                    <h2>{definicao.titulo}</h2>
                    <p>{definicao.texto}</p>

                </div>

            </div>
        ))}
      </div>
          </section>
    </div>
    )
}