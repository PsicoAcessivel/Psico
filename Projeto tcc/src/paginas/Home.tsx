
import estilos from "./Home.module.css";

export function Home() {
  return (
    <main className={estilos.container}>
      <section className={estilos.conteudo}>

        <h1 className={estilos.titulo}>
          Bem-vindo(a) ao Psico-Acessível
        </h1>

        <p className={estilos.texto}>
          Sua plataforma de apoio psicológico e informação.
        </p>

        <p className={estilos.texto}>
          Explore os recursos no menu e aproveite a experiência.
        </p>


      </section>
    </main>
  );
}

