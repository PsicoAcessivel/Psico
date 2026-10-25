
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePerguntasRespostas } from '../../hooks/usePerguntasRespostas'
import { type PerguntaResposta } from '../../tipos/PerguntaResposta'
import estilos from './GerenciarPerguntas.module.css'

export function GerenciarPerguntas() {
    const [perguntas, setPerguntas] = useState<PerguntaResposta[]>([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')

    const navegar = useNavigate()

    const {
        listarPerguntasRespostas,
        excluirPerguntaResposta
    } = usePerguntasRespostas()

    useEffect(() => {
        let ativo = true

        async function buscarPerguntas() {
            try {
                const resultado = await listarPerguntasRespostas()

                if (ativo) {
                    setPerguntas(resultado)
                }
            } catch {
                if (ativo) {
                    setErro('Não foi possível carregar as perguntas.')
                }
            } finally {
                if (ativo) {
                    setCarregando(false)
                }
            }
        }

        buscarPerguntas()

        return () => {
            ativo = false
        }
    }, [listarPerguntasRespostas])

    async function excluirPergunta(codigo: string) {
        const confirmar = window.confirm(
            'Tem certeza de que deseja excluir esta pergunta?'
        )

        if (!confirmar) {
            return
        }

        setErro('')

        try {
            const resultado = await excluirPerguntaResposta(codigo)

            if (resultado === 'sucesso') {
                setPerguntas((anteriores) =>
                    anteriores.filter(
                        (pergunta) => pergunta.codigo !== codigo
                    )
                )
            } else {
                setErro(resultado)
            }
        } catch {
            setErro('Não foi possível excluir a pergunta.')
        }
    }

    return (
        <main className={estilos.container}>
            <section className={estilos.conteudo}>
                <h1 className={estilos.titulo}>
                    Gerenciar perguntas e respostas
                </h1>

                <p className={estilos.descricao}>
                    Consulte, cadastre e gerencie as perguntas e respostas
                    da Biblioteca do Psico-Acessível.
                </p>

                <button
                    type="button"
                    className={estilos.botaoCadastrar}
                    onClick={() => navegar('/admin/perguntas/novo')}
                >
                    Cadastrar nova pergunta
                </button>

                {erro && (
                    <p className={estilos.erro} role="alert">
                        {erro}
                    </p>
                )}

                {carregando ? (
                    <p className={estilos.mensagem}>
                        Carregando perguntas...
                    </p>
                ) : perguntas.length === 0 ? (
                    <p className={estilos.mensagem}>
                        Nenhuma pergunta cadastrada.
                    </p>
                ) : (
                    <div className={estilos.lista}>
                        {perguntas.map((item) => (
                            <article
                                key={item.codigo}
                                className={estilos.cartao}
                            >
                                <h2 className={estilos.pergunta}>
                                    {item.pergunta}
                                </h2>

                                <p className={estilos.categoria}>
                                    Categoria: {item.categoria}
                                </p>

                                <p className={estilos.resposta}>
                                    {item.resposta}
                                </p>

                                <div className={estilos.botoes}>
                                    <button
                                        type="button"
                                        className={estilos.botaoEditar}
                                        onClick={() =>
                                            navegar(
                                                `/admin/perguntas/editar/${item.codigo}`
                                            )
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button
                                        type="button"
                                        className={estilos.botaoExcluir}
                                        onClick={() =>
                                            excluirPergunta(item.codigo)
                                        }
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                <button
                    type="button"
                    className={estilos.botaoVoltar}
                    onClick={() => navegar('/admin')}
                >
                    Voltar ao painel
                </button>
            </section>
        </main>
    )
}
