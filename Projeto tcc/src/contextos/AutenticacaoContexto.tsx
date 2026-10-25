
// Importações do React
import {
  createContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

// Importações do Firebase Authentication
import {
  onAuthStateChanged,
  type User
} from "firebase/auth";

import { auth } from "../firebase/FirebaseConexao";

// Define os dados disponibilizados pelo contexto
interface AutenticacaoTipoContexto {
  usuario: User | null;
  carregando: boolean;
}

// Define as propriedades do Provider
interface AutenticacaoProviderProps {
  children: ReactNode;
}

// Cria o contexto da autenticação
export const AutenticacaoContexto =
  createContext<AutenticacaoTipoContexto>({
    usuario: null,
    carregando: true
  });

// Compartilha a autenticação com os componentes filhos
export const AutenticacaoProvider = ({
  children
}: AutenticacaoProviderProps) => {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    

  const cancelarObservacao = onAuthStateChanged(
  auth,
  (usuarioAutenticado) => {
    setUsuario(usuarioAutenticado);
    setCarregando(false);
  }
);

    return () => cancelarObservacao();
  }, []);

  return (
    <AutenticacaoContexto.Provider
      value={{
        usuario,
        carregando
      }}
    >
      {children}
    </AutenticacaoContexto.Provider>
  );
};
