//Esse arquivo cria um Contexto React responsável por armazenar e compartilhar 
// o e-mail do usuário entre os componentes da aplicação.

import { createContext, useState } from 'react'
import { type ReactNode } from 'react'


// Define as propriedades que o componente LayoutProvider recebe.
interface LayoutProviderProps {
  children: ReactNode
}

//Define quais dados e funções estarão disponiveis no contexto
interface LayoutTipoContexto {
  emailUsuarioContexto: string
  setEmailUsuarioContexto: (email: string) => void
}

//Esta linha cria o contexto da aplicação e define seus valores iniciais.
export const LayoutContexto = createContext<LayoutTipoContexto>({
  emailUsuarioContexto: " ",
  setEmailUsuarioContexto: () => {}
})

export const LayoutProvider = ({ children }: LayoutProviderProps) => {

//Armazena o e-mail do usuário e fornece uma função para atualiza-lo

  const [emailUsuarioContexto, setEmailUsuarioContexto] = useState('')


  
  // Compartilha o e-mail do usuário e a função de atualização
// com todos os componentes filhos da aplicação.

  return (
    <LayoutContexto.Provider
      value={{
        emailUsuarioContexto,
        setEmailUsuarioContexto
      }}
    >
      {children}
    </LayoutContexto.Provider>
  )
}