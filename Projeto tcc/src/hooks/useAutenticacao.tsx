import { useContext } from 'react'
import { AutenticacaoContexto } from '../contextos/AutenticacaoContexto'

export function useAutenticacao() {
  const autenticacaoContexto = useContext(AutenticacaoContexto)

  if (autenticacaoContexto === undefined) {
    throw new Error('Falta o <AutenticacaoProvider> na aplicação!')
  }

  const { usuario, carregando } = autenticacaoContexto

  return {
    usuario,
    carregando
  }
}