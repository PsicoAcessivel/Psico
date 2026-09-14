import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode
} from 'react';
// Importações do Firebase Authentication
import { getAuth, onAuthStateChanged, } from 'firebase/auth';
import type { User } from 'firebase/auth';

// Interface das informações do Context
interface AuthContextType {

    // Usuário autenticado
    user: User | null;

    // Informa se o Firebase ainda está verificando
    loading: boolean;

}


// Criação do Context
const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);


// Interface das propriedades do Provider
interface AuthProviderProps {

    children: ReactNode;

}


// Provider responsável por compartilhar
// os dados da autenticação
export function AuthProvider({ children }: AuthProviderProps) {

    // Inicializa o Firebase Authentication
    const auth = getAuth();

    // Armazena o usuário autenticado
    const [user, setUser] = useState<User | null>(null);

    // Controla o carregamento da autenticação
    const [loading, setLoading] = useState(true);


    // Verifica se existe um usuário logado
    useEffect(() => {

        // Sempre que houver mudança na autenticação,
        // essa função será executada.
        const unsubscribe = onAuthStateChanged(auth, (usuario) => {

            // Salva o usuário autenticado
            setUser(usuario);

            // Finaliza o carregamento
            setLoading(false);

        });

        // Remove o listener quando o componente for destruído
        return () => unsubscribe();

    }, []);


    // Disponibiliza os dados para toda aplicação
    return (

        <AuthContext.Provider
            value={{
                user,
                loading
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}


// Hook personalizado
// Facilita o uso do Context
export function useAuth() {

    return useContext(AuthContext);

}