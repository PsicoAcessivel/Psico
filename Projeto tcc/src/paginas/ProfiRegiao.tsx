import estilos from "./ProfiRegiao.module.css";
import { AiFillCaretLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

export function ProfiRegiao() {
  return (
    <main className={estilos.conteiner}>

      {/* Cabeçalho com botão de voltar e título da página */}
      <div className={estilos.cabecalho}>

        <Link
          className={estilos.link}
          to={"/profissionais"}
        >
          <AiFillCaretLeft />
        </Link>

        <h1 className={estilos.titulo}>Profissionais da Região</h1>

      </div>

      <h2 className={estilos.subtitulo}>Onde encontrá-los?</h2>

      {/* Lista de profissionais disponíveis na região */}
      <div className={estilos.profissionais}>

        {/* Card do primeiro profissional */}
        <div className={estilos.profissional1}>

          <h3 className={estilos.nome}>Dra. Ana Paula Souza</h3>
          <p className={estilos.descricao}>
            Psicóloga Clínica | CRP 06/123456
          </p>

          <p className={estilos.especialidadeTi}>Especialidade:</p>
          <p className={estilos.especialidadeTe}>
            Ansiedade, depressão, jovens e adolescentes
          </p>

          <p className={estilos.enderecoTi}>Endereço:</p>
          <p className={estilos.enderecoTe}>
            Rua Das Flores, 123 - Centro, Campinas/SP
          </p>

          <p className={estilos.contatoTi}>Contato:</p>
          <p className={estilos.contatoTe}>
            (19) 999999-9999 | anapaula@gmail.com
          </p>

        </div>

        {/* Card do segundo profissional */}
        <div className={estilos.profissional2}>

          <h3 className={estilos.nome}>Dr. João Silva</h3>
          <p className={estilos.descricao}>
            Psicólogo | CRP 06/654321
          </p>

          <p className={estilos.especialidadeTi}>Especialidade:</p>
          <p className={estilos.especialidadeTe}>
            Terapia Cognitivo-Comportamental, jovens
          </p>

          <p className={estilos.enderecoTi}>Endereço:</p>
          <p className={estilos.enderecoTe}>
            Av. Brasil, 456 - Cambuí, Campinas/SP
          </p>

          <p className={estilos.contatoTi}>Contato:</p>
          <p className={estilos.contatoTe}>
            (19) 98888-8888 | joaosilva@gmail.com
          </p>

        </div>

        {/* Card do terceiro profissional */}
        <div className={estilos.profissional1}>

          <h3 className={estilos.nome}>Dra. Camila Ferraz</h3>
          <p className={estilos.descricao}>
            Psicóloga Clínica | CRP 06/882211
          </p>

          <p className={estilos.especialidadeTi}>Especialidade:</p>
          <p className={estilos.especialidadeTe}>
            Ansiedade, autoestima, adolescentes
          </p>

          <p className={estilos.enderecoTi}>Endereço:</p>
          <p className={estilos.enderecoTe}>Atendimento online</p>

          <p className={estilos.contatoTi}>Contato:</p>
          <p className={estilos.contatoTe}>
            (19) 98211-3344 | camila.ferraz@gmail.com
          </p>

        </div>

        {/* Card do quarto profissional */}
        <div className={estilos.profissional2}>

          <h3 className={estilos.nome}>Dr. Renan Oliveira</h3>
          <p className={estilos.descricao}>
            Psicólogo | CRP 06/991122
          </p>

          <p className={estilos.especialidadeTi}>Especialidade:</p>
          <p className={estilos.especialidadeTe}>
            Terapia Humanista, jovens e adultos
          </p>

          <p className={estilos.enderecoTi}>Endereço:</p>
          <p className={estilos.enderecoTe}>
            Rua das Palmeiras, 220 - Centro, Sumaré/SP.
          </p>

          <p className={estilos.contatoTi}>Contato:</p>
          <p className={estilos.contatoTe}>
            (19) 98122-9090 | renanoliveira@gmail.com
          </p>

        </div>

      </div>
    </main>
  );
}