import type { ReactNode } from "react";
export type Categoria = {
  id: number;
  nome: string;
  classe: string;
  icone: ReactNode;
  rota: string;
};