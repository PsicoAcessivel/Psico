
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDefinicoes } from '../../hooks/useDefinicoes'
import { type Definicao } from '../../tipos/Definicoes'
import estilos from './GerenciarDefinicoes.module.css'

export function GerenciarDefinicoes() {
    const [definicoes, setDefinicoes] = useState<Definicao[]>([])
    const [carregando, setCarregando] = useState(true)

    const navegar = useNavigate()
    const { listarDefinicoes } = useDefinicoes()

    useEffect(() => {
        let ativo = true

        async function buscarDefinicoes() {
            const resultado = await listarDefinicoes()

            if (ativo) {
                setDefinicoes(resultado)
                setCarregando(false)
            }
        }

        buscarDefinicoes()

        return () => {
            ativo = false
        }
    }, [listarDefinicoes])

    return (
        <main className={estilos.container}>
            <section className={estilos.conteudo}>
                <h1 className={estilos.titulo}>
                    Gerenciar definições
                </h1>

                <p className={estilos.descricao}>
                    Consulte, cadastre e gerencie as definições da biblioteca do Psico-Acessível.
                </p>

                <button
                    type="button"
                    className={estilos.botaoCadastrar}
                    onClick={() => navegar('/admin/definicoes/nova')}
                >
                    Cadastrar nova definição
                </button>

                {carregando ? (
                    <p className={estilos.mensagem}>
                        Carregando definições...
                    </p>
                ) : definicoes.length === 0 ? (
                    <p className={estilos.mensagem}>
                        Nenhuma definição cadastrada.
                    </p>
                ) : (
                    <div className={estilos.lista}>
                        {definicoes.map((definicao) => (
                            <button
                                key={definicao.codigo}
                                type="button"
                                className={`${estilos.definicao} ${
                                    definicao.cor === 'rosa'
                                        ? estilos.rosa
                                        : estilos.roxo
                                }`}
                                onClick={() =>
                                    navegar(
                                        `/admin/definicoes/editar/${definicao.codigo}`
                                    )
                                }
                            >
                                <span className={estilos.nome}>
                                    {definicao.titulo}
                                </span>

                                <span className={estilos.detalhe}>
                                    {definicao.texto}
                                </span>

                                <span className={estilos.acao}>
                                    Abrir para editar →
                                </span>
                            </button>
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
