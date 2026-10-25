import { useEffect, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useOficinas } from '../hooks/useOficinas'
import { type Oficina } from '../tipos/Oficina'
import estilos from './Oficinas.module.css'

export function Oficinas() {
    const { listarOficinas } = useOficinas()

    const [oficinas, setOficinas] = useState<Oficina[]>([])
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        let ativo = true

        async function carregarOficinas() {
            const resultado = await listarOficinas()

            if (ativo) {
                setOficinas(resultado)
                setCarregando(false)
            }
        }

        carregarOficinas()

        return () => {
            ativo = false
        }
    }, [listarOficinas])

    return (
        <main className={estilos.container}>
            <section className={estilos.conteudo}>
                <h1 className={estilos.titulo}>
                    Sugestão de Oficinas
                </h1>

                {carregando ? (
                    <p>Carregando oficinas...</p>
                ) : oficinas.length === 0 ? (
                    <p>Nenhuma oficina cadastrada no momento.</p>
                ) : (
                    <div className={estilos.grid}>
                        {oficinas.map((item) => (
                            <div
                                key={item.codigo}
                                className={`${estilos.card} ${
                                    item.cor === 'azul'
                                        ? estilos.azul
                                        : estilos.roxo
                                }`}
                            >
                                <div className={estilos.icone}>
                                    <FaMapMarkerAlt />
                                </div>

                                <div className={estilos.info}>
                                    <h3>{item.nome}</h3>
<p>Endereço: {item.endereco}</p>
<span>Celular: {item.contato}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}
