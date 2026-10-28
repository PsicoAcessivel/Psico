import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type PerguntaResposta } from '../../tipos/PerguntaResposta'
import estilos from './GerenciarPerguntas.module.css'

export function GerenciarPerguntas() {
    const navegar = useNavigate()

    const [perguntas, setPerguntas] = useState<PerguntaResposta[]>([
        {
            codigo: '1',
            pergunta: 'O que é saúde mental?',
            categoria: 'Saúde',
            resposta:
                'Saúde mental envolve o bem-estar emocional, psicológico e social, influenciando a forma como pensamos, sentimos e agimos.',
        },
        {
            codigo: '2',
            pergunta: 'O que posso fazer quando me sinto ansioso?',
            categoria: 'Ansiedade',
            resposta:
                'Tentar respirar calmamente, conversar com alguém de confiança e procurar ajuda profissional quando necessário pode ajudar.',
        },
        {
            codigo: '3',
            pergunta: 'Como posso procurar ajuda psicológica?',
            categoria: 'Ajuda profissional',
            resposta:
                'Você pode buscar informações nos serviços públicos de saúde da sua região ou conversar com um profissional de saúde.',
        },
    ])

    const [erro, setErro] = useState('')

    function excluirPergunta(codigo: string) {
        const confirmar = window.confirm(
            'Tem certeza de que deseja excluir esta pergunta?'
        )

        if (!confirmar) {
            return
        }

        setPerguntas((anteriores) =>
            anteriores.filter((pergunta) => pergunta.codigo !== codigo)
        )

        setErro('')
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

                {perguntas.length === 0 ? (
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
