import estilos from "./Rodape.module.css";
import logo from "../../assets/imagens/PsicoA2LOGOvetor.svg";

import {
    FaFacebook,
    FaLinkedin,
    FaYoutube,
    FaInstagram
} from "react-icons/fa";

export function Rodape() {
    return (
        <footer className={estilos.rodape}>

            <div className={estilos.conteudo}>

                <div className={estilos.logoArea}>
                    <img
                        src={logo}
                        alt="Logo Psico-Acessível"
                        className={estilos.logo}
                    />

                    <h2>Psico-Acessível</h2>
                </div>

                <div className={estilos.contato}>
                    <h3>Ficou com alguma dúvida?</h3>

                    <p>Email: psicoacessivel@gmail.com</p>

                    <p>Telefone: (19) 12345-6789</p>
                </div>

                <div className={estilos.redes}>
                    <h3>Nos siga nas redes sociais</h3>

                    <div className={estilos.icones}>
                        <FaFacebook />
                        <FaLinkedin />
                        <FaYoutube />
                        <FaInstagram />
                    </div>
                </div>

            </div>

            <p className={estilos.copy}>
                ©2026 Psico-Acessível. Todos os direitos reservados.
            </p>

        </footer>
    );
}