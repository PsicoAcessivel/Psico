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
import { type PerguntaResposta } from '../tipos/PerguntaResposta'

export function usePerguntasRespostas() {

    const criarPerguntaResposta = useCallback(async (
        dadosPerguntaResposta: PerguntaResposta
    ): Promise<string> => {
        try {
            const colecao = collection(bancoDados, 'perguntasRespostas')
            const novaReferencia = doc(colecao)

            await setDoc(novaReferencia, {
                ...dadosPerguntaResposta,
                codigo: novaReferencia.id
            })

            return 'sucesso'
        } catch (error) {
            return error instanceof FirebaseError
                ? `Erro ao adicionar pergunta e resposta! (${error.code}: ${error.message})`
                : `Erro imprevisto! (${error})`
        }
    }, [])

    const listarPerguntasRespostas = useCallback(async (): Promise<PerguntaResposta[]> => {
        try {
            const colecao = collection(bancoDados, 'perguntasRespostas')
            const consulta = await getDocs(colecao)

            return consulta.docs.map((documento) => ({
                ...documento.data() as PerguntaResposta,
                codigo: documento.id
            }))
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.error(
                    'Erro ao listar perguntas e respostas!',
                    error.code,
                    error.message
                )
            } else {
                console.error('Erro imprevisto ao listar perguntas e respostas:', error)
            }

            return []
        }
    }, [])

    const buscarPerguntaResposta = useCallback(async (
        codigoPerguntaResposta: string
    ): Promise<PerguntaResposta | null> => {
        try {
            const referencia = doc(
                bancoDados,
                'perguntasRespostas',
                codigoPerguntaResposta
            )

            const resultado = await getDoc(referencia)

            if (!resultado.exists()) {
                return null
            }

            return {
                ...resultado.data() as PerguntaResposta,
                codigo: resultado.id
            }
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.error(
                    'Erro ao buscar pergunta e resposta!',
                    error.code,
                    error.message
                )
            } else {
                console.error('Erro imprevisto ao buscar pergunta e resposta:', error)
            }

            throw error
        }
    }, [])

    const alterarPerguntaResposta = useCallback(async (
        dadosPerguntaResposta: PerguntaResposta
    ): Promise<string> => {
        try {
            const referencia = doc(
                bancoDados,
                'perguntasRespostas',
                dadosPerguntaResposta.codigo
            )

            await updateDoc(referencia, {
                categoria: dadosPerguntaResposta.categoria,
                pergunta: dadosPerguntaResposta.pergunta,
                resposta: dadosPerguntaResposta.resposta
            })

            return 'sucesso'
        } catch (error) {
            return error instanceof FirebaseError
                ? `Erro ao alterar pergunta e resposta! (${error.code}: ${error.message})`
                : `Erro imprevisto! (${error})`
        }
    }, [])

    const excluirPerguntaResposta = useCallback(async (
        codigoPerguntaResposta: string
    ): Promise<string> => {
        try {
            const referencia = doc(
                bancoDados,
                'perguntasRespostas',
                codigoPerguntaResposta
            )

            await deleteDoc(referencia)

            return 'sucesso'
        } catch (error) {
            return error instanceof FirebaseError
                ? `Erro ao excluir pergunta e resposta! (${error.code}: ${error.message})`
                : `Erro imprevisto! (${error})`
        }
    }, [])

    return {
        criarPerguntaResposta,
        listarPerguntasRespostas,
        buscarPerguntaResposta,
        alterarPerguntaResposta,
        excluirPerguntaResposta
    }
}