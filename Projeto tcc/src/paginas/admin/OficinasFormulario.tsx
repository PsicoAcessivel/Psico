import { useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { type Oficina } from '../../tipos/Oficina'
import estilos from './OficinasFormulario.module.css'

// Oficinas de demonstração
const oficinasIniciais: Oficina[] = [
    {
        codigo: '1',
        nome: 'Oficina de Dança',
        endereco: 'Hortolândia - SP',
        contato: 'Contato demonstrativo',
        cor: 'azul',
    },
    {
        codigo: '2',
        nome: 'Oficina de Artes',
        endereco: 'Sumaré - SP',
        contato: 'Contato demonstrativo',
        cor: 'roxo',
    },
]

const oficinasDemo = [...oficinasIniciais]
let proximoCodigo = 3

export function OficinasFormulario() {
    const { codigo } = useParams()
    const navegar = useNavigate()

    const oficinaEncontrada = codigo
        ? oficinasDemo.find((item) => item.codigo === codigo) ?? null
        : null

    const [nome, setNome] = useState(oficinaEncontrada?.nome ?? '')
    const [endereco, setEndereco] = useState(
        oficinaEncontrada?.endereco ?? ''
    )
    const [contato, setContato] = useState(
        oficinaEncontrada?.contato ?? ''
    )
    const [cor, setCor] = useState<'azul' | 'roxo'>(
        oficinaEncontrada?.cor ?? 'azul'
    )

    const [oficinaOriginal, setOficinaOriginal] =
        useState<Oficina | null>(oficinaEncontrada)

    const [carregando, setCarregando] = useState(false)

    const [mensagem, setMensagem] = useState(
        codigo && !oficinaEncontrada
            ? 'Oficina não encontrada na demonstração.'
            : ''
    )

    const modoEdicao = Boolean(codigo)

    function salvarOficina(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()

        setMensagem('')
        setCarregando(true)

        const dadosOficina: Oficina = {
            codigo: codigo ?? String(proximoCodigo),
            nome: nome.trim(),
            endereco: endereco.trim(),
            contato: contato.trim(),
            cor,
        }

        if (modoEdicao) {
            const indice = oficinasDemo.findIndex(
                (item) => item.codigo === codigo
            )

            if (indice === -1) {
                setMensagem('Oficina não encontrada.')
                setCarregando(false)
                return
            }

            oficinasDemo[indice] = dadosOficina
            setOficinaOriginal(dadosOficina)
            setMensagem('Oficina alterada com sucesso na demonstração!')
        } else {
            oficinasDemo.push(dadosOficina)
            proximoCodigo += 1

            setNome('')
            setEndereco('')
            setContato('')
            setCor('azul')

            setMensagem('Oficina cadastrada com sucesso na demonstração!')
        }

        setCarregando(false)
    }

    function cancelar() {
        navegar('/admin/oficinas')
    }

    function descartarAlteracoes() {
        if (!oficinaOriginal) return

        setNome(oficinaOriginal.nome)
        setEndereco(oficinaOriginal.endereco)
        setContato(oficinaOriginal.contato)
        setCor(oficinaOriginal.cor)
        setMensagem('')
    }

    function removerOficina() {
        if (!codigo || carregando) return

        const confirmar = window.confirm(
            `Deseja realmente excluir a oficina "${nome}" da demonstração?`
        )

        if (!confirmar) return

        const indice = oficinasDemo.findIndex(
            (item) => item.codigo === codigo
        )

        if (indice === -1) {
            setMensagem('Oficina não encontrada.')
            return
        }

        oficinasDemo.splice(indice, 1)
        navegar('/admin/oficinas')
    }

    if (modoEdicao && !oficinaOriginal) {
        return (
            <main className={estilos.container}>
                <section className={estilos.conteudo}>
                    <h1 className={estilos.titulo}>
                        Oficina não encontrada
                    </h1>

                    <p className={estilos.descricao} role="alert">
                        {mensagem ||
                            'Não foi possível carregar os dados da oficina.'}
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

                <form
                    className={estilos.formulario}
                    onSubmit={salvarOficina}
                >
                    <div className={estilos.campo}>
                        <label htmlFor="nome">Nome da oficina</label>

                        <input
                            id="nome"
                            type="text"
                            placeholder="Ex.: Studio de Dança"
                            value={nome}
                            onChange={(evento) =>
                                setNome(evento.target.value)
                            }
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
                            onChange={(evento) =>
                                setEndereco(evento.target.value)
                            }
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
                            onChange={(evento) =>
                                setContato(evento.target.value)
                            }
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
                                  : 'Cadastrar oficina'}
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
                                    onClick={removerOficina}
                                    disabled={carregando}
                                >
                                    Excluir oficina
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
