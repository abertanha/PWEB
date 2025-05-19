'use client';

import React from 'react';
import BaseModal from './BaseModal'; 
import { FilmeData } from '@/types/filme.types'; 
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface MovieDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    movie: FilmeData | null;
}

export default function MovieDetailsModal({
    isOpen,
    onClose,
    movie,
}: MovieDetailsModalProps) {
    if (!movie) {
        return null;
    }

    const modalBgClass = 'bg-neutral-900/80';
    const modalSolidBgForGradient = 'bg-neutral-900';

    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <div className={`
                relative
                ${modalBgClass}
                backdrop-filter backdrop-blur-md
                w-11/12 md:w-3/4 lg:w-[700px] xl:w-[800px] 2xl:w-[900px]
                max-h-[90vh]
                overflow-hidden
                rounded-2xl
                shadow-2xl
                text-white
                flex flex-col
                `}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 left-3 sm:top-4 sm:left-4 p-2 bg-black/40 rounded-full hover:bg-white/20 transition-colors z-30"
                    aria-label="Voltar e fechar modal"
                    title='Voltar'
                >
                    <ArrowLeftIcon className="h-6 w-6 text-white"/>
                </button>
                <div className='flex-grow overflow-y-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        <div className='relative h-64 md:h-auto md:min-h-full'>
                            {movie.backdropUrl && (
                                <Image
                                    src={movie.backdropUrl}
                                    alt={`Cena do filme ${movie.titulo}`}
                                    fill
                                    className='object-cover'
                                    priority
                                />
                            )}
                            <div className={`absolute inset-0 bg-gradient-to-l md:bg-gradient-to-r from-transparent via-<span class="math-inline">\{modalSolidBgForGradient\}/0 to\-</span>{modalSolidBgForGradient}/100 md:from-<span class="math-inline">\{modalSolidBgForGradient\}/100 md\:via\-</span>{modalSolidBgForGradient}/0 md:to-transparent pointer-events-none`}></div>
                            <div className={`absolute inset-y-0 right-0 w-1/3 md:w-1/2 bg-gradient-to-r from-transparent to-neutral-900 pointer-events-none`}></div>
                        </div>
                        <div className='p-6 sm:p-8 bg-neutral-900'>
                            <h2 className='text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 leading-tight'>
                                {movie.titulo}
                            </h2>
                            <p className="text-sm text-neutral-400 mb-4">
                                {movie.ano && <span>{movie.ano}</span>}
                                {movie.duracao && <span> &bull; {movie.duracao} min</span>}
                                {movie.classificacao && <span> &bull; {movie.classificacao}</span>}
                            </p>

                            {movie.sinopse && (
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold mb-1">Sinopse</h3>
                                    <p className="text-neutral-300 text-sm leading-relaxed text-justify">{movie.sinopse}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                {movie.diretor && <div><strong className="font-semibold text-neutral-200">Diretor:</strong> <span className="text-neutral-300">{movie.diretor}</span></div>}
                                {movie.genero && <div><strong className="font-semibold text-neutral-200">Gênero:</strong> <span className="text-neutral-300">{movie.genero}</span></div>}
                                {movie.elenco && <div className="sm:col-span-2"><strong className="font-semibold text-neutral-200">Elenco:</strong> <span className="text-neutral-300">{movie.elenco}</span></div>}
                                {movie.notaUsuario && <div><strong className="font-semibold text-neutral-200">Sua Nota:</strong> <span className="text-neutral-300">{movie.notaUsuario}/5</span></div>}
                                {movie.dataAdicao && <div><strong className="font-semibold text-neutral-200">Adicionado em:</strong> <span className="text-neutral-300">{new Date(movie.dataAdicao).toLocaleDateString('pt-BR')}</span></div>}
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        </BaseModal>
    );
} 