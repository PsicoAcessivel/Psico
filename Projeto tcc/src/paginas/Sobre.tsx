import estilos from "./Sobre.module.css";

import integrante1 from "../assets/imagens/integrante1.jpeg";
import integrante2 from "../assets/imagens/integrante2.jpeg";
import integrante3 from "../assets/imagens/integrante3.jpg";

export function Sobre() {
    return (
        <main className={estilos.container}>

            {/* Título principal da página */}
            <h1 className={estilos.titulo}>
                Sobre o Projeto
            </h1>

            {/* Apresentação e objetivo do projeto */}
            <section className={estilos.resumo}>

                <p>
                    O <strong>Psico-Acessível</strong> é uma plataforma desenvolvida como
                    Trabalho de Conclusão de Curso (TCC) com o propósito de tornar as
                    informações sobre saúde mental mais acessíveis, confiáveis e de fácil
                    compreensão para toda a população.
                </p>

                <p>
                    A plataforma reúne uma biblioteca de conteúdos educativos, perguntas
                    frequentes, informações sobre transtornos psicológicos, oficinas,
                    indicação de profissionais e materiais de apoio, promovendo
                    conscientização, acolhimento e incentivando a busca por ajuda quando
                    necessário.
                </p>

                <p>
                    Nosso objetivo é contribuir para a redução do preconceito relacionado
                    à saúde mental, aproximando as pessoas de informações de qualidade e
                    oferecendo um ambiente digital acessível, intuitivo e pensado para
                    atender diferentes públicos.
                </p>

            </section>

            {/* Título da seção de integrantes */}
            <h2 className={estilos.subtitulo}>
                Integrantes
            </h2>

            {/* Cards com as informações dos integrantes */}
            <section className={estilos.grid}>

                <div className={estilos.card}>
                    <img src={integrante1} alt="Integrante 1" />
                    <h3>Isabela Menezes</h3>
                    <p>Desenvolvedora Front-end</p>
                </div>

                <div className={estilos.card}>
                    <img src={integrante2} alt="Integrante 2" />
                    <h3>Leticia Rodrigues</h3>
                    <p>Desenvolvedora Front-end</p>
                </div>

                <div className={estilos.card}>
                    <img src={integrante3} alt="Integrante 3" />
                    <h3>Karlene Sousa</h3>
                    <p>Desenvolvedora Back-end</p>
                </div>

            </section>

        </main>
    );
}