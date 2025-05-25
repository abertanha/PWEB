import Link from 'next/link'; 
import React from 'react';
import Image from 'next/image';
//TO DO REVER ICONES
import ContentContainer from '@/components/ContentContainer';

export default function MenuPage() {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <ContentContainer className="flex flex-col items-center text-center">
        <div className="mb-10 sm:mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold mb-3 italic">Diário de cinéfilo</h1>
          <p className="text-lg sm:text-xl text-neutral-300 px-2">
            Guardamos o que você viu, você lembra do que sentiu
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 md:gap-12">
          <Link 
            href="/cadastrar"
            className="
              group
              flex flex-col items-center justify-center
              p-4 
              text-center text-white
              transition-transform duration-300 ease-in-out
              transform hover:scale-110
              rounded-lg
              focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-transparent
            "
            title="Cadastrar novo filme"
          >
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-2">
              <Image
                src="/add-movie.png" 
                alt="Ícone para cadastrar novo filme"
                fill
                className="object-contain group-hover:opacity-80 transition-opacity"
              />
            </div>
            <span className="font-semibold text-md sm:text-lg">Nova entrada</span>
          </Link>
        
          <Link 
            href="/colecao"
            className="
              group
              flex flex-col items-center justify-center
              p-4
              text-center text-white
              transition-transform duration-300 ease-in-out
              transform hover:scale-110
              rounded-lg
              focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-transparent
            "
            title="Consultar coleção de cadastros"
          >
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-2">
              <Image
                src="/movie(2).png"
                alt="Ícone para consultar coleção de filmes"
                fill
                className="object-contain group-hover:opacity-80 transition-opacity"
              />
            </div>
            <span className="font-semibold text-md sm:text-lg">Consultar</span>
          </Link>
        </div>
        </ContentContainer>
    </div>
  );
}
