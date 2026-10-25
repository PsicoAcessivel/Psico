import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfissionais } from '../../hooks/useProfissionais'
import { type Profissional } from '../../tipos/Profissional'
import estilos from './GerenciarProfissionais.module.css'

export function GerenciarProfissionais() {
    const [profissionais, setProfissionais] = useState<Profissional[]>([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')

    const navegar = useNavigate()
    const { listarProfissionais } = useProfissionais()

    useEffect(() => {
        let ativo = true

        async function carregarProfissionais() {
            try {
                const resultado = await listarProfissionais()

                if (ativo) {
                    setProfissionais(resultado)
                }
            } catch (error) {
                console.error('Erro ao carregar profissionais:', error)

                if (ativo) {
                    setErro('Não foi possível carregar os profissionais.')
                }
            } finally {
                if (ativo) {
                    setCarregando(false)
                }
            }
        }

        carregarProfissionais()

        return () => {
            ativo = false
        }
    }, [listarProfissionais])

    return (
        <main className={estilos.container}>
            <section className={estilos.conteudo}>
                <h1 className={estilos.titulo}>
                    Gerenciar profissionais
                </h1>

                <p className={estilos.descricao}>
                    Consulte, cadastre, edite e exclua os profissionais
                    do Psico-Acessível.
                </p>

                <button
                    type="button"
                    className={estilos.botaoCadastrar}
                    onClick={() => navegar('/admin/profissionais/novo')}
                >
                    Cadastrar novo profissional
                </button>

                {carregando ? (
                    <p className={estilos.mensagem}>
                        Carregando profissionais...
                    </p>
                ) : erro ? (
                    <p className={estilos.mensagem} role="alert">
                        {erro}
                    </p>
                ) : profissionais.length === 0 ? (
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