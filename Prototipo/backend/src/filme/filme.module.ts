import { Module } from '@nestjs/common';
import { FilmeService } from './filme.service';
import { FilmeController } from './filme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filme } from './entities/filme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Filme])],
  controllers: [FilmeController],
  providers: [FilmeService],
})
export class FilmeModule {}
