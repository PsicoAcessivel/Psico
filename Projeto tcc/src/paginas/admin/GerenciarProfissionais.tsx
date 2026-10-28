import { useNavigate } from 'react-router-dom'
import { type Profissional } from '../../tipos/Profissional'
import estilos from './GerenciarProfissionais.module.css'

const profissionais: Profissional[] = [
    {
        codigo: '1',
        nome: 'Profissional de Psicologia',
        especialidade: 'Psicologia',
        descricao:
            'Profissional ilustrativo para apresentar informações sobre saúde mental.',
        endereco: 'Hortolândia - SP',
        contato: 'Contato demonstrativo',
    },
    {
        codigo: '2',
        nome: 'Profissional de Assistência Social',
        especialidade: 'Assistência Social',
        descricao:
            'Profissional ilustrativo para apresentar informações sobre apoio social.',
        endereco: 'Sumaré - SP',
        contato: 'Contato demonstrativo',
    },
]

export function GerenciarProfissionais() {
    const navegar = useNavigate()

    return (
        <main className={estilos.container}>
            <section className={estilos.conteudo}>
                <h1 className={estilos.titulo}>
                    Gerenciar profissionais
                </h1>

                <p className={estilos.descricao}>
                    Consulte os profissionais apresentados no Psico-Acessível.
                </p>

                <button
                    type="button"
                    className={estilos.botaoCadastrar}
                    onClick={() => navegar('/admin/profissionais/novo')}
                >
                    Cadastrar novo profissional
                </button>

                {profissionais.length === 0 ? (
                    <p className={estilos.mensagem}>
                        Nenhum profissional cadastrado.
                    </p>
                ) : (
                    <div className={estilos.lista}>
                        {profissionais.map((profissional) => (
                            <article
                                key={profissional.codigo}
                                className={estilos.profissional}
                            >
                                <div className={estilos.informacoes}>
                                    <h2 className={estilos.nome}>
                                        {profissional.nome}
                                    </h2>

                                    <p>
                                        <strong>Especialidade:</strong>{' '}
                                        {profissional.especialidade}
                                    </p>

                                    <p>
                                        <strong>Descrição:</strong>{' '}
                                        {profissional.descricao}
                                    </p>

                                    <p>
                                        <strong>Endereço:</strong>{' '}
                                        {profissional.endereco}
                                    </p>

                                    <p>
                                        <strong>Contato:</strong>{' '}
                                        {profissional.contato}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className={estilos.botaoEditar}
                                    onClick={() =>
                                        navegar(
                                            `/admin/profissionais/editar/${profissional.codigo}`
                                        )
                                    }
                                >
                                    Editar profissional
                                </button>
                            </article>
                        ))}
                    </div>
                )}

                <button
                    type="button"
                    className={estilos.botaoVoltar}
                    onClick={() => navegar('/admin')}
                >
                    Voltar ao painel
                </button>
            </section>
        </main>
    )
}
