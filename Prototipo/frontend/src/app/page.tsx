'use client';

import ContentContainer from "@/components/ContentContainer";
import SearchInput from "@/components/SearchInput";

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
        <div className="text-center text-neutral-300">
          <p className="text-lg">
            Aqui aparecerão os filmes cadastrados.
          </p>
        </div>
      </ContentContainer>
    </div>
  );
}
