import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmeModule } from './filme/filme.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/db.sqlite',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, //true para dev, false para prod
      logging: true,
    }),
    FilmeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
