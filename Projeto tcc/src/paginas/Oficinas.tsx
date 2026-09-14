import estilos from "./Oficinas.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const oficinas = [
  {
    nome: "Ballet Cristiana Packer",
    endereco:
      "Endereço: R. Joaquim Ulisses Sarmento, 645 - Jardim Aurea, Campinas - SP",
    contato: "Contato: (19) 3232-0000",
    cor: "azul",
  },
  {
    nome: "Território Fight Matriz",
    endereco:
      "Endereço: Território Fight - R. São Benedito, 117 - Jardim Santa Lúcia",
    contato: "Contato: (19) 99914-7112",
    cor: "roxo",
  },
  {
    nome: "Yoga Flor da Vida",
    endereco: "Endereço: R. Iquace, 361 - Nova Campinas",
    contato: "Contato: (19) 98222-5506",
    cor: "azul",
  },
  {
    nome: "SM Studio de Dança",
    endereco: "Endereço: Av. Fermino Maltarollo, 440",
    contato: "Contato: (19) 99977-6406",
    cor: "roxo",
  },
  {
    nome: "Dojo Oss",
    endereco: "Endereço: R. Argentina, 51 - Jardim Nova Europa",
    contato: "Contato: (19) 98128-2722",
    cor: "azul",
  },
  {
    nome: "Studio de Pilates Unify",
    endereco: "Endereço: Av. Antônio Carvalho de Miranda, 690",
    contato: "Contato: (19) 98266-6065",
    cor: "roxo",
  },
  {
    nome: "Solace Cia de Dança",
    endereco: "Endereço: Rua José Pinto de Moura",
    contato: "Contato: (19) 97152-4681",
    cor: "azul",
  },
  {
    nome: "AIKIKAI TAMPA BRASIL",
    endereco: "Endereço: R. Victorino dos Anjos, 640",
    contato: "Contato: (19) 98306-1616",
    cor: "roxo",
  },
  {
    nome: "Aris Pilates",
    endereco: "Endereço: Av. Jorge Tibiriçá, 240",
    contato: "Contato: (19) 99308-3514",
    cor: "azul",
  },
];

export function Oficinas() {
  return (
    <main className={estilos.container}>
      <section className={estilos.conteudo}>
        <h1 className={estilos.titulo}>Sugestão de Oficinas</h1>

      <div className={estilos.grid}>
          {/* Percorre a lista de oficinas e cria um card para cada uma */}
          {oficinas.map((item, index) => (
            <div
              // Usa o índice como identificação de cada card
              key={index}

              // Define a classe do card de acordo com a cor da oficina
              className={`${estilos.card} ${
                item.cor === "azul" ? estilos.azul : estilos.roxo
              }`}
            >
              {/* Ícone de localização */}
              <div className={estilos.icone}>
                <FaMapMarkerAlt />
              </div>

              {/* Informações da oficina */}
              <div className={estilos.info}>
                <h3>{item.nome}</h3>
                <p>{item.endereco}</p>
                <span>{item.contato}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
