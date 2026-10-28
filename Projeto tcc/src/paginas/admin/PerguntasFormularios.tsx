import { useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { type PerguntaResposta } from '../../tipos/PerguntaResposta'
import estilos from './PerguntasFormularios.module.css'

// Perguntas e respostas de demonstração
const perguntasIniciais: PerguntaResposta[] = [
    {
        codigo: '1',
        categoria: 'ansiedade',
        pergunta: 'O que é ansiedade?',
        resposta:
            'A ansiedade é uma reação natural do organismo diante de situações de preocupação ou expectativa. Quando é intensa ou persistente, pode afetar a rotina e o bem-estar.',
    },
    {
        codigo: '2',
        categoria: 'depressao',
        pergunta: 'O que é depressão?',
        resposta:
            'A depressão é uma condição de saúde mental que pode afetar o humor, os pensamentos, a disposição e as atividades do dia a dia. Buscar apoio profissional pode ajudar.',
    },
]

const perguntasDemo = [...perguntasIniciais]
let proximoCodigo = 3

export function PerguntasFormulario() {
    const { codigo } = useParams()
    const navegar = useNavigate()

    const perguntaEncontrada = codigo
        ? perguntasDemo.find((item) => item.codigo === codigo) ?? null
        : null

    const [dados, setDados] = useState<PerguntaResposta>(
        perguntaEncontrada ?? {
            codigo: '',
            categoria: '',
            pergunta: '',
            resposta: '',
        }
    )

    const [carregando, setCarregando] = useState(false)

    const [erro, setErro] = useState(
        codigo && !perguntaEncontrada
            ? 'Pergunta não encontrada na demonstração.'
            : ''
    )

    const [mensagem, setMensagem] = useState('')

    function atualizarCampo(
        campo: 'categoria' | 'pergunta' | 'resposta',
        valor: string
    ) {
        setDados((anteriores) => ({
            ...anteriores,
            [campo]: valor,
        }))
    }

    function salvar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()

        setErro('')
        setMensagem('')
        setCarregando(true)

        const dadosPergunta: PerguntaResposta = {
            ...dados,
            codigo: codigo ?? String(proximoCodigo),
            categoria: dados.categoria.trim(),
            pergunta: dados.pergunta.trim(),
            resposta: dados.resposta.trim(),
        }

        if (codigo) {
            const indice = perguntasDemo.findIndex(
                (item) => item.codigo === codigo
            )

            if (indice === -1) {
                setErro('Pergunta não encontrada.')
                setCarregando(false)
                return
            }

            perguntasDemo[indice] = dadosPergunta
            setDados(dadosPergunta)
            setMensagem('Pergunta alterada com sucesso na demonstração!')
        } else {
            perguntasDemo.push(dadosPergunta)
            proximoCodigo += 1

            setDados({
                codigo: '',
                categoria: '',
                pergunta: '',
                resposta: '',
            })

            setMensagem('Pergunta cadastrada com sucesso na demonstração!')
        }

        setCarregando(false)
    }

    if (codigo && !perguntaEncontrada && !mensagem) {
        return (
            <main className={estilos.container}>
                <div className={estilos.conteudo}>
                    <p className={estilos.erro} role="alert">
                        {erro || 'Pergunta não encontrada.'}
                    </p>

                    <button
                        className={estilos.botaoVoltar}
                        type="button"
                        onClick={() => navegar('/admin/perguntas')}
                    >
                        Voltar
                    </button>
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
                            disabled={carregando}
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
