import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOficinas } from '../../hooks/useOficinas'
import { type Oficina } from '../../tipos/Oficina'
import estilos from './GerenciarOficinas.module.css'

export function GerenciarOficinas() {
    const [oficinas, setOficinas] = useState<Oficina[]>([])
    const [carregando, setCarregando] = useState(true)
    const navegar = useNavigate()
    const { listarOficinas } = useOficinas()

    useEffect(() => {
        async function buscarOficinas() {
            const resultado = await listarOficinas()

            setOficinas(resultado)
            setCarregando(false)
        }

        buscarOficinas()
    }, [])

    return (
        <main className={estilos.container}>
            <section className={estilos.conteudo}>
                <h1 className={estilos.titulo}>
                    Gerenciar oficinas
                </h1>

                <p className={estilos.descricao}>
                    Consulte, cadastre e gerencie as oficinas do Psico-Acessível.
                </p>

                <button
                    type="button"
                    className={estilos.botaoCadastrar}
                    onClick={() => navegar('/admin/oficinas/nova')}
                >
                    Cadastrar nova oficina
                </button>

                {carregando ? (
                    <p className={estilos.mensagem}>
                        Carregando oficinas...
                    </p>
                ) : oficinas.length === 0 ? (
                    <p className={estilos.mensagem}>
                        Nenhuma oficina cadastrada.
                    </p>
                ) : (
                    <div className={estilos.lista}>
                        {oficinas.map((oficina) => (
                            <button
                                key={oficina.codigo}
                                type="button"
                                className={`${estilos.oficina} ${
                                    oficina.cor === 'roxo'
                                        ? estilos.roxo
                                        : estilos.azul
                                }`}
                                onClick={() =>
                                    navegar(`/admin/oficinas/editar/${oficina.codigo}`)
                                }
                            >
                                <span className={estilos.nome}>
                                    {oficina.nome}
                                </span>

                                <span className={estilos.detalhe}>
                                    Endereço: {oficina.endereco}
                                </span>

                                <span className={estilos.detalhe}>
                                    Contato: {oficina.contato}
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