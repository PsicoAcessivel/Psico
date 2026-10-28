import { AiFillCaretLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import estilos from "./ProfiRegiao.module.css";

// Profissionais disponíveis para demonstração
const profissionais = [
    {
        codigo: 1,
        nome: "Psicólogo(a) — Atendimento psicológico",
        descricao:
            "Profissional que oferece acolhimento e orientação para questões relacionadas à saúde mental e ao bem-estar emocional.",
        especialidade: "Psicologia",
        endereco: "Consulte os serviços de atendimento da sua região.",
        contato: "Verifique os canais oficiais de atendimento.",
    },
    {
        codigo: 2,
        nome: "Psicólogo(a) — Adolescentes e jovens",
        descricao:
            "Atendimento voltado às necessidades emocionais e aos desafios vivenciados durante a adolescência e a juventude.",
        especialidade: "Psicologia de adolescentes e jovens",
        endereco: "Consulte os serviços de atendimento da sua região.",
        contato: "Verifique os canais oficiais de atendimento.",
    },
    {
        codigo: 3,
        nome: "CAPS — Centro de Atenção Psicossocial",
        descricao:
            "Serviço público de saúde que oferece atendimento em saúde mental conforme as necessidades de cada pessoa.",
        especialidade: "Atenção psicossocial",
        endereco: "Consulte a unidade de referência do seu município.",
        contato: "Procure os canais oficiais da Secretaria de Saúde.",
    },
];

export function ProfiRegiao() {
    return (
        <main className={estilos.conteiner}>
            <div className={estilos.cabecalho}>
                <Link
                    className={estilos.link}
                    to="/profissionais"
                    aria-label="Voltar para profissionais"
                >
                    <AiFillCaretLeft />
                </Link>

                <h1 className={estilos.titulo}>
                    Profissionais da Região
                </h1>
            </div>

            <h2 className={estilos.subtitulo}>
                Onde encontrá-los?
            </h2>

            <div className={estilos.profissionais}>
                {profissionais.map((profissional, indice) => (
                    <div
                        key={profissional.codigo}
                        className={
                            indice % 2 === 0
                                ? estilos.profissional1
                                : estilos.profissional2
                        }
                    >
                        <h3 className={estilos.nome}>
                            {profissional.nome}
                        </h3>

                        <p className={estilos.descricao}>
                            {profissional.descricao}
                        </p>

                        <p className={estilos.especialidadeTi}>
                            Especialidade:
                        </p>

                        <p className={estilos.especialidadeTe}>
                            {profissional.especialidade}
                        </p>

                        <p className={estilos.enderecoTi}>
                            Endereço:
                        </p>

                        <p className={estilos.enderecoTe}>
                            {profissional.endereco}
                        </p>

                        <p className={estilos.contatoTi}>
                            Contato:
                        </p>

                        <p className={estilos.contatoTe}>
                            {profissional.contato}
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
}
