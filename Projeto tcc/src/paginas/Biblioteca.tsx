import estilos from "./Biblioteca.module.css";
import type { Categoria } from "../tipos/Categoria";
import { Link } from "react-router-dom";

import {
  FaBrain,
  FaHeart,
  FaPills,
  FaHome,
  FaHeartbeat,
  FaRocket,
  FaFire,
  FaUsers,
} from "react-icons/fa";

// Categorias disponíveis na biblioteca e suas respectivas páginas
const categorias: Categoria[] = [
  {
    codigo: 1,
    nome: "Depressão",
    classe: estilos.depressao,
    icone: <FaBrain size={22} />,
    rota: "/depressao",
  },
  {
    codigo: 2,
    nome: "Ansiedade",
    classe: estilos.ansiedade,
    icone: <FaHeart size={22} />,
    rota: "/ansiedade",
  },
  {
    codigo: 3,
    nome: "Drogas",
    classe: estilos.drogas,
    icone: <FaPills size={22} />,
    rota: "/drogas",
  },
  {
    codigo: 4,
    nome: "Família",
    classe: estilos.familia,
    icone: <FaHome size={22} />,
    rota: "/familia",
  },
  {
    codigo: 5,
    nome: "Saúde",
    classe: estilos.saude,
    icone: <FaHeartbeat size={22} />,
    rota: "/saude",
  },
  {
    codigo: 6,
    nome: "Futuro",
    classe: estilos.futuro,
    icone: <FaRocket size={22} />,
    rota: "/futuro",
  },
  {
    codigo: 7,
    nome: "Raiva",
    classe: estilos.raiva,
    icone: <FaFire size={22} />,
    rota: "/raiva",
  },
  {
    codigo: 8,
    nome: "Bullying",
    classe: estilos.bullying,
    icone: <FaUsers size={22} />,
    rota: "/bullying",
  },
];

export function Biblioteca() {
  return (
    <section className={estilos.container}>
      <h2 className={estilos.titulo}>
        Biblioteca de Conteúdos
      </h2>

      <div className={estilos.grid}>
        {categorias.map((categoria) => (
          <Link
            key={categoria.codigo}
            to={categoria.rota}
            className={`${estilos.card} ${categoria.classe}`}
          >
            <div className={estilos.bolinha}>
              {categoria.icone}
            </div>

            <span className={estilos.nome}>
              {categoria.nome}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
