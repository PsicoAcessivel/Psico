import estilos from './Login.module.css';
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';

// Firebase Authentication
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword
} from 'firebase/auth';

// React Router
import { Link, useNavigate } from 'react-router-dom';

export function Login() {

    const auth = getAuth();
    const navigate = useNavigate();

    // Estados do formulário
    const [autenticar, setAutenticar] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    // Login utilizando o Google
    const signInWithGoogle = async () => {

        setError('');
        setAutenticar(true);

        try {
            const response = await signInWithPopup(
                auth,
                new GoogleAuthProvider()
            );

            console.log(response.user.uid);

            navigate('/');

        } catch (error: unknown) {

            console.log(error);

            setError('Não foi possível entrar com o Google.');

        } finally {

            setAutenticar(false);
        }
    };

    // Login utilizando e-mail e senha
    const signInWithEmail = async () => {

        setError('');

        // Verifica se os campos foram preenchidos
        if (email.trim() === '' || senha.trim() === '') {

            setError('Preencha todos os campos.');
            return;
        }

        setAutenticar(true);

        try {

            const response = await signInWithEmailAndPassword(
                auth,
                email,
                senha
            );

            console.log(response.user.uid);

            navigate('/');

        } catch (error: unknown) {

            console.log(error);

            // Verifica se o erro possui um código do Firebase
            if (
                typeof error === 'object' &&
                error !== null &&
                'code' in error &&
                typeof error.code === 'string'
            ) {

                // Mensagens de erro do Firebase
                switch (error.code) {

                    case 'auth/invalid-credential':
                        setError('E-mail ou senha incorretos.');
                        break;

                    case 'auth/invalid-email':
                        setError('E-mail inválido.');
                        break;

                    case 'auth/user-disabled':
                        setError('Usuário desativado.');
                        break;

                    case 'auth/too-many-requests':
                        setError('Muitas tentativas. Tente novamente mais tarde.');
                        break;

                    default:
                        setError('Erro ao realizar o login.');
                }

            } else {

                setError('Erro ao realizar o login.');
            }

        } finally {

            setAutenticar(false);
        }
    };

    return (
        <div className={estilos.container}>

            <div className={estilos.formContainer}>

                {/* Cabeçalho */}
                <div className={estilos.header}>

                    <h3 className={estilos.titulo}>
                        Login
                    </h3>

                    <p className={estilos.subtitulo}>
                        Bem-Vindo de Volta
                    </p>

                </div>

                {/* Campos do formulário */}
                <div className={estilos.formulario}>

                    <input
                        type="email"
                        placeholder="Email"
                        className={estilos.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        className={estilos.input}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    {/* Mensagem de erro */}
                    {error && (
                        <div className={estilos.mensagem}>
                            {error}
                        </div>
                    )}

                    <div className={estilos.buttonContainer}>

                        <button
                            className={estilos.botaoLogin}
                            onClick={signInWithEmail}
                            disabled={autenticar}
                        >
                            {autenticar ? 'Entrando...' : 'Login'}
                        </button>

                    </div>

                </div>

                {/* Divisor */}
                <div className={estilos.divisor}>

                    <div className={estilos.linha}></div>

                    <p className={estilos.textoDivisor}>
                        OU
                    </p>

                </div>

                {/* Login com Google */}
                <button
                    className={estilos.botaoGoogle}
                    onClick={signInWithGoogle}
                    disabled={autenticar}
                >
                    <FcGoogle />

                    {autenticar ? 'Entrando...' : 'Login com Google'}
                </button>

                {/* Link para cadastro */}
                <div className={estilos.footer}>

                    <p>
                        Não tem conta?

                        <Link
                            to="/cadastro2"
                            className={estilos.link}
                        >
                            Cadastre-se
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}
