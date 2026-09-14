import estilos from "./ModalMensagem.module.css";

interface ModalMensagemProps {
    exibir: boolean;
    titulo: string;
    texto: string;
    ocultar: () => void;
}

export function ModalMensagem({
    exibir,
    titulo,
    texto,
    ocultar
}: ModalMensagemProps) {

    // Se não estiver aberto, não mostra o card
    if (!exibir) {
        return null;
    }

    return (
        <div className={estilos.conteiner}>

            {/* Cabeçalho do card detalhado */}
            <div className={estilos.cabecalho}>

                {/* Bolinha decorativa */}
                <div className={estilos.bolinha}></div>

                {/* Nome do profissional */}
                <h3 className={estilos.titulo}>
                    {titulo}
                </h3>

            </div>

            {/* Informações do profissional */}
            <div className={estilos.mensagem}>
                {texto}
            </div>

            {/* Botão para fechar */}
            <button
                className={estilos.botao}
                onClick={ocultar}
            >
                Fechar
            </button>

        </div>
    );
}