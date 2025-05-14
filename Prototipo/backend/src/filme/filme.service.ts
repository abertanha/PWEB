import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CastMember,
  CreateFilmeDto,
  CreditsApiResponse,
  FilmeApiResponse,
} from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filme } from './entities/filme.entity';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FilmeService {
  private readonly API_KEY: string | undefined;
  constructor(
    @InjectRepository(Filme)
    private readonly filmeRepository: Repository<Filme>,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.API_KEY = this.configService.get<string>('API_KEY');
  }

  async create(createFilmeDto: CreateFilmeDto): Promise<Filme> {
    const novoFilme = this.filmeRepository.create(createFilmeDto);
    return await this.filmeRepository.save(novoFilme);
  }

  async findAll(): Promise<Filme[]> {
    return await this.filmeRepository.find();
  }

  async findOne(id: string): Promise<Filme> {
    const filmeEncontrado = await this.filmeRepository.findOneBy({ id });

    if (!filmeEncontrado) {
      throw new HttpException(
        `Filme com id: ${id} não encontrado!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return filmeEncontrado;
  }

  async update(id: string, dadosParaAtualizar: UpdateFilmeDto): Promise<Filme> {
    await this.filmeRepository.update(id, dadosParaAtualizar);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.filmeRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `Filme com id ${id} não encontrado`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async searchByTitleApi(query: string): Promise<FilmeApiResponse> {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR&page=1`;

    const apiResponse = await firstValueFrom(this.httpService.get(url));

    const results = (apiResponse as FilmeApiResponse).data.results
      .map((filme) => ({
        id: filme.id,
        title: filme.title,
        original_title: filme.original_title,
        release_date: filme.release_date.split('-')[0],
        poster_path: filme.poster_path
          ? `https://image.tmdb.org/t/p/w92${filme.poster_path}`
          : null,
        overview: filme.overview,
        popularity: filme.popularity,
      }))
      .sort((a, b) => b.popularity - a.popularity);

    return { data: { results } };
  }
  async searchForDetailsApi(movieId: string) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.API_KEY}&language=pt-BR`;

    const apiResponse: CreditsApiResponse = await firstValueFrom(
      this.httpService.get(url),
    );

    const topActors: CastMember[] = apiResponse.data.cast
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3)
      .map((person) => ({
        name: person.name,
        popularity: person.popularity,
      }));

    const directors = apiResponse.data.crew
      .filter((member) => member.known_for_department === 'Directing')
      .slice(0, 2)
      .sort((a, b) => b.popularity - a.popularity)
      .map((director) => ({
        name: director.name,
      }));

    return { actors: topActors, directors: directors };
  }
  async searchByTitle(titulo: string): Promise<Filme[]> {
    return this.filmeRepository
      .createQueryBuilder('filme')
      .where('LOWER(filme.titulo) LIKE LOWER(:titulo)', {
        titulo: `%${titulo}%`,
      })
      .getMany();
  }
}
