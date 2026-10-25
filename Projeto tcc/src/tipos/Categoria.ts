import type { ReactNode } from "react";
export type Categoria = {
  codigo: number;
  nome: string;
  classe: string;
  icone: ReactNode;
  rota: string;
};