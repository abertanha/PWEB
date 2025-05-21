export interface FilmeData {
  // TO DO rever quando houver a integração back-front
  id: number | string; // Permitindo string para o caso de IDs de API externas
  titulo: string;
  diretor: string | null; // Campos opcionais ou que podem ser nulos
  ano?: number | null;
  genero: string | null;
  duracao?: number | null; // Em minutos
  elenco: string | null; // String de atores separados por vírgula
  classificacao?: string | null; // is adult?
  sinopse: string | null; // overview do back end
  notaUsuario?: number | null; // Viŕa do banco de dados
  dataAdicao?: string | null; // Virá do banco de dados
  backdropUrl: string | null; // Ex: URL da imagem de backdrop do TMDB
  posterUrl: string | null; // Manter o posterUrl também pode ser útil
}

// TO DO idem
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
