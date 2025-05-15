import { IsUUID } from 'class-validator';

export class FilmeRouteParameters {
  @IsUUID()
  id!: string;
}

export interface FilmeDetalhado {
  titulo: string;
  diretor: string;
  ano: string;
  genero: string;
  duracao: string;
  elenco: string;
  sinopse: string;
  classificacao: string;
  popularidade: number;
}

export interface FilmeApiResponse {
  data: {
    results: FilmeDetalhado[];
  };
}
