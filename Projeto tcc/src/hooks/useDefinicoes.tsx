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
import { type Definicao } from '../tipos/Definicoes'

export function useDefinicoes() {

    const criarDefinicao = useCallback(async (
        dadosDefinicao: Definicao
    ): Promise<string> => {
        let retorno = 'sucesso'

        try {
            const colecao = collection(bancoDados, 'definicoes')
            const novaReferencia = doc(colecao)

            const novaDefinicao = {
                ...dadosDefinicao,
                codigo: novaReferencia.id
            }

            await setDoc(novaReferencia, novaDefinicao)

        } catch (error) {
            retorno = error instanceof FirebaseError
                ? `Erro ao adicionar definição! (${error.code}: ${error.message})`
                : `Erro imprevisto! (${error})`
        }

        return retorno
    }, [])

    const listarDefinicoes = useCallback(async (): Promise<Definicao[]> => {
        let definicoes: Definicao[] = []

        try {
            const colecao = collection(bancoDados, 'definicoes')
            const consulta = await getDocs(colecao)

            definicoes = consulta.docs.map((documento) => ({
                ...documento.data() as Definicao,
                codigo: documento.id
            }))

        } catch (error) {
            if (error instanceof FirebaseError) {
                console.error(
                    'Erro ao listar definições!',
                    error.code,
                    error.message
                )
            } else {
                console.error('Erro imprevisto ao listar definições:', error)
            }
        }

        return definicoes
    }, [])

    const buscarDefinicao = useCallback(async (
        codigoDefinicao: string
    ): Promise<Definicao | null> => {
        try {
            const definicaoReferencia = doc(
                bancoDados,
                'definicoes',
                codigoDefinicao
            )

            const consulta = await getDoc(definicaoReferencia)

            if (consulta.exists()) {
                return {
                    ...consulta.data() as Definicao,
                    codigo: consulta.id
                }
            }

            return null

        } catch (error) {
            if (error instanceof FirebaseError) {
                console.error(
                    'Erro ao buscar definição!',
                    error.code,
                    error.message
                )
            } else {
                console.error('Erro imprevisto ao buscar definição:', error)
            }

            return null
        }
    }, [])

    const alterarDefinicao = useCallback(async (
        dadosDefinicao: Definicao
    ): Promise<string> => {
        let retorno = 'sucesso'

        try {
            const definicaoReferencia = doc(
                bancoDados,
                'definicoes',
                dadosDefinicao.codigo
            )

           await updateDoc(definicaoReferencia, {
    titulo: dadosDefinicao.titulo,
    texto: dadosDefinicao.texto,
    cor: dadosDefinicao.cor
})

        } catch (error) {
            retorno = error instanceof FirebaseError
                ? `Erro ao alterar definição! (${error.code}: ${error.message})`
                : `Erro imprevisto! (${error})`
        }

        return retorno
    }, [])

    const excluirDefinicao = useCallback(async (
        codigoDefinicao: string
    ): Promise<string> => {
        let retorno = 'sucesso'

        try {
            const definicaoReferencia = doc(
                bancoDados,
                'definicoes',
                codigoDefinicao
            )

            await deleteDoc(definicaoReferencia)

        } catch (error) {
            retorno = error instanceof FirebaseError
                ? `Erro ao excluir definição! (${error.code}: ${error.message})`
                : `Erro imprevisto! (${error})`
        }

        return retorno
    }, [])

    return {
        criarDefinicao,
        listarDefinicoes,
        buscarDefinicao,
        alterarDefinicao,
        excluirDefinicao
    }
}