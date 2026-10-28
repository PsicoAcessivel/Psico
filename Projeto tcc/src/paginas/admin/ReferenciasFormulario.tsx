import { useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { type Referencia } from '../../tipos/Referencia'
import estilos from './ReferenciasFormulario.module.css'

// Referências de demonstração
const referenciasIniciais: Referencia[] = [
    {
        codigo: '1',
        tema: 'Saúde mental',
        autor: 'Organização Mundial da Saúde',
        titulo: 'Saúde mental: fortalecimento da nossa resposta',
        ano: '2022',
        link: 'https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response',
    },
]

let referenciasDemo = [...referenciasIniciais]
let proximoCodigo = 2

export function ReferenciasFormulario() {
    const { codigo } = useParams()
    const navegar = useNavigate()

    const referenciaEncontrada = codigo
        ? referenciasDemo.find((item) => item.codigo === codigo) ?? null
        : null

    const [tema, setTema] = useState(referenciaEncontrada?.tema ?? '')
    const [autor, setAutor] = useState(referenciaEncontrada?.autor ?? '')
    const [titulo, setTitulo] = useState(referenciaEncontrada?.titulo ?? '')
    const [ano, setAno] = useState(referenciaEncontrada?.ano ?? '')
    const [link, setLink] = useState(referenciaEncontrada?.link ?? '')

    const [referenciaOriginal, setReferenciaOriginal] =
        useState<Referencia | null>(referenciaEncontrada)

    const [mensagem, setMensagem] = useState(
        codigo && !referenciaEncontrada
            ? 'Referência não encontrada na demonstração.'
            : ''
    )

    const [salvando, setSalvando] = useState(false)

    const modoEdicao = Boolean(codigo)

    function salvarReferencia(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()
        setMensagem('')
        setSalvando(true)

        const dadosReferencia: Referencia = {
            codigo: codigo ?? String(proximoCodigo),
            tema: tema.trim(),
            autor: autor.trim(),
            titulo: titulo.trim(),
            ano: ano.trim(),
            link: link.trim(),
        }

        if (modoEdicao) {
            const indice = referenciasDemo.findIndex(
                (item) => item.codigo === codigo
            )

            if (indice === -1) {
                setMensagem('Referência não encontrada.')
                setSalvando(false)
                return
            }

            referenciasDemo[indice] = dadosReferencia
            setReferenciaOriginal(dadosReferencia)
            setMensagem('Referência atualizada na demonstração!')
        } else {
            referenciasDemo.push(dadosReferencia)
            proximoCodigo += 1

            setTema('')
            setAutor('')
            setTitulo('')
            setAno('')
            setLink('')
            setMensagem('Referência cadastrada na demonstração!')
        }

        setSalvando(false)
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

    function removerReferencia() {
        if (!codigo) return

        const confirmar = window.confirm(
            'Tem certeza de que deseja excluir esta referência da demonstração?'
        )

        if (!confirmar) return

        referenciasDemo = referenciasDemo.filter(
            (item) => item.codigo !== codigo
        )

        navegar('/admin/referencias')
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
