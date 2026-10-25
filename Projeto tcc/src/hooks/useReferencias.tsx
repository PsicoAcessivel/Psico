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
import { type Referencia } from '../tipos/Referencia'

export function useReferencias() {

    const criarReferencia = useCallback(async (
        dadosReferencia: Referencia
    ): Promise<string> => {
        let retorno = 'sucesso'

        try {
            const colecao = collection(bancoDados, 'referencias')
            const novaReferencia = doc(colecao)

            await setDoc(novaReferencia, {
                ...dadosReferencia,
                codigo: novaReferencia.id
            })

        } catch (error) {
            retorno = error instanceof FirebaseError
                ? `Erro ao adicionar referência! (${error.code}: ${error.message})`
                : `Erro imprevisto! (${error})`
        }

        return retorno
    }, [])

    const listarReferencias = useCallback(async (): Promise<Referencia[]> => {
        let referencias: Referencia[] = []

        try {
            const colecao = collection(bancoDados, 'referencias')
            const consulta = await getDocs(colecao)

            referencias = consulta.docs.map((documento) => ({
                ...documento.data() as Referencia,
                codigo: documento.id
            }))

        } catch (error) {
            if (error instanceof FirebaseError) {
                console.error(
                    'Erro ao listar referências!',
                    error.code,
                    error.message
                )
            } else {
                console.error('Erro imprevisto ao listar referências:', error)
            }
        }

        return referencias
    }, [])

    const buscarReferencia = useCallback(async (
        codigoReferencia: string
    ): Promise<Referencia | null> => {
        try {
            const referenciaDocumento = doc(
                bancoDados,
                'referencias',
                codigoReferencia
            )

            const consulta = await getDoc(referenciaDocumento)

            if (consulta.exists()) {
                return {
                    ...consulta.data() as Referencia,
                    codigo: consulta.id
                }
            }

            return null

        } catch (error) {
            if (error instanceof FirebaseError) {
                console.error(
                    'Erro ao buscar referência!',
                    error.code,
                    error.message
                )
            } else {
                console.error('Erro imprevisto ao buscar referência:', error)
            }

            return null
        }
    }, [])

    const alterarReferencia = useCallback(async (
        dadosReferencia: Referencia
    ): Promise<string> => {
        let retorno = 'sucesso'

        try {
            const referenciaDocumento = doc(
                bancoDados,
                'referencias',
                dadosReferencia.codigo
            )

            await updateDoc(referenciaDocumento, {
                tema: dadosReferencia.tema,
                autor: dadosReferencia.autor,
                titulo: dadosReferencia.titulo,
                ano: dadosReferencia.ano,
                link: dadosReferencia.link
            })

        } catch (error) {
            retorno = error instanceof FirebaseError
                ? `Erro ao alterar referência! (${error.code}: ${error.message})`
                : `Erro imprevisto! (${error})`
        }

        return retorno
    }, [])

    const excluirReferencia = useCallback(async (
        codigoReferencia: string
    ): Promise<string> => {
        let retorno = 'sucesso'

        try {
            const referenciaDocumento = doc(
                bancoDados,
                'referencias',
                codigoReferencia
            )

            await deleteDoc(referenciaDocumento)

        } catch (error) {
            retorno = error instanceof FirebaseError
                ? `Erro ao excluir referência! (${error.code}: ${error.message})`
                : `Erro imprevisto! (${error})`
        }

        return retorno
    }, [])

    return {
        criarReferencia,
        listarReferencias,
        buscarReferencia,
        alterarReferencia,
        excluirReferencia
    }
}