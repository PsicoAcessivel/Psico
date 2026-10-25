import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePerguntasRespostas } from '../../hooks/usePerguntasRespostas'
import { type PerguntaResposta } from '../../tipos/PerguntaResposta'
import estilos from './PerguntasFormularios.module.css'

export function PerguntasFormulario() {
    const [dados, setDados] = useState<PerguntaResposta>({
        codigo: '',
        categoria: '',
        pergunta: '',
        resposta: ''
    })

    const [carregando, setCarregando] = useState(false)
    const [carregandoPergunta, setCarregandoPergunta] = useState(false)
    const [erro, setErro] = useState('')
    const [mensagem, setMensagem] = useState('')

    const { codigo } = useParams()
    const navegar = useNavigate()

    const {
        criarPerguntaResposta,
        buscarPerguntaResposta,
        alterarPerguntaResposta
    } = usePerguntasRespostas()

    useEffect(() => {
        let ativo = true

        async function carregarPergunta() {
            if (!codigo) {
                return
            }

            setCarregandoPergunta(true)

            try {
                const pergunta = await buscarPerguntaResposta(codigo)

                if (!ativo) {
                    return
                }

                if (pergunta) {
                    setDados(pergunta)
                } else {
                    setErro('Pergunta não encontrada.')
                }
            } catch {
                if (ativo) {
                    setErro('Não foi possível carregar a pergunta.')
                }
            } finally {
                if (ativo) {
                    setCarregandoPergunta(false)
                }
            }
        }

        carregarPergunta()

        return () => {
            ativo = false
        }
    }, [codigo, buscarPerguntaResposta])

    function atualizarCampo(
        campo: 'categoria' | 'pergunta' | 'resposta',
        valor: string
    ) {
        setDados((anteriores) => ({
            ...anteriores,
            [campo]: valor
        }))
    }

    async function salvar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()

        setErro('')
        setMensagem('')
        setCarregando(true)

        try {
            const resultado = codigo
                ? await alterarPerguntaResposta(dados)
                : await criarPerguntaResposta(dados)

            if (resultado === 'sucesso') {
                setMensagem(
                    codigo
                        ? 'Pergunta alterada com sucesso!'
                        : 'Pergunta cadastrada com sucesso!'
                )

                if (!codigo) {
                    setDados({
                        codigo: '',
                        categoria: '',
                        pergunta: '',
                        resposta: ''
                    })
                }
            } else {
                setErro(resultado)
            }
        } catch {
            setErro('Não foi possível salvar a pergunta.')
        } finally {
            setCarregando(false)
        }
    }

    if (carregandoPergunta) {
        return (
            <main className={estilos.container}>
                <div className={estilos.conteudo}>
                    <p className={estilos.descricao}>
                        Carregando pergunta...
                    </p>
                </div>
            </main>
        )
    }

    return (
        <main className={estilos.container}>
            <div className={estilos.conteudo}>
                <h1 className={estilos.titulo}>
                    {codigo
                        ? 'Editar pergunta e resposta'
                        : 'Cadastrar pergunta e resposta'}
                </h1>

                <p className={estilos.descricao}>
                    Preencha os campos abaixo para cadastrar ou atualizar
                    uma pergunta da Biblioteca.
                </p>

                {erro && (
                    <p className={estilos.erro} role="alert">
                        {erro}
                    </p>
                )}

                {mensagem && (
                    <p className={estilos.mensagem} role="status">
                        {mensagem}
                    </p>
                )}

                <form className={estilos.formulario} onSubmit={salvar}>
                    <div className={estilos.campo}>
                        <label htmlFor="categoria">Categoria</label>

                        <select
                            id="categoria"
                            value={dados.categoria}
                            onChange={(evento) =>
                                atualizarCampo('categoria', evento.target.value)
                            }
                            required
                        >
                            <option value="">Selecione uma categoria</option>
                            <option value="depressao">Depressão</option>
                            <option value="ansiedade">Ansiedade</option>
                            <option value="drogas">Drogas</option>
                            <option value="familia">Família</option>
                            <option value="saude">Saúde</option>
                            <option value="futuro">Futuro</option>
                            <option value="raiva">Raiva</option>
                            <option value="bullying">Bullying</option>
                        </select>
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="pergunta">Pergunta</label>

                        <input
                            id="pergunta"
                            type="text"
                            value={dados.pergunta}
                            onChange={(evento) =>
                                atualizarCampo('pergunta', evento.target.value)
                            }
                            placeholder="Digite a pergunta"
                            required
                        />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="resposta">Resposta</label>

                        <textarea
                            id="resposta"
                            value={dados.resposta}
                            onChange={(evento) =>
                                atualizarCampo('resposta', evento.target.value)
                            }
                            placeholder="Digite a resposta"
                            rows={6}
                            required
                        />
                    </div>

                    <div className={estilos.botoes}>
                        <button
                            className={estilos.botaoSalvar}
                            type="submit"
                            disabled={carregando || carregandoPergunta}
                        >
                            {carregando
                                ? 'Salvando...'
                                : codigo
                                    ? 'Salvar alterações'
                                    : 'Cadastrar pergunta'}
                        </button>

                        <button
                            className={estilos.botaoVoltar}
                            type="button"
                            onClick={() => navegar('/admin/perguntas')}
                        >
                            Voltar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
