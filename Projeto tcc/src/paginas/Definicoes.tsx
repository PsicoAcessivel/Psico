import type { Definicao } from "../tipos/Definicoes";
import estilos from "./Definicoes.module.css";

// Definições disponíveis na biblioteca
const definicoes: Definicao[] = [
    {
        codigo: 1,
        titulo: "Ansiedade",
        texto:
            "A ansiedade é uma reação natural do organismo diante de situações que causam preocupação ou expectativa. Quando é muito intensa ou frequente, pode afetar a rotina, o sono e a concentração. Procurar apoio profissional pode ajudar a compreender e lidar com esses sentimentos.",
        cor: "rosa",
    },
    {
        codigo: 2,
        titulo: "Depressão",
        texto:
            "A depressão é uma condição de saúde mental que pode envolver tristeza persistente, perda de interesse em atividades, cansaço e dificuldades de concentração. Ela não é simplesmente falta de vontade, e existem tratamentos e formas de apoio que podem ajudar.",
        cor: "roxo",
    },
    {
        codigo: 3,
        titulo: "Saúde mental",
        texto:
            "A saúde mental está relacionada à maneira como lidamos com as emoções, os desafios cotidianos, os relacionamentos e as decisões. Cuidar dela envolve reconhecer as próprias necessidades, buscar apoio quando necessário e desenvolver hábitos que favoreçam o bem-estar.",
        cor: "rosa",
    },
    {
        codigo: 4,
        titulo: "Autoestima",
        texto:
            "A autoestima está relacionada à forma como percebemos e valorizamos a nós mesmos. Ela pode variar ao longo da vida e ser influenciada pelas experiências e pelos relacionamentos. Desenvolvê-la envolve reconhecer qualidades, respeitar limites e compreender que ninguém precisa ser perfeito.",
        cor: "roxo",
    },
    {
        codigo: 5,
        titulo: "Estresse",
        texto:
            "O estresse é uma resposta do organismo diante de situações percebidas como desafiadoras ou exigentes. Em excesso, pode prejudicar o bem-estar e a rotina. Fazer pausas, organizar tarefas e conversar com alguém de confiança são algumas estratégias que podem ajudar.",
        cor: "rosa",
    },
    {
        codigo: 6,
        titulo: "Bullying",
        texto:
            "O bullying envolve comportamentos agressivos intencionais e repetidos, geralmente marcados por uma desigualdade de poder. Pode acontecer presencialmente ou pela internet e causar sofrimento emocional. Buscar ajuda de um adulto de confiança e da escola é importante diante dessas situações.",
        cor: "roxo",
    },
    {
        codigo: 7,
        titulo: "Raiva",
        texto:
            "A raiva é uma emoção humana que pode surgir diante de frustrações, conflitos ou situações consideradas injustas. Sentir raiva não é, por si só, algo errado. Aprender a reconhecer essa emoção e encontrar maneiras seguras de expressá-la pode ajudar a lidar com os conflitos.",
        cor: "rosa",
    },
    {
        codigo: 8,
        titulo: "Solidão",
        texto:
            "A solidão é a sensação de estar desconectado de outras pessoas, mesmo quando se está acompanhado. Ela pode afetar o bem-estar emocional. Conversar com alguém de confiança, participar de atividades coletivas e procurar apoio quando necessário podem ajudar a fortalecer os vínculos.",
        cor: "roxo",
    },
];

export function Definicoes() {
    return (
        <div className={estilos.container}>
            <section className={estilos.conteudo}>
                <h2 className={estilos.titulo1}>
                    Biblioteca de Conteúdos/Definições
                </h2>

                <div className={estilos.grid}>
                    {definicoes.map((definicao) => (
                        <div
                            key={definicao.codigo}
                            className={`${estilos.card} ${
                                definicao.cor === "rosa"
                                    ? estilos.rosa
                                    : estilos.roxo
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
    );
}
