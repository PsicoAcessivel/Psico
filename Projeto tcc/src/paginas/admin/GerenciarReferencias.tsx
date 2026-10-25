import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReferencias } from '../../hooks/useReferencias'
import { type Referencia } from '../../tipos/Referencia'
import estilos from './GerenciarReferencias.module.css'

export function GerenciarReferencias() {
    const [referencias, setReferencias] = useState<Referencia[]>([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')

    const navegar = useNavigate()
    const { listarReferencias } = useReferencias()

    useEffect(() => {
        let ativo = true

        async function carregarReferencias() {
            try {
                const resultado = await listarReferencias()

                if (ativo) {
                    setReferencias(resultado)
                }
            } catch (error) {
                console.error('Erro ao carregar referências:', error)

                if (ativo) {
                    setErro('Não foi possível carregar as referências.')
                }
            } finally {
                if (ativo) {
                    setCarregando(false)
                }
            }
        }

        carregarReferencias()

        return () => {
            ativo = false
        }
    }, [listarReferencias])

    return (
        <main className={estilos.container}>
            <section className={estilos.conteudo}>
                <h1 className={estilos.titulo}>
                    Gerenciar referências
                </h1>

                <p className={estilos.descricao}>
                    Consulte, cadastre, edite e exclua as referências
                    bibliográficas do Psico-Acessível.
                </p>

                <button
                    type="button"
                    className={estilos.botaoCadastrar}
                    onClick={() => navegar('/admin/referencias/nova')}
                >
                    Cadastrar nova referência
                </button>

                {carregando ? (
                    <p>Carregando referências...</p>
                ) : erro ? (
                    <p role="alert">{erro}</p>
                ) : referencias.length === 0 ? (
                    <p>Nenhuma referência cadastrada.</p>
                ) : (
                    <div className={estilos.lista}>
                        {referencias.map((referencia) => (
                            <article
                                key={referencia.codigo}
                                className={estilos.referencia}
                            >
                                <div className={estilos.informacoes}>
                                    <h2>{referencia.tema}</h2>

                                    <p>
                                        <strong>Autor:</strong>{' '}
                                        {referencia.autor}
                                    </p>

                                    <p>
                                        <strong>Título:</strong>{' '}
                                        {referencia.titulo}
                                    </p>

                                    <p>
                                        <strong>Ano:</strong>{' '}
                                        {referencia.ano}
                                    </p>

                                    <p>
                                        <strong>Link:</strong>{' '}
                                        {referencia.link}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className={estilos.botaoEditar}
                                    onClick={() =>
                                        navegar(
                                            `/admin/referencias/editar/${referencia.codigo}`
                                        )
                                    }
                                >
                                    Editar referência
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