import { useNavigate } from 'react-router-dom'
import { type Definicao } from '../../tipos/Definicoes'
import estilos from './GerenciarDefinicoes.module.css'

export function GerenciarDefinicoes() {
    const navegar = useNavigate()

    const definicoes: Definicao[] = [
        {
            codigo: 1,
            titulo: 'Saúde mental',
            texto: 'Refere-se ao bem-estar emocional, psicológico e social, que influencia a forma como pensamos, sentimos e agimos.',
            cor: 'rosa',
        },
        {
            codigo: 2,
            titulo: 'Ansiedade',
            texto: 'É uma reação natural diante de situações percebidas como incertas ou desafiadoras. Quando intensa ou persistente, pode exigir atenção profissional.',
            cor: 'roxo',
        },
        {
            codigo: 3,
            titulo: 'Autocuidado',
            texto: 'É o conjunto de atitudes e hábitos que ajudam a cuidar da saúde física, emocional e social.',
            cor: 'rosa',
        },
    ]

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

                {definicoes.length === 0 ? (
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
