import { useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import estilos from './DefinicoesFormulario.module.css'
import { type Definicao } from '../../tipos/Definicoes'

// Definições de demonstração
const definicoesIniciais: Definicao[] = [
    {
        codigo: 1,
        titulo: 'Ansiedade',
        texto:
            'A ansiedade é uma reação natural diante de situações de preocupação ou expectativa. Quando é intensa ou persistente, pode afetar a rotina e o bem-estar.',
        cor: 'roxo',
    },
    {
        codigo: 2,
        titulo: 'Saúde mental',
        texto:
            'A saúde mental envolve o bem-estar emocional, psicológico e social. Ela influencia a maneira como pensamos, sentimos, enfrentamos desafios e nos relacionamos com outras pessoas.',
        cor: 'rosa',
    },
]

const definicoesDemo = [...definicoesIniciais]
let proximoCodigo = 3

export function DefinicoesFormulario() {
    const { codigo } = useParams()
    const navegar = useNavigate()

    const definicaoEncontrada = codigo
        ? definicoesDemo.find(
              (item) => item.codigo === Number(codigo)
          ) ?? null
        : null

    const [titulo, setTitulo] = useState(definicaoEncontrada?.titulo ?? '')
    const [texto, setTexto] = useState(definicaoEncontrada?.texto ?? '')
    const [cor, setCor] = useState<'roxo' | 'rosa'>(
        definicaoEncontrada?.cor ?? 'roxo'
    )

    const [definicaoOriginal, setDefinicaoOriginal] =
        useState<Definicao | null>(definicaoEncontrada)

    const [carregando, setCarregando] = useState(false)

    const [mensagem, setMensagem] = useState(
        codigo && !definicaoEncontrada
            ? 'Não foi possível encontrar esta definição na demonstração.'
            : ''
    )

    const modoEdicao = Boolean(codigo)

    function salvarDefinicao(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()

        setMensagem('')
        setCarregando(true)

        const dadosDefinicao: Definicao = {
            codigo: codigo ? Number(codigo) : proximoCodigo,
            titulo: titulo.trim(),
            texto: texto.trim(),
            cor,
        }

        if (modoEdicao) {
            const indice = definicoesDemo.findIndex(
                (item) => item.codigo === Number(codigo)
            )

            if (indice === -1) {
                setMensagem('Definição não encontrada.')
                setCarregando(false)
                return
            }

            definicoesDemo[indice] = dadosDefinicao
            setDefinicaoOriginal(dadosDefinicao)
            setMensagem('Definição alterada com sucesso na demonstração!')
        } else {
            definicoesDemo.push(dadosDefinicao)
            proximoCodigo += 1

            setTitulo('')
            setTexto('')
            setCor('roxo')

            setMensagem('Definição cadastrada com sucesso na demonstração!')
        }

        setCarregando(false)
    }

    function cancelar() {
        navegar('/admin/definicoes')
    }

    function descartarAlteracoes() {
        if (!definicaoOriginal) return

        setTitulo(definicaoOriginal.titulo)
        setTexto(definicaoOriginal.texto)
        setCor(definicaoOriginal.cor)
        setMensagem('')
    }

    function removerDefinicao() {
        if (!codigo || carregando) return

        const confirmar = window.confirm(
            `Deseja realmente excluir a definição "${titulo}"?`
        )

        if (!confirmar) return

        const indice = definicoesDemo.findIndex(
            (item) => item.codigo === Number(codigo)
        )

        if (indice === -1) {
            setMensagem('Definição não encontrada.')
            return
        }

        definicoesDemo.splice(indice, 1)
        navegar('/admin/definicoes')
    }

    if (modoEdicao && !definicaoOriginal) {
        return (
            <main className={estilos.container}>
                <section className={estilos.conteudo}>
                    <h1 className={estilos.titulo}>
                        Definição não encontrada
                    </h1>

                    <p className={estilos.descricao} role="alert">
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
                                setCor(evento.target.value as 'roxo' | 'rosa')
                            }
                        >
                            <option value="roxo">Roxo</option>
                            <option value="rosa">Rosa</option>
                        </select>
                    </div>

                    {mensagem && (
                        <p role="status" className={estilos.descricao}>
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
