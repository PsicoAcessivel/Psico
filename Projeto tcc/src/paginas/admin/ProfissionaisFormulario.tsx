import { useState, type FormEvent, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Profissional } from '../../tipos/Profissional'
import estilos from './ProfissionaisFormulario.module.css'

const dadosVazios: Profissional = {
    codigo: '',
    nome: '',
    descricao: '',
    especialidade: '',
    endereco: '',
    contato: ''
}

export function ProfissionaisFormulario() {
    const navegar = useNavigate()

    const [dados, setDados] = useState<Profissional>(dadosVazios)
    const [mensagem, setMensagem] = useState('')

    function atualizarCampo(
        evento: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = evento.target

        setDados((dadosAnteriores) => ({
            ...dadosAnteriores,
            [name]: value
        }))
    }

    function salvarProfissional(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()

        setMensagem(
            'Demonstração concluída! Os dados não foram salvos permanentemente.'
        )

        setDados(dadosVazios)
    }

    return (
        <main className={estilos.container}>
            <section className={estilos.conteudo}>
                <h1 className={estilos.titulo}>
                    Cadastrar profissional
                </h1>

                <p className={estilos.descricao}>
                    Preencha os campos para simular o cadastro de um profissional.
                </p>

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
                        >
                            Simular cadastro
                        </button>

                        <button
                            type="button"
                            className={estilos.botaoCancelar}
                            onClick={() => navegar('/admin/profissionais')}
                        >
                            Voltar
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}