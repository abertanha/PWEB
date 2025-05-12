import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filme } from './entities/filme.entity';

@Injectable()
export class FilmeService {
  constructor(
    @InjectRepository(Filme)
    private readonly filmeRepository: Repository<Filme>,
  ) {}
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

  async searchByTitle(titulo: string): Promise<Filme[]> {
    return this.filmeRepository
      .createQueryBuilder('filme')
      .where('LOWER(filme.titulo) LIKE LOWER(:titulo)', {
        titulo: `%${titulo}%`,
      })
      .getMany();
  }
}
