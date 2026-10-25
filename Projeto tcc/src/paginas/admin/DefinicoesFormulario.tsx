import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import estilos from './DefinicoesFormulario.module.css'
import { useDefinicoes } from '../../hooks/useDefinicoes'
import { type Definicao } from '../../tipos/Definicoes'

export function DefinicoesFormulario() {
    const { codigo } = useParams()
    const navegar = useNavigate()

    const {
        criarDefinicao,
        buscarDefinicao,
        alterarDefinicao,
        excluirDefinicao
    } = useDefinicoes()

    const [titulo, setTitulo] = useState('')
    const [texto, setTexto] = useState('')
    const [cor, setCor] = useState<'roxo' | 'rosa'>('roxo')

    const [definicaoOriginal, setDefinicaoOriginal] =
        useState<Definicao | null>(null)

    const [carregando, setCarregando] = useState(Boolean(codigo))
    const [mensagem, setMensagem] = useState('')

    const modoEdicao = Boolean(codigo)

    useEffect(() => {
        let ativo = true

        async function carregarDefinicao() {
            if (!codigo) return

            const resultado = await buscarDefinicao(codigo)

            if (!ativo) return

            if (resultado) {
                setDefinicaoOriginal(resultado)
                setTitulo(resultado.titulo)
                setTexto(resultado.texto)
                setCor(resultado.cor)
            } else {
                setMensagem('Não foi possível encontrar esta definição.')
            }

            setCarregando(false)
        }

        if (codigo) {
            carregarDefinicao()
        }

        return () => {
            ativo = false
        }
    }, [codigo, buscarDefinicao])

    function preencherFormulario(definicao: Definicao) {
        setTitulo(definicao.titulo)
        setTexto(definicao.texto)
        setCor(definicao.cor)
    }

    async function salvarDefinicao(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()

        if (carregando) return

        setCarregando(true)
        setMensagem('')

        const dadosDefinicao: Definicao = {
            codigo: codigo ?? '',
            titulo: titulo.trim(),
            texto: texto.trim(),
            cor
        }

        try {
            const resultado = modoEdicao
                ? await alterarDefinicao(dadosDefinicao)
                : await criarDefinicao(dadosDefinicao)

            if (resultado === 'sucesso') {
                if (modoEdicao) {
                    navegar('/admin/definicoes')
                } else {
                    setMensagem('Definição cadastrada com sucesso!')
                    setTitulo('')
                    setTexto('')
                    setCor('roxo')
                }
            } else {
                setMensagem(resultado)
            }
        } catch {
            setMensagem(
                modoEdicao
                    ? 'Não foi possível alterar a definição. Tente novamente.'
                    : 'Não foi possível cadastrar a definição. Tente novamente.'
            )
        } finally {
            setCarregando(false)
        }
    }

    function cancelar() {
        navegar('/admin/definicoes')
    }

    function descartarAlteracoes() {
        if (definicaoOriginal) {
            preencherFormulario(definicaoOriginal)
            setMensagem('')
        }
    }

    async function removerDefinicao() {
        if (!codigo || carregando) return

        const confirmar = window.confirm(
            `Deseja realmente excluir a definição "${titulo}"?`
        )

        if (!confirmar) return

        setCarregando(true)
        setMensagem('')

        try {
            const resultado = await excluirDefinicao(codigo)

            if (resultado === 'sucesso') {
                navegar('/admin/definicoes')
            } else {
                setMensagem(resultado)
            }
        } catch {
            setMensagem(
                'Não foi possível excluir a definição. Tente novamente.'
            )
        } finally {
            setCarregando(false)
        }
    }

    if (carregando && modoEdicao && !definicaoOriginal) {
        return (
            <main className={estilos.container}>
                <section className={estilos.conteudo}>
                    <p className={estilos.descricao}>
                        Carregando definição...
                    </p>
                </section>
            </main>
        )
    }

    if (modoEdicao && !definicaoOriginal) {
        return (
            <main className={estilos.container}>
                <section className={estilos.conteudo}>
                    <h1 className={estilos.titulo}>
                        Definição não encontrada
                    </h1>

                    <p className={estilos.descricao}>
                        {mensagem ||
                            'Não foi possível carregar os dados da definição.'}
                    </p>

                    <button
                        type="button"
                        className={estilos.botaoCancelar}
                        onClick={cancelar}
                    >
                        Voltar para definições
                    </button>
                </section>
            </main>
        )
    }

    return (
        <main className={estilos.container}>
            <section className={estilos.conteudo}>
                <h1 className={estilos.titulo}>
                    {modoEdicao
                        ? 'Editar definição'
                        : 'Biblioteca de Conteúdos'}
                </h1>

                <p className={estilos.descricao}>
                    {modoEdicao
                        ? 'Altere os dados da definição selecionada.'
                        : 'Cadastre uma nova definição para a biblioteca do Psico-Acessível.'}
                </p>

                <form
                    className={estilos.formulario}
                    onSubmit={salvarDefinicao}
                >
                    <div className={estilos.campo}>
                        <label htmlFor="titulo">Título da definição</label>

                        <input
                            id="titulo"
                            type="text"
                            placeholder="Ex.: Ansiedade"
                            value={titulo}
                            onChange={(evento) =>
                                setTitulo(evento.target.value)
                            }
                            required
                        />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="texto">Conteúdo da definição</label>

                        <textarea
                            id="texto"
                            placeholder="Digite o conteúdo que será apresentado na biblioteca..."
                            value={texto}
                            onChange={(evento) =>
                                setTexto(evento.target.value)
                            }
                            rows={7}
                            required
                        />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="cor">Cor do cartão</label>

                        <select
                            id="cor"
                            value={cor}
                            onChange={(evento) =>
                                setCor(
                                    evento.target.value as 'roxo' | 'rosa'
                                )
                            }
                        >
                            <option value="roxo">Roxo</option>
                            <option value="rosa">Rosa</option>
                        </select>
                    </div>

                    {mensagem && (
                        <p role="alert" className={estilos.descricao}>
                            {mensagem}
                        </p>
                    )}

                    <div className={estilos.botoes}>
                        <button
                            type="submit"
                            className={estilos.botaoCadastrar}
                            disabled={carregando}
                        >
                            {carregando
                                ? 'Salvando...'
                                : modoEdicao
                                    ? 'Salvar alterações'
                                    : 'Cadastrar definição'}
                        </button>

                        {modoEdicao && (
                            <>
                                <button
                                    type="button"
                                    className={estilos.botaoCancelar}
                                    onClick={descartarAlteracoes}
                                    disabled={carregando}
                                >
                                    Descartar alterações
                                </button>

                                <button
                                    type="button"
                                    className={estilos.botaoCancelar}
                                    onClick={removerDefinicao}
                                    disabled={carregando}
                                >
                                    Excluir definição
                                </button>
                            </>
                        )}

                        <button
                            type="button"
                            className={estilos.botaoCancelar}
                            onClick={cancelar}
                            disabled={carregando}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}
