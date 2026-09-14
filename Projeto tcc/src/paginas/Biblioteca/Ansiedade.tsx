import { useState } from "react";
import estilos from "./Ansiedade.module.css";
import { FaHeart } from "react-icons/fa";
import type { Pergunta } from "../../tipos/Pergunta";

export function Ansiedade() {

    const [respostaAberta, setRespostaAberta] = useState(1);

    const perguntas: Pergunta[] = [
        {
            id: 1,
            pergunta: "O que é ansiedade?",
            resposta: `A ansiedade é uma reação natural do corpo diante de situações que causam preocupação, medo ou insegurança. Ela pode acontecer antes de uma prova, uma apresentação ou uma situação nova.

Porém, quando a ansiedade aparece com muita frequência ou começa a atrapalhar a rotina, os estudos, os relacionamentos ou outras atividades, é importante conversar com um adulto de confiança ou buscar ajuda de um profissional da saúde.`
        },

        {
            id: 2,
            pergunta: "Como posso controlar a ansiedade?",
            resposta: `Algumas atitudes podem ajudar a lidar melhor com a ansiedade, como organizar sua rotina, dormir bem, praticar atividades físicas, reservar momentos para descansar e conversar sobre o que você está sentindo com alguém de confiança.

Também é importante lembrar que cada pessoa lida com a ansiedade de uma maneira diferente. Se ela estiver atrapalhando sua vida, procure ajuda de um profissional da saúde.`
        }
    ];

    return (
        <main className={estilos.conteudo}>

         
            <h1>Biblioteca de Conteúdos</h1>

            <section className={estilos.card}>

                {/* Perguntas */}
                <div className={estilos.perguntas}>

                    <div className={estilos.tituloCategoria}>

                        <div className={estilos.iconeCategoria}>
                            <FaHeart />
                        </div>

                        <h2>Ansiedade</h2>

                    </div>

                    {/* Exibe as perguntas */}
                    {perguntas.map((perguntaAtual) => (

                        <div
                            className={estilos.pergunta}
                            key={perguntaAtual.id}
                        >

                            <p>
                                {perguntaAtual.id}. {perguntaAtual.pergunta}
                            </p>

                            <button
                                className={estilos.botaoResposta}
                                onClick={() =>
                                    setRespostaAberta(perguntaAtual.id)
                                }
                            >
                                Ver resposta
                            </button>

                        </div>

                    ))}

                </div>

                <div className={estilos.divisoria}></div>

                {/* Resposta selecionada */}
                <div className={estilos.resposta}>

                    <h3>
                        {respostaAberta}. Resposta:
                    </h3>

                    <p>
                        {
                            perguntas.find(
                                (perguntaAtual) =>
                                    perguntaAtual.id === respostaAberta
                            )?.resposta
                        }
                    </p>

                </div>

            </section>

        </main>
    );
}