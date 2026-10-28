import { useNavigate } from 'react-router-dom'
import { type Referencia } from '../../tipos/Referencia'
import estilos from './GerenciarReferencias.module.css'

const referencias: Referencia[] = [
    {
        codigo: '1',
        tema: 'Saúde mental',
        autor: 'Organização Mundial da Saúde',
        titulo: 'Saúde mental: fortalecimento da nossa resposta',
        ano: '2022',
        link: 'https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response',
    },
]

export function GerenciarReferencias() {
    const navegar = useNavigate()

    return (
        <main className={estilos.container}>
            <section className={estilos.conteudo}>
                <h1 className={estilos.titulo}>
                    Gerenciar referências
                </h1>

                <p className={estilos.descricao}>
                    Consulte as referências bibliográficas do Psico-Acessível.
                </p>

                <button
                    type="button"
                    className={estilos.botaoCadastrar}
                    onClick={() => navegar('/admin/referencias/nova')}
                >
                    Cadastrar nova referência
                </button>

                {referencias.length === 0 ? (
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
                                        <a
                                            href={referencia.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Acessar referência
                                        </a>
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
