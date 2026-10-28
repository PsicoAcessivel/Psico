import estilos from './Login.module.css';
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';

// React Router
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();

    // Estados do formulário
    const [autenticar, setAutenticar] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    // Login de demonstração utilizando e-mail e senha
    const signInWithEmail = () => {
        setError('');

        // Verifica se os campos foram preenchidos
        if (email.trim() === '' || senha.trim() === '') {
            setError('Preencha todos os campos.');
            return;
        }

        setAutenticar(true);

        // Simula o acesso sem consultar o Firebase
        navigate('/');

        setAutenticar(false);
    };

    // Login com Google indisponível na demonstração
    const signInWithGoogle = () => {
        setError(
            'O login com Google não está disponível no modo de demonstração.'
        );
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

                    {/* Mensagem de erro ou aviso */}
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
                >
                    <FcGoogle />
                    Login com Google
                </button>

                {/* Link para cadastro */}
                <div className={estilos.footer}>
                    <p>
                        Não tem conta?{' '}

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
