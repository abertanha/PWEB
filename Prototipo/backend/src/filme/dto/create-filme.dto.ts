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
