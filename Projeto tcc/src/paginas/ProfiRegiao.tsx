import { useEffect, useState } from 'react'
import { AiFillCaretLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useProfissionais } from '../hooks/useProfissionais'
import { type Profissional } from '../tipos/Profissional'
import estilos from './ProfiRegiao.module.css'

export function ProfiRegiao() {
    const [profissionais, setProfissionais] = useState<Profissional[]>([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(false)

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
                    setErro(true)
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
        <main className={estilos.conteiner}>
            <div className={estilos.cabecalho}>
                <Link
                    className={estilos.link}
                    to="/profissionais"
                    aria-label="Voltar para profissionais"
                >
                    <AiFillCaretLeft />
                </Link>

                <h1 className={estilos.titulo}>
                    Profissionais da Região
                </h1>
            </div>

            <h2 className={estilos.subtitulo}>
                Onde encontrá-los?
            </h2>

            {carregando ? (
                <p>Carregando profissionais...</p>
            ) : erro ? (
                <p role="alert">
                    Não foi possível carregar os profissionais no momento.
                </p>
            ) : profissionais.length === 0 ? (
                <p>
                    Nenhum profissional cadastrado no momento.
                </p>
            ) : (
                <div className={estilos.profissionais}>
                    {profissionais.map((profissional, indice) => (
                        <div
                            key={profissional.codigo}
                            className={
                                indice % 2 === 0
                                    ? estilos.profissional1
                                    : estilos.profissional2
                            }
                        >
                            <h3 className={estilos.nome}>
                                {profissional.nome}
                            </h3>

                            <p className={estilos.descricao}>
                                {profissional.descricao}
                            </p>

                            <p className={estilos.especialidadeTi}>
                                Especialidade:
                            </p>

                            <p className={estilos.especialidadeTe}>
                                {profissional.especialidade}
                            </p>

                            <p className={estilos.enderecoTi}>
                                Endereço:
                            </p>

                            <p className={estilos.enderecoTe}>
                                {profissional.endereco}
                            </p>

                            <p className={estilos.contatoTi}>
                                Contato:
                            </p>

                            <p className={estilos.contatoTe}>
                                {profissional.contato}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}