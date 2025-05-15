'use client';

import ContentContainer from "@/components/ContentContainer";
import SearchInput from "@/components/SearchInput";
import MovieCard from "@/components/MovieCard";

// MOCKS TEMPORARIO
const mockMovies = [
  {
    id: 1,
    title: 'Princesa Mononoke',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7EadOwHmyQgOnlghRiWBygNtnjl.jpg',
  },
  {
    id: 2,
    title: 'O Guru do Sexo',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1GQ4nYfRU4rANvCFq4y2o1GExgQ.jpg',
  },
  {
    id: 3,
    title: 'Akira',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tbwwTQ3EqSdotbQ3ZcIl6vKBv7q.jpg',
  },
  {
    id: 4,
    title: 'Vá e veja',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4UrI9R4LPmMgj2v7xM6zK79smAH.jpg',
  },
  {
    id: 5,
    title: 'Jornada nas Estrelas IV: A Volta para Casa',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1QfHoXsGaMc1OgGcBoPNxcJ9WeI.jpg',
  },
  {
    id: 6,
    title: 'Um Filme Minecraft',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4VtkIaj76TpQNfhDHXQDdT9uBN5.jpg',
  },
];

export default function Home() {
  const testSearch = (query: string) => {
    console.log('Buscando por:', query); // Apenas para teste - desenvolvimento
  };
  return (
    <div className="flex items-center justify-center min-h-screen py-10 px-4 sm:px-0"> 
      <ContentContainer>
        <div className="mb-6 sm:mb-8"> 
          <h1 className="text-3xl font-bold text-center text-white sm:text-4xl italic">
            Consultar
          </h1>
          <div className="mt-4 flex justify-end">
            <SearchInput
              onSearchChange={testSearch} //TODO
              className="w-full max-w-xs sm:max-w-xs md:max-w-xs" /* Define largura do input */
            />
          </div>
        </div>
        {mockMovies.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
            {mockMovies.map((movie) => (
              <MovieCard
                key={movie.id} // Chave única para cada item da lista, essencial para o React
                title={movie.title}
                posterUrl={movie.posterUrl}
                //onClick={() => console.log(`Clicou em: ${movie.title}`)} //TODO
              />
            ))}
          </div>
          ) : (
          // Mensagem caso não haja filmes
          <p className="text-center text-neutral-400">
            Nenhum filme cadastrado ainda.
          </p>
        )}
      </ContentContainer>
    </div>
  );
}
