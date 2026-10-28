import { useNavigate } from 'react-router-dom'
import estilos from './PainelAdmin.module.css'

export function PainelAdmin() {
    const navegar = useNavigate()

    return (
        <main className={estilos.painel}>
            <h1 className={estilos.titulo}>
                Painel Administrativo
            </h1>

            <p className={estilos.descricao}>
                Bem-vindo à área de gerenciamento do Psico-Acessível.
            </p>

            <section className={estilos.secao}>
                <h2 className={estilos.subtitulo}>
                    Gerenciar conteúdo
                </h2>

                <p className={estilos.texto}>
                    Selecione uma área para administrar os conteúdos do site.
                </p>

                <div className={estilos.listaBotoes}>
                    <button
                        type="button"
                        className={estilos.botao}
                        onClick={() => navegar('/admin/profissionais')}
                    >
                        Gerenciar profissionais
                    </button>

                    <button
                        type="button"
                        className={estilos.botao}
                        onClick={() => navegar('/admin/oficinas')}
                    >
                        Gerenciar oficinas
                    </button>

                    <button
                        type="button"
                        className={estilos.botao}
                        onClick={() => navegar('/admin/perguntas')}
                    >
                        Gerenciar perguntas e respostas
                    </button>

                    <button
                        type="button"
                        className={estilos.botao}
                        onClick={() => navegar('/admin/definicoes')}
                    >
                        Gerenciar definições
                    </button>

                    <button
                        type="button"
                        className={estilos.botao}
                        onClick={() => navegar('/admin/referencias')}
                    >
                        Gerenciar referências
                    </button>

                    <button
                        type="button"
                        className={estilos.botao}
                        onClick={() => navegar('/admin/profissionais')}
                    >
                        Gerenciar Profissionais da Região
                    </button>
                </div>
            </section>

<button
    type="button"
    className={estilos.botaoVoltar}
    onClick={() => navegar('/')}
>
    Voltar à página inicial
</button>
        </main>
    )
}
