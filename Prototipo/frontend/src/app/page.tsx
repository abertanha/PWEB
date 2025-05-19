'use client';

import React, { useState } from 'react'
import ContentContainer from "@/components/ContentContainer";
import SearchInput from "@/components/SearchInput";
import MovieCard from "@/components/MovieCard";
import MovieDetailsModal from '@/components/MovieDetailsModal';
import { FilmeData } from '@/types/filme.types';

// MOCKS TEMPORARIO
const mockMovies = [
  {
    id: 1,
    title: 'Princesa Mononoke',
    backdropUrl: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/gl0jzn4BupSbL2qMVeqrjKkF9Js.jpg',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7EadOwHmyQgOnlghRiWBygNtnjl.jpg',
    diretor: 'Hayao Miyazaki',
    elenco: 'Yoji Matsuda, Yuriko Ishida, Yuko Tanaka',
    sinopse: 'Um príncipe infectado por uma doença sabe que irá morrer, a menos que encontre a cura. Sendo a sua última esperança, segue para o leste e, durante o caminho, encontra animais da floresta lutando contra a sua exploração, liderados pela princesa Mononoke.',
    notaUsuario: 4.5,
    dataAdicao: '2024-03-15'
  },
  {
    id: 2,
    title: 'O Guru do Sexo',
    backdropUrl: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/ma1OkpSIFbrmzg6BizyZ2xQxYT2.jpg',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1GQ4nYfRU4rANvCFq4y2o1GExgQ.jpg',
    diretor: 'Daisy von Scherler Mayer',
    elenco: 'Jimi Mistry, Heather Graham, Marisa Tomei',
    sinopse: 'Ramu Gupta (Jimi Mistry) tem um grande sonho: ser um grande astro do cinema em Nova York. Para concretizá-lo ele decide deixar sua cidade natal, Nova Délhi, e partir rumo ao sonho americano. Lá ele conhece Sharonna (Heather Graham), uma doce atriz pornô que o ajuda a se transformar em uma grande personalidade da cidade, transformando-se em uma espécie de guru do sexo de Nova York.',
    notaUsuario: 2.4,
    dataAdicao: '2019-01-01'
  },
  {
    id: 3,
    title: 'Akira',
    backdropUrl:'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/pHtVkUvKiG7CEemZkUiqPzjpMri.jpg',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tbwwTQ3EqSdotbQ3ZcIl6vKBv7q.jpg',
    diretor: 'Katsuhiro Otomo',
    elenco:'Mitsuo Iwata, Nozomu Sasaki, Mami Koyama',
    sinopse:'Uma grande explosão fez com que Tóquio fosse destruída em 1988. Em seu lugar, foi construída Neo-Tóquio, que, em 2019, sofre com atentados terroristas por toda a cidade. Kaneda e Tetsuo são amigos que integram uma gangue de motoqueiros. Eles disputam rachas violentos com uma gangue rival, os Palhaços, até que um dia, Tetsuo encontra Takashi, uma estranha criança com poderes que fugiu do hospital onde era mantido como cobaia. Tetsuo é ferido no encontro e, antes de receber a ajuda dos amigos, é levado por integrantes do exército, liderados pelo coronel Shikishima. A partir de então, Tetsuo passa a desenvolver poderes inimagináveis, o que faz com que seja comparado ao lendário Akira, responsável pela explosão de 1988. Paralelamente, Kaneda se interessa por Kei, uma garota envolvida com espiões, que tenta decifrar o enigma por trás das cobaias controladas pelo exército.',
    notaUsuario: 4.9,
    dataAdicao: '2010-02-02'
  },
  {
    id: 4,
    title: 'Vá e veja',
    backdropUrl:'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/cFE6kUqSJcFmsFBntBwKfr33jxD.jpg',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4UrI9R4LPmMgj2v7xM6zK79smAH.jpg',
    diretor: 'Elem Klimov',
    elenco:'Aleksei Kravchenko, Olga Mironova, Liubomiras Laucevicius',
    sinopse:'O jovem camponês Florya é cooptado por um despreparado grupo de guerrilheiros antinazistas. Em confronto com os alemães, o garoto é deixado para trás e decide retornar ao seu vilarejo. Chegando lá depara-se com o desolador cenário de um massacre. Perturbado, ele passa a vagar sem rumo, presenciando cenas cada vez mais fortes.',
    notaUsuario: 5,
    dataAdicao: '2012-12-12'
  },
  {
    id: 5,
    title: 'Jornada nas Estrelas IV: A Volta para Casa',
    backdropUrl: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/bEXSUVYSLL4ZmhELYeRiCvMhG3c.jpg',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1QfHoXsGaMc1OgGcBoPNxcJ9WeI.jpg',
    diretor: 'Leonard Nimoy',
    elenco: 'William Shatner, Leonard Nimoy, DeForest Kelley',
    sinopse: 'Marcados como fugitivos pela própria Federação que juraram proteger, os tripulantes da Enterprise voltam para a Terra para enfrentar a corte marcial por crimes cometidos ao salvar a vida de Spock. Em seu caminho, contudo, descobrem que o planeta está sendo devastado por uma gigantesca sonda alienígena, que exige uma resposta de uma forma de vida há muito extinta da Terra. Dentro da nave klingon capturada, Kirk e sua tripulação devem voltar no tempo para salvar a Terra e redescobrir o sentido da amizade.',
    notaUsuario: 3.5,
    dataAdicao: '2020-06-17'
  },
  {
    id: 6,
    title: 'Um Filme Minecraft',
    backdropUrl:'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/4MWc9Ur80Wo0B1fVVTnV0CoSh6A.jpg',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4VtkIaj76TpQNfhDHXQDdT9uBN5.jpg',
    diretor: 'Chris Bowman',
    elenco:'Jason Momoa, Jack Black, Sebastian Eugene Hansen',
    sinopse:'Quatro desajustados enfrentam problemas comuns do dia a dia quando, de repente, são sugados por um portal misterioso para o Overworld: uma terra fascinante e cúbica, movida pela imaginação. Para voltarem para casa, eles precisarão dominar esse novo mundo enquanto embarcam em uma jornada mágica ao lado de um crafter experiente e inesperado: Steve.',
    notaUsuario: 2.0,
    dataAdicao:'2025-04-20'
  },
];

export default function Home() {
  const [activeMovieId, setActiveMovieId] = useState<number | string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedMovieForDetails, setSelectedMovieForDetails] = useState<FilmeData | null>(null);
  
  const testSearch = (query: string) => {
    console.log('Buscando por:', query);
    setSearchQuery(query); // Atualiza o estado da query de busca
    setActiveMovieId(null);
  };

  const handleCardClick = (movieId: number | string) => {
    setActiveMovieId(prevId => prevId === movieId ? null : movieId);
  };

  const handleViewDetails = (movieId: number | string) => {
    const movieToShow = mockMovies.find(movie => movie.id === movieId);
    if (movieToShow) {
      setSelectedMovieForDetails(movieToShow);
      setIsDetailsModalOpen(true);
      setActiveMovieId(null); // Opcional: desativa o card ao abrir o modal
    }
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedMovieForDetails(null); // Limpa o filme selecionado
  };

  const handleEdit = (movieId: number | string) => {
    console.log('EDITAR filme ID:', movieId);
    // TO DO Modal de Edição no futuro
  };

  const handleDelete = (movieId: number | string) => {
    console.log('DELETAR filme ID:', movieId);
    // TO DO Confirmação de Deleção no futuro
  };

  const filteredMovies = mockMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div className="flex flex-col items-center min-h-screen py-10 px-4 sm:px-0"> 
      <ContentContainer className="flex flex-col flex-grow">
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
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id} // Passar o ID
                title={movie.title}
                posterUrl={movie.posterUrl as string}
                isActive={activeMovieId === movie.id} // Define se este card está ativo
                onCardClick={handleCardClick} // Para ativar/desativar o card
                onViewDetailsClick={handleViewDetails}
                onEditClick={handleEdit}
                onDeleteClick={handleDelete}
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
    <MovieDetailsModal
      isOpen={isDetailsModalOpen}
      onClose={handleCloseDetailsModal}
      movie={selectedMovieForDetails}
    />
  </>
  );
}
