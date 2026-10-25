import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProfissionais } from '../../hooks/useProfissionais'
import { type Profissional } from '../../tipos/Profissional'
import estilos from './ProfissionaisFormulario.module.css'

export function ProfissionaisFormulario() {
    const { codigo } = useParams()
    const navegar = useNavigate()

    const {
        criarProfissional,
        buscarProfissional,
        alterarProfissional
    } = useProfissionais()

    const [dados, setDados] = useState<Profissional>({
        codigo: '',
        nome: '',
        descricao: '',
        especialidade: '',
        endereco: '',
        contato: ''
    })

    const [carregando, setCarregando] = useState(false)
    const [salvando, setSalvando] = useState(false)
    const [erro, setErro] = useState('')
    const [mensagem, setMensagem] = useState('')

    const editando = Boolean(codigo)

    useEffect(() => {
        let ativo = true

        async function carregarProfissional() {
            if (!codigo) return

            setCarregando(true)
            setErro('')

            try {
                const profissional = await buscarProfissional(codigo)

                if (ativo) {
                    if (profissional) {
                        setDados(profissional)
                    } else {
                        setErro('Profissional não encontrado.')
                    }
                }
            } catch (error) {
                console.error('Erro ao carregar profissional:', error)

                if (ativo) {
                    setErro('Não foi possível carregar os dados do profissional.')
                }
            } finally {
                if (ativo) {
                    setCarregando(false)
                }
            }
        }

        carregarProfissional()

        return () => {
            ativo = false
        }
    }, [codigo, buscarProfissional])

    function atualizarCampo(
        evento: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = evento.target

        setDados((dadosAnteriores) => ({
            ...dadosAnteriores,
            [name]: value
        }))
    }

    async function salvarProfissional(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()

        setErro('')
        setMensagem('')
        setSalvando(true)

        try {
            const retorno = editando
                ? await alterarProfissional(dados)
                : await criarProfissional(dados)

            if (retorno !== 'sucesso') {
                setErro(retorno)
                return
            }

            if (editando) {
                setMensagem('Profissional atualizado com sucesso!')
            } else {
                setMensagem('Profissional cadastrado com sucesso!')

                setDados({
                    codigo: '',
                    nome: '',
                    descricao: '',
                    especialidade: '',
                    endereco: '',
                    contato: ''
                })
            }
        } catch (error) {
            console.error('Erro ao salvar profissional:', error)
            setErro('Ocorreu um erro ao salvar os dados. Tente novamente.')
        } finally {
            setSalvando(false)
        }
    }

    if (carregando) {
        return (
            <main className={estilos.container}>
                <p>Carregando dados do profissional...</p>
            </main>
        )
    }

    return (
        <main className={estilos.container}>
            <section className={estilos.conteudo}>
                <h1 className={estilos.titulo}>
                    {editando ? 'Editar profissional' : 'Cadastrar profissional'}
                </h1>

                <p className={estilos.descricao}>
                    {editando
                        ? 'Atualize as informações do profissional.'
                        : 'Preencha os campos para cadastrar um profissional.'}
                </p>

                {erro && (
                    <p className={estilos.erro} role="alert">
                        {erro}
                    </p>
                )}

                {mensagem && (
                    <p className={estilos.sucesso} role="status">
                        {mensagem}
                    </p>
                )}

                <form
                    className={estilos.formulario}
                    onSubmit={salvarProfissional}
                >
                    <label htmlFor="nome">Nome completo</label>
                    <input
                        id="nome"
                        name="nome"
                        type="text"
                        value={dados.nome}
                        onChange={atualizarCampo}
                        placeholder="Digite o nome do profissional"
                        required
                    />

                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                        id="descricao"
                        name="descricao"
                        value={dados.descricao}
                        onChange={atualizarCampo}
                        placeholder="Apresente o profissional"
                        rows={4}
                        required
                    />

                    <label htmlFor="especialidade">Especialidade</label>
                    <input
                        id="especialidade"
                        name="especialidade"
                        type="text"
                        value={dados.especialidade}
                        onChange={atualizarCampo}
                        placeholder="Digite a especialidade"
                        required
                    />

                    <label htmlFor="endereco">Endereço</label>
                    <input
                        id="endereco"
                        name="endereco"
                        type="text"
                        value={dados.endereco}
                        onChange={atualizarCampo}
                        placeholder="Digite o endereço de atendimento"
                        required
                    />

                    <label htmlFor="contato">Contato</label>
                    <input
                        id="contato"
                        name="contato"
                        type="text"
                        value={dados.contato}
                        onChange={atualizarCampo}
                        placeholder="Telefone, e-mail ou outro contato"
                        required
                    />

                    <div className={estilos.botoes}>
                        <button
                            type="submit"
                            className={estilos.botaoSalvar}
                            disabled={salvando}
                        >
                            {salvando
                                ? 'Salvando...'
                                : editando
                                    ? 'Salvar alterações'
                                    : 'Cadastrar profissional'}
                        </button>

                        <button
                            type="button"
                            className={estilos.botaoCancelar}
                            onClick={() => navegar('/admin/profissionais')}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}