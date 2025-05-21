import Link from 'next/link'; 
import React from 'react';
//TO DO REVER ICONES
import { FilmIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import ContentContainer from '@/components/ContentContainer';

export default function MenuPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <ContentContainer className=' flex flex-col'>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3">Diário de um cinéfilo</h1>
          <p className="text-xl text-neutral-300">
            Guardamos o que você viu, você lembra do que sentiu
          </p>
        </div>

        {/* Contêiner para os botões do menu */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          {/* Botão para Consultar Coleção */}
          <Link 
            href="/colecao"
              className="
                group relative
                flex flex-col items-center justify-center
                w-48 h-48 sm:w-56 sm:h-56
                p-6
                bg-neutral-800/70 hover:bg-neutral-700/90
                backdrop-filter backdrop-blur-sm
                rounded-2xl shadow-xl
                text-center text-white
                transition-all duration-300 ease-in-out
                transform hover:scale-105
              "
              title="Consulte seus registros" // Tooltip nativo
            >
              <FilmIcon className="w-16 h-16 sm:w-20 sm:h-20 mb-3 text-sky-400 group-hover:text-sky-300 transition-colors" />
              <span className="font-semibold text-lg">Consultar Coleção</span>
          </Link>
        
          <Link 
            href="/cadastrar" 
              className="
                group relative
                flex flex-col items-center justify-center
                w-48 h-48 sm:w-56 sm:h-56
                p-6
                bg-neutral-800/70 hover:bg-neutral-700/90
                backdrop-filter backdrop-blur-sm
                rounded-2xl shadow-xl
                text-center text-white
                transition-all duration-300 ease-in-out
                transform hover:scale-105
              "
              title="Cadastrar novo filme" // Tooltip nativo
            >
              <PlusCircleIcon className="w-16 h-16 sm:w-20 sm:h-20 mb-3 text-green-400 group-hover:text-green-300 transition-colors" />
              <span className="font-semibold text-lg">Cadastrar Novo</span>
          </Link>
        </div>
        </ContentContainer>
    </div>
  );
}
