import {
  IsUUID,
  Length,
  IsNotEmpty,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateFilmeDto {
  @IsUUID('4')
  id?: string;

  @Length(255)
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @Length(150)
  @IsNotEmpty()
  @IsString()
  diretor: string;

  @IsNumber()
  @IsNotEmpty()
  ano: number;

  @Length(150)
  @IsNotEmpty()
  @IsString()
  genero: string;

  @IsNumber()
  @IsNotEmpty()
  duracao: number;

  @IsString()
  @IsNotEmpty()
  @Length(1000)
  elenco: string;

  @IsString()
  @Length(50)
  @IsNotEmpty()
  classificacao: string;

  @IsString()
  @IsNotEmpty()
  @Length(1000)
  sinopse: string;

  @IsNumber()
  @IsNotEmpty()
  notaUsuario: number;
}

export class FilmeRouteParameters {
  @IsUUID()
  id!: string;
}
export interface Filme {
  id: string;
  title: string;
  original_title: string;
  release_date: string;
  poster_path: string | null;
  overview: string;
  popularity: number;
}

export interface FilmeApiResponse {
  data: {
    results: Filme[];
  };
}
export interface CastMember {
  name: string;
  popularity: number;
}

export interface CrewMember {
  name: string;
  known_for_department: string;
  popularity: number;
}

export interface CreditsApiResponse {
  data: {
    cast: CastMember[];
    crew: CrewMember[];
  };
}
