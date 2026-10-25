
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
import { type Oficina } from '../tipos/Oficina'

export function useOficinas() {

    const criarOficina = async (dadosOficina: Oficina): Promise<string> => {
        let retorno = 'sucesso'

        try {
            const colecao = collection(bancoDados, 'oficinas')
            const novaReferencia = doc(colecao)

            dadosOficina.codigo = novaReferencia.id

            await setDoc(novaReferencia, dadosOficina)

        } catch (error) {
            retorno = error instanceof FirebaseError
                ? `Erro ao adicionar oficina! (${error.code}: ${error.message})`
                : `Erro imprevisto! (${error})`
        }

        return retorno
    }

    const listarOficinas = useCallback(async (): Promise<Oficina[]> => {
        const oficinas: Oficina[] = []

        try {
            const colecao = collection(bancoDados, 'oficinas')
            const consulta = await getDocs(colecao)

            consulta.forEach((documento) => {
                oficinas.push({
                    ...documento.data(),
                    codigo: documento.id
                } as Oficina)
            })

        } catch (error) {
            console.error('Erro ao listar oficinas:', error)
        }

        return oficinas
    }, [])

    const buscarOficina = useCallback(async (
        codigoOficina: string
    ): Promise<Oficina | null> => {
        try {
            const referencia = doc(
                bancoDados,
                'oficinas',
                codigoOficina
            )

            const consulta = await getDoc(referencia)

            if (consulta.exists()) {
                return {
                    ...consulta.data(),
                    codigo: consulta.id
                } as Oficina
            }

            return null

        } catch (error) {
            console.error('Erro ao buscar oficina:', error)
            return null
        }
    }, [])

    const alterarOficina = async (dadosOficina: Oficina): Promise<string> => {
        let retorno = 'sucesso'

        try {
            const oficinasReferencia = doc(
                bancoDados,
                'oficinas',
                dadosOficina.codigo
            )

            await updateDoc(oficinasReferencia, dadosOficina)

        } catch (error) {
            retorno = error instanceof FirebaseError
                ? `Erro ao alterar oficina! (${error.code}: ${error.message})`
                : `Erro imprevisto! (${error})`
        }

        return retorno
    }

    const excluirOficina = async (codigoOficina: string): Promise<string> => {
        let retorno = 'sucesso'

        try {
            const oficinasReferencia = doc(
                bancoDados,
                'oficinas',
                codigoOficina
            )

            await deleteDoc(oficinasReferencia)

        } catch (error) {
            retorno = error instanceof FirebaseError
                ? `Erro ao excluir oficina! (${error.code}: ${error.message})`
                : `Erro imprevisto! (${error})`
        }

        return retorno
    }

    return {
        criarOficina,
        listarOficinas,
        buscarOficina,
        alterarOficina,
        excluirOficina
    }
}
