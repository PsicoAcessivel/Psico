import { useEffect, useState } from 'react'
import { useDefinicoes } from '../hooks/useDefinicoes'
import { type Definicao } from '../tipos/Definicoes'
import estilos from './Definicoes.module.css'

export function Definicoes() {
    const [definicoes, setDefinicoes] = useState<Definicao[]>([])
    const [carregando, setCarregando] = useState(true)

    const { listarDefinicoes } = useDefinicoes()

    useEffect(() => {
        let ativo = true

        async function buscarDefinicoes() {
            try {
                const resultado = await listarDefinicoes()

                if (ativo) {
                    setDefinicoes(resultado)
                }
            } catch {
                if (ativo) {
                    setDefinicoes([])
                }
            } finally {
                if (ativo) {
                    setCarregando(false)
                }
            }
        }

        buscarDefinicoes()

        return () => {
            ativo = false
        }
    }, [listarDefinicoes])

    return (
        <div className={estilos.container}>
            <section className={estilos.conteudo}>
                <h2 className={estilos.titulo1}>
                    Biblioteca de Conteúdos/Definições
                </h2>

                {carregando ? (
                    <p>Carregando definições...</p>
                ) : definicoes.length === 0 ? (
                    <p>Nenhuma definição disponível no momento.</p>
                ) : (
                    <div className={estilos.grid}>
                        {definicoes.map((definicao) => (
                            <div
                                key={definicao.codigo}
                                className={`${estilos.card} ${
                                    definicao.cor === 'rosa'
                                        ? estilos.rosa
                                        : estilos.roxo
                                }`}
                            >
                                <div className={estilos.info}>
                                    <h2>{definicao.titulo}</h2>
                                    <p>{definicao.texto}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}
                            