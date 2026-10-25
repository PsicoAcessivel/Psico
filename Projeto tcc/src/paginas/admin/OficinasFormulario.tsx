import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { type Oficina } from '../../tipos/Oficina'
import { useOficinas } from '../../hooks/useOficinas'
import estilos from './OficinasFormulario.module.css'

export function OficinasFormulario() {
    const { codigo } = useParams()
    const navegar = useNavigate()

    const {
        criarOficina,
        buscarOficina,
        alterarOficina,
        excluirOficina
    } = useOficinas()

    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [contato, setContato] = useState('')
    const [cor, setCor] = useState<'azul' | 'roxo'>('azul')

    const [oficinaOriginal, setOficinaOriginal] = useState<Oficina | null>(null)
    const [carregando, setCarregando] = useState(Boolean(codigo))
    const [mensagem, setMensagem] = useState('')

    const modoEdicao = Boolean(codigo)

    useEffect(() => {
    let ativo = true

    async function carregarOficina() {
        if (!codigo) return

        const resultado = await buscarOficina(codigo)

        if (!ativo) return

        if (resultado) {
            setOficinaOriginal(resultado)
            setNome(resultado.nome)
            setEndereco(resultado.endereco)
            setContato(resultado.contato)
            setCor(resultado.cor)
        } else {
            setMensagem('Não foi possível encontrar esta oficina.')
        }

        setCarregando(false)
    }

    if (codigo) {
        carregarOficina()
    }

    return () => {
        ativo = false
    }
}, [codigo, buscarOficina])

    function preencherFormulario(oficina: Oficina) {
        setNome(oficina.nome)
        setEndereco(oficina.endereco)
        setContato(oficina.contato)
        setCor(oficina.cor)
    }

    async function salvarOficina(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()
        setMensagem('')

        const dadosOficina: Oficina = {
            codigo: codigo ?? '',
            nome,
            endereco,
            contato,
            cor
        }

        const resultado = modoEdicao
            ? await alterarOficina(dadosOficina)
            : await criarOficina(dadosOficina)

        if (resultado === 'sucesso') {
            navegar('/admin/oficinas')
        } else {
            setMensagem(resultado)
        }
    }

    function cancelar() {
        navegar('/admin/oficinas')
    }

    function descartarAlteracoes() {
        if (oficinaOriginal) {
            preencherFormulario(oficinaOriginal)
            setMensagem('')
        }
    }

    async function removerOficina() {
        if (!codigo) return

        const confirmar = window.confirm(
            `Deseja realmente excluir a oficina "${nome}"?`
        )

        if (!confirmar) return

        const resultado = await excluirOficina(codigo)

        if (resultado === 'sucesso') {
            navegar('/admin/oficinas')
        } else {
            setMensagem(resultado)
        }
    }

    if (carregando) {
        return (
            <main className={estilos.container}>
                <section className={estilos.conteudo}>
                    <p className={estilos.descricao}>
                        Carregando oficina...
                    </p>
                </section>
            </main>
        )
    }

    if (modoEdicao && !oficinaOriginal) {
        return (
            <main className={estilos.container}>
                <section className={estilos.conteudo}>
                    <h1 className={estilos.titulo}>
                        Oficina não encontrada
                    </h1>

                    <p className={estilos.descricao}>
                        {mensagem || 'Não foi possível carregar os dados da oficina.'}
                    </p>

                    <button
                        type="button"
                        className={estilos.botaoCancelar}
                        onClick={cancelar}
                    >
                        Voltar para oficinas
                    </button>
                </section>
            </main>
        )
    }

    return (
        <main className={estilos.container}>
            <section className={estilos.conteudo}>
                <h1 className={estilos.titulo}>
                    {modoEdicao ? 'Editar oficina' : 'Cadastrar oficina'}
                </h1>

                <p className={estilos.descricao}>
                    {modoEdicao
                        ? 'Altere os dados da oficina selecionada.'
                        : 'Cadastre uma nova oficina para apresentar no Psico-Acessível.'}
                </p>

                <form className={estilos.formulario} onSubmit={salvarOficina}>
                    <div className={estilos.campo}>
                        <label htmlFor="nome">Nome da oficina</label>

                        <input
                            id="nome"
                            type="text"
                            placeholder="Ex.: Studio de Dança"
                            value={nome}
                            onChange={(evento) => setNome(evento.target.value)}
                            required
                        />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="endereco">Endereço</label>

                        <input
                            id="endereco"
                            type="text"
                            placeholder="Rua, número, bairro e cidade"
                            value={endereco}
                            onChange={(evento) => setEndereco(evento.target.value)}
                            required
                        />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="contato">Contato</label>

                        <input
                            id="contato"
                            type="text"
                            placeholder="Ex.: (19) 99999-9999"
                            value={contato}
                            onChange={(evento) => setContato(evento.target.value)}
                            required
                        />
                    </div>

                    <div className={estilos.campo}>
                        <label htmlFor="cor">Cor do cartão</label>

                        <select
                            id="cor"
                            value={cor}
                            onChange={(evento) =>
                                setCor(evento.target.value as 'azul' | 'roxo')
                            }
                        >
                            <option value="azul">Azul</option>
                            <option value="roxo">Roxo</option>
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
                        >
                            {modoEdicao
                                ? 'Salvar alterações'
                                : 'Cadastrar oficina'}
                        </button>

                        {modoEdicao && (
                            <>
                                <button
                                    type="button"
                                    className={estilos.botaoCancelar}
                                    onClick={descartarAlteracoes}
                                >
                                    Descartar alterações
                                </button>

                                <button
                                    type="button"
                                    className={estilos.botaoCancelar}
                                    onClick={removerOficina}
                                >
                                    Excluir oficina
                                </button>
                            </>
                        )}

                        <button
                            type="button"
                            className={estilos.botaoCancelar}
                            onClick={cancelar}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}
