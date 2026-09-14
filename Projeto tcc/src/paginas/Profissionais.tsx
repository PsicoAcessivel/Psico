import estilos from "./Profissionais.module.css";
import { useState } from "react";
import { profissionais } from "../componentes/DadosProfissionais";
import { Link } from "react-router-dom";
import { AiFillCaretRight } from "react-icons/ai";
import { ModalMensagem } from "../componentes/ModalMensagem";

export function Profissionais() {

    const [profissionalAberto, setProfissionalAberto] =
        useState<number | null>(null);

    return (
        <main className={estilos.conteiner}>

            {/* Cabeçalho da página */}
            <div className={estilos.cabecalho}>

                <h1 className={estilos.titulo}>
                    Profissionais da Região
                </h1>

                <Link
                    className={estilos.link}
                    to="/profiRegiao"
                >
                    <AiFillCaretRight />
                </Link>

            </div>

            <h2 className={estilos.subtitulo}>
                Entendendo cada profissional
            </h2>

            <h2 className={estilos.subtitulo}>
                Quem procurar?
            </h2>

            {/* Cards dos profissionais */}
            <div className={estilos.resumos}>
                                          

                {profissionais.map((profissional) => (

                    <div
                        className={estilos.itemProfissional}
                        key={profissional.id}
                    >

                        {/* Card de resumo */}
                        <div className={estilos.resumo}>

                            <h3 className={estilos.nome}>
                                {profissional.nome}
                            </h3>

                            <p className={estilos.indicacao}>
                                <strong>Indicação:</strong>{" "}
                                {profissional.indicacao}
                            </p>

                            <button
                                className={estilos.mais}
                                onClick={() =>
                                    setProfissionalAberto(
                                        profissionalAberto === profissional.id
                                            ? null
                                            : profissional.id
                                    )
                                }
                            >
                                Clique para saber mais
                            </button>
  

                        </div>

                        {/* Detalhes aparecem abaixo do card clicado */}
                        {profissionalAberto === profissional.id && (
                            <ModalMensagem
                                exibir={true}
                                titulo={profissional.nome}
                                texto={`Descrição: ${profissional.descricao}

Quando procurar: ${profissional.quandoProcurar}`}
                                ocultar={() =>
                                    setProfissionalAberto(null)
                                }
                            />
                        )}

                    </div>

                ))}

            </div>

        </main>
    );
}