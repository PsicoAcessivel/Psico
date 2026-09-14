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
    id: 1,
    nome: "Depressão",
    classe: estilos.depressao,
    icone: <FaBrain size={22} />,
    rota: "/depressao",
  },
  {
    id: 2,
    nome: "Ansiedade",
    classe: estilos.ansiedade,
    icone: <FaHeart size={22} />,
    rota: "/ansiedade",
  },
  {
    id: 3,
    nome: "Drogas",
    classe: estilos.drogas,
    icone: <FaPills size={22} />,
    rota: "/drogas",
  },
  {
    id: 4,
    nome: "Família",
    classe: estilos.familia,
    icone: <FaHome size={22} />,
    rota: "/familia",
  },
  {
    id: 5,
    nome: "Saúde",
    classe: estilos.saude,
    icone: <FaHeartbeat size={22} />,
    rota: "/saude",
  },
  {
    id: 6,
    nome: "Futuro",
    classe: estilos.futuro,
    icone: <FaRocket size={22} />,
    rota: "/futuro",
  },
  {
    id: 7,
    nome: "Raiva",
    classe: estilos.raiva,
    icone: <FaFire size={22} />,
    rota: "/raiva",
  },
  {
    id: 8,
    nome: "Bullying",
    classe: estilos.bullying,
    icone: <FaUsers size={22} />,
    rota: "/bullying",
  },
];

export function Biblioteca() {
  return (
    <section className={estilos.container}>

      {/* Título da página */}
      <h2 className={estilos.titulo}>
        Biblioteca de Conteúdos
      </h2>

      {/* Percorre o array e cria um card para cada categoria */}
      <div className={estilos.grid}>
        {categorias.map((categoria) => (
          <Link
            key={categoria.id}
            to={categoria.rota}
            className={`${estilos.card} ${categoria.classe}`}
          >
            {/* Ícone da categoria */}
            <div className={estilos.bolinha}>
              {categoria.icone}
            </div>

            {/* Nome da categoria */}
            <span className={estilos.nome}>
              {categoria.nome}
            </span>
          </Link>
        ))}
      </div>

    </section>
  );
}