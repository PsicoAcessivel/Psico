    import { useCallback } from 'react'
    import { bancoDados } from '../firebase/FirebaseConexao'
    import {
        collection,
        setDoc,
        doc,
        updateDoc,
        deleteDoc,
        getDocs,
        getDoc
    } from 'firebase/firestore'
    import { FirebaseError } from 'firebase/app'
    import { type Profissional } from '../tipos/Profissional'

    export function useProfissionais() {
        const criarProfissional = useCallback(async (
            dadosProfissional: Profissional
        ): Promise<string> => {
            try {
                const colecao = collection(bancoDados, 'profissionais')
                const novaReferencia = doc(colecao)

                await setDoc(novaReferencia, {
                    ...dadosProfissional,
                    codigo: novaReferencia.id
                })

                return 'sucesso'
            } catch (error) {
                return error instanceof FirebaseError
                    ? `Erro ao adicionar profissional! (${error.code}: ${error.message})`
                    : `Erro imprevisto! (${error})`
            }
        }, [])

        const listarProfissionais = useCallback(async (): Promise<Profissional[]> => {
            try {
                const colecao = collection(bancoDados, 'profissionais')
                const consulta = await getDocs(colecao)

                return consulta.docs.map((documento) => ({
                    ...documento.data() as Profissional,
                    codigo: documento.id
                }))
            } catch (error) {
                if (error instanceof FirebaseError) {
                    console.error(
                        'Erro ao listar profissionais!',
                        error.code,
                        error.message
                    )
                } else {
                    console.error('Erro imprevisto ao listar profissionais:', error)
                }

                return []
            }
        }, [])

        const buscarProfissional = useCallback(async (
            codigoProfissional: string
        ): Promise<Profissional | null> => {
            try {
                const referencia = doc(
                    bancoDados,
                    'profissionais',
                    codigoProfissional
                )

                const resultado = await getDoc(referencia)

                if (!resultado.exists()) {
                    return null
                }

                return {
                    ...resultado.data() as Profissional,
                    codigo: resultado.id
                }
            } catch (error) {
                if (error instanceof FirebaseError) {
                    console.error(
                        'Erro ao buscar profissional!',
                        error.code,
                        error.message
                    )
                } else {
                    console.error('Erro imprevisto ao buscar profissional:', error)
                }

                throw error
            }
        }, [])

        const alterarProfissional = useCallback(async (
            dadosProfissional: Profissional
        ): Promise<string> => {
            try {
                const referencia = doc(
                    bancoDados,
                    'profissionais',
                    dadosProfissional.codigo
                )

                await updateDoc(referencia, {
                    nome: dadosProfissional.nome,
                    descricao: dadosProfissional.descricao,
                    especialidade: dadosProfissional.especialidade,
                    endereco: dadosProfissional.endereco,
                    contato: dadosProfissional.contato
                })

                return 'sucesso'
            } catch (error) {
                return error instanceof FirebaseError
                    ? `Erro ao alterar profissional! (${error.code}: ${error.message})`
                    : `Erro imprevisto! (${error})`
            }
        }, [])

        const excluirProfissional = useCallback(async (
            codigoProfissional: string
        ): Promise<string> => {
            try {
                const referencia = doc(
                    bancoDados,
                    'profissionais',
                    codigoProfissional
                )

                await deleteDoc(referencia)

                return 'sucesso'
            } catch (error) {
                return error instanceof FirebaseError
                    ? `Erro ao excluir profissional! (${error.code}: ${error.message})`
                    : `Erro imprevisto! (${error})`
            }
        }, [])

        return {
            criarProfissional,
            listarProfissionais,
            buscarProfissional,
            alterarProfissional,
            excluirProfissional
        }
    }