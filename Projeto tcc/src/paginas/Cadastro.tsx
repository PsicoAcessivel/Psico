import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import estilos from "./Cadastro.module.css";

import { Link, useNavigate } from "react-router-dom";

export function Cadastro() {
  const navigate = useNavigate();

  // Estados utilizados no formulário
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Cadastro de demonstração utilizando e-mail e senha
  const signUpWithEmail = () => {
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

    // Verifica o formato básico do e-mail
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("E-mail inválido.");
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

    // Simula a conclusão do cadastro
    window.alert(
      "Cadastro de demonstração concluído! Nenhuma conta real foi criada."
    );

    navigate("/");

    setAuthing(false);
  };

  // Cadastro com Google indisponível na demonstração
  const signUpWithGoogle = () => {
    setError(
      "O cadastro com Google não está disponível no modo de demonstração."
    );
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
        >
          <FcGoogle />
          Cadastrar com Google
        </button>

        {/* Link para a página de login */}
        <div className={estilos.footer}>
          <p>
            Já possui conta?{" "}

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
