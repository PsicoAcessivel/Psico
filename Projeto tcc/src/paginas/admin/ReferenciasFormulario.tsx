import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useReferencias } from '../../hooks/useReferencias'
import { type Referencia } from '../../tipos/Referencia'
import estilos from './ReferenciasFormulario.module.css'

export function ReferenciasFormulario() {
    const { codigo } = useParams()
    const navegar = useNavigate()

    const {
        criarReferencia,
        buscarReferencia,
        alterarReferencia,
        excluirReferencia
    } = useReferencias()

    const [tema, setTema] = useState('')
    const [autor, setAutor] = useState('')
    const [titulo, setTitulo] = useState('')
    const [ano, setAno] = useState('')
    const [link, setLink] = useState('')

    const [referenciaOriginal, setReferenciaOriginal] =
        useState<Referencia | null>(null)

    const [carregando, setCarregando] = useState(Boolean(codigo))
    const [salvando, setSalvando] = useState(false)
    const [mensagem, setMensagem] = useState('')

    const modoEdicao = Boolean(codigo)

    useEffect(() => {
        if (!codigo) return

        let ativo = true
        const codigoReferencia = codigo

        async function carregarReferencia() {
            try {
                const resultado = await buscarReferencia(codigoReferencia)

                if (!ativo) return

                if (resultado) {
                    setReferenciaOriginal(resultado)
                    setTema(resultado.tema)
                    setAutor(resultado.autor)
                    setTitulo(resultado.titulo)
                    setAno(resultado.ano)
                    setLink(resultado.link)
                } else {
                    setMensagem('Referência não encontrada.')
                }
            } catch (error) {
                console.error('Erro ao carregar referência:', error)

                if (ativo) {
                    setMensagem('Não foi possível carregar a referência.')
                }
            } finally {
                if (ativo) {
                    setCarregando(false)
                }
            }
        }

        carregarReferencia()

        return () => {
            ativo = false
        }
    }, [codigo, buscarReferencia])

    async function salvarReferencia(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()
        setMensagem('')
        setSalvando(true)

        const dadosReferencia: Referencia = {
            codigo: codigo ?? '',
            tema: tema.trim(),
            autor: autor.trim(),
            titulo: titulo.trim(),
            ano: ano.trim(),
            link: link.trim()
        }

        try {
            const resultado = modoEdicao
                ? await alterarReferencia(dadosReferencia)
                : await criarReferencia(dadosReferencia)

            if (resultado !== 'sucesso') {
                setMensagem(resultado)
                return
            }

            if (modoEdicao) {
                navegar('/admin/referencias')
            } else {
                setTema('')
                setAutor('')
                setTitulo('')
                setAno('')
                setLink('')
                setMensagem('Referência cadastrada com sucesso!')
            }
        } catch (error) {
            console.error('Erro ao salvar referência:', error)
            setMensagem('Não foi possível salvar a referência.')
        } finally {
            setSalvando(false)
        }
    }

    function cancelarCadastro() {
        navegar('/admin/referencias')
    }

    function descartarAlteracoes() {
        if (!referenciaOriginal) return

        setTema(referenciaOriginal.tema)
        setAutor(referenciaOriginal.autor)
        setTitulo(referenciaOriginal.titulo)
        setAno(referenciaOriginal.ano)
        setLink(referenciaOriginal.link)
        setMensagem('')
    }

    async function removerReferencia() {
        if (!codigo) return

        const confirmar = window.confirm(
            'Tem certeza de que deseja excluir esta referência?'
        )

        if (!confirmar) return

        setSalvando(true)
        setMensagem('')

        try {
            const resultado = await excluirReferencia(codigo)

            if (resultado !== 'sucesso') {
                setMensagem(resultado)
                return
            }

            navegar('/admin/referencias')
        } catch (error) {
            console.error('Erro ao excluir referência:', error)
            setMensagem('Não foi possível excluir a referência.')
        } finally {
            setSalvando(false)
        }
    }

    if (carregando) {
        return (
            <main className={estilos.container}>
                <section className={estilos.conteudo}>
                    <p>Carregando referência...</p>
                </section>
            </main>
        )
    }

    if (modoEdicao && !referenciaOriginal) {
        return (
            <main className={estilos.container}>
                <section className={estilos.conteudo}>
                    <p role="alert">
                        {mensagem || 'Referência não encontrada.'}
                    </p>

                    <button
                        type="button"
                        className={estilos.botaoCancelar}
                        onClick={cancelarCadastro}
                    >
                        Voltar às referências
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
                        ? 'Editar referência'
                        : 'Gerenciamento de Referências'}
                </h1>

                <p className={estilos.descricao}>
                    {modoEdicao
                        ? 'Altere os dados da referência bibliográfica.'
                        : 'Cadastre uma referência bibliográfica para o Psico-Acessível.'}
                </p>

                <form
                    className={estilos.formulario}
                    onSubmit={salvarReferencia}
                >
                    <div className={estilos.campo}>
                        <label htmlFor="tema">Tema da referência</label>
                        <input
                            id="tema"
                            type="text"
                            placeholder="Ex.: Saúde mental"
                            value={tema}
                            onChange={(evento) => setTema(evento.target.value)}
                            required
                        />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="autor">Autor ou instituição</label>
                        <input
                            id="autor"
                            type="text"
                            placeholder="Ex.: WORLD HEALTH ORGANIZATION"
                            value={autor}
                            onChange={(evento) => setAutor(evento.target.value)}
                            required
                        />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="titulo">Título da publicação</label>
                        <textarea
                            id="titulo"
                            placeholder="Digite o título completo da referência"
                            value={titulo}
                            onChange={(evento) => setTitulo(evento.target.value)}
                            rows={3}
                            required
                        />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="ano">Ano de publicação</label>
                        <input
                            id="ano"
                            type="text"
                            placeholder="Ex.: 2025 ou [s.d.]"
                            value={ano}
                            onChange={(evento) => setAno(evento.target.value)}
                            required
                        />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="link">Link da referência</label>
                        <input
                            id="link"
                            type="url"
                            placeholder="https://exemplo.com/referencia"
                            value={link}
                            onChange={(evento) => setLink(evento.target.value)}
                            required
                        />
                    </div>

                    {mensagem && <p role="status">{mensagem}</p>}

                    <div className={estilos.botoes}>
                        <button
                            type="submit"
                            className={estilos.botaoCadastrar}
                            disabled={salvando}
                        >
                            {salvando
                                ? 'Salvando...'
                                : modoEdicao
                                    ? 'Salvar alterações'
                                    : 'Cadastrar referência'}
                        </button>

                        {modoEdicao && (
                            <>
                                <button
                                    type="button"
                                    className={estilos.botaoCancelar}
                                    onClick={descartarAlteracoes}
                                    disabled={salvando}
                                >
                                    Descartar alterações
                                </button>

                                <button
                                    type="button"
                                    className={estilos.botaoCancelar}
                                    onClick={removerReferencia}
                                    disabled={salvando}
                                >
                                    Excluir referência
                                </button>
                            </>
                        )}

                        <button
                            type="button"
                            className={estilos.botaoCancelar}
                            onClick={cancelarCadastro}
                            disabled={salvando}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}