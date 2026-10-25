import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import estilos from "./Cadastro.module.css";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";


export function Cadastro() {
  // Inicializa o Firebase Authentication
  const auth = getAuth();

  // Permite navegar entre as páginas
  const navigate = useNavigate();

  // Estados utilizados no formulário
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Cadastro utilizando uma conta Google
  const signUpWithGoogle = async () => {
    setError("");
    setAuthing(true);

    try {
      const response = await signInWithPopup(
        auth,
        new GoogleAuthProvider()
      );

      console.log(response.user.uid);

      navigate("/");
    } catch (error: unknown) {
      console.log(error);

      setError(
        "Não foi possível realizar o cadastro com o Google."
      );
    } finally {
      setAuthing(false);
    }
  };

  // Cadastro utilizando e-mail e senha
  const signUpWithEmail = async () => {
    setError("");

    // Verifica se todos os campos foram preenchidos
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setError("Preencha todos os campos.");
      return;
    }

    // Verifica o tamanho mínimo da senha
    if (password.length < 6) {
      setError("A senha deve possuir pelo menos 6 caracteres.");
      return;
    }

    // Verifica se as senhas são iguais
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setAuthing(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(response.user.uid);

      navigate("/");

    } catch (error: unknown) {
      console.log(error);

      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string"
      ) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("Este e-mail já está cadastrado.");
            break;

          case "auth/invalid-email":
            setError("E-mail inválido.");
            break;

          case "auth/weak-password":
            setError("A senha é muito fraca.");
            break;

          default:
            setError("Erro ao realizar o cadastro.");
        }
      } else {
        setError("Erro ao realizar o cadastro.");
      }
    } finally {
      setAuthing(false);
    }
  };

  return (
    <div className={estilos.container}>
      <div className={estilos.formContainer}>

        {/* Cabeçalho */}
        <div className={estilos.header}>
          <h3 className={estilos.titulo}>
            Cadastro
          </h3>

          <p className={estilos.subtitulo}>
            Faça seu cadastro
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirmar senha"
            className={estilos.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Exibe a mensagem de erro, quando houver */}
          {error && (
            <div className={estilos.mensagem}>
              {error}
            </div>
          )}

          {/* Botão de cadastro */}
          <div className={estilos.buttonContainer}>
            <button
              className={estilos.botaoCadastro}
              onClick={signUpWithEmail}
              disabled={authing}
            >
              {authing ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
        </div>

        {/* Divisor entre as opções de cadastro */}
        <div className={estilos.divisor}>
          <div className={estilos.linha}></div>

          <p className={estilos.textoDivisor}>
            OU
          </p>
        </div>

        {/* Cadastro utilizando o Google */}
        <button
          className={estilos.botaoGoogle}
          onClick={signUpWithGoogle}
          disabled={authing}
        >
          <FcGoogle />

          {authing
            ? "Cadastrando..."
            : "Cadastrar com Google"}
        </button>

        {/* Link para a página de login */}
        <div className={estilos.footer}>
          <p>
            Já possui conta?

            <Link
              to="/login2"
              className={estilos.link}
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
