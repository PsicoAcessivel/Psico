import { bancoDados } from '../firebase/FirebaseConexao'
import {
    collection,
    setDoc,
    doc,
    updateDoc,
    deleteDoc,
    getDocs
} from 'firebase/firestore'
import { FirebaseError } from 'firebase/app'
import { type UsuarioTipo } from '../tipos/Usuario'

// As funções de manipulação de usuários serão disponibilizadas como um Custom Hook
export function useUsuario() {

    const criarUsuario = async (dadosUsuario: UsuarioTipo): Promise<string> => {
        let retorno = 'sucesso'

        try {
            // Consulta ou cria a coleção
            const colecao = collection(bancoDados, 'usuarios')

            // Gera uma referência de documento com um ID único
            const novaReferencia = doc(colecao)

            // Armazena o ID gerado no campo codigo
            dadosUsuario.codigo = novaReferencia.id

            // Grava os dados do usuário no Firestore
            await setDoc(novaReferencia, dadosUsuario)

        } catch (error) {
            retorno = error instanceof FirebaseError
                ? `Erro ao adicionar usuário! (${error.code}: ${error.message})`
                : `Erro imprevisto! (${error})`
        }

        return retorno
    }

    const alterarUsuario = async (dadosUsuario: UsuarioTipo): Promise<string> => {
        let retorno = 'sucesso'

        try {
            // Consulta o documento a ser alterado
            const usuariosReferencia = doc(
                bancoDados,
                'usuarios',
                dadosUsuario.codigo
            )

            // Atualiza os dados do usuário
            await updateDoc(usuariosReferencia, dadosUsuario)

        } catch (error) {
            retorno = error instanceof FirebaseError
                ? `Erro ao alterar usuário! (${error.code}: ${error.message})`
                : `Erro imprevisto! (${error})`
        }

        return retorno
    }

    const excluirUsuario = async (codigoUsuario: string): Promise<string> => {
        let retorno = 'sucesso'

        try {
            // Consulta o documento a ser excluído
            const usuariosReferencia = doc(
                bancoDados,
                'usuarios',
                codigoUsuario
            )

            // Exclui o documento
            await deleteDoc(usuariosReferencia)

        } catch (error) {
            retorno = error instanceof FirebaseError
                ? `Erro ao excluir usuário! (${error.code}: ${error.message})`
                : `Erro imprevisto! (${error})`
        }

        return retorno
    }

    const listarUsuarios = async (): Promise<UsuarioTipo[]> => {
        let usuarios: UsuarioTipo[] = []

        try {
            // Consulta a coleção de usuários
            const colecao = collection(bancoDados, 'usuarios')

            // Recupera os documentos cadastrados
            const consulta = await getDocs(colecao)

            // Converte os documentos em uma lista de usuários
            usuarios = consulta.docs.map((documento) => ({
                ...documento.data() as UsuarioTipo,
                codigo: documento.id
            }))

        } catch (error) {
            if (error instanceof FirebaseError) {
                console.error(
                    'Erro ao listar usuários!',
                    error.code,
                    error.message
                )
            } else {
                console.error('Erro imprevisto ao listar usuários:', error)
            }
        }

        return usuarios
    }

    return {
        criarUsuario,
        alterarUsuario,
        excluirUsuario,
        listarUsuarios
    }
}
