"use client";

import React, { useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import ContentContainer from '@/components/ContentContainer';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';
import { FilmeData } from '@/types/filme.types';
import { FilmeDetalhado } from '@/types/filme.types';

type NewMovieFormData = Omit<FilmeData, 'id' | 'dataAdicao' | 'posterUrl' | 'backdropUrl' | 'popularidade'>;

const initialFormData: NewMovieFormData = {
    titulo: '',
    diretor: '',
    ano: undefined, 
    genero: '',
    duracao: undefined,
    elenco: '',
    classificacao: '',
    sinopse: '',
    notaUsuario: undefined,
};

export default function CadastrarPage() {
    const [formData, setFormData] = useState<NewMovieFormData>(initialFormData);
    const titleInputRef = useRef<HTMLInputElement>(null); 
    const [sugestoes, setSugestoes] = useState<FilmeDetalhado[]>([]);
    const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
    const [loadingSugestoes, setLoadingSugestoes] = useState(false); 


    useEffect(() => {
        titleInputRef.current?.focus();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        let processedValue: string | number | undefined = value;
        const targetInput = e.target as HTMLInputElement;

        if (targetInput.type === 'number') {
        processedValue = value === '' ? undefined : parseFloat(value);
        if (isNaN(processedValue as number)) {
            processedValue = undefined;
        }
        }
        setFormData(prev => ({ ...prev, [name]: processedValue }));
    };

    const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.setCustomValidity('');
        handleInputChange(e);
    };
    
    const handleTitleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
        e.target.setCustomValidity('Por favor, informe o título do filme.');
    };
    
    const handleClearForm = () => {
        setFormData(initialFormData);
        titleInputRef.current?.focus();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TO DO backend da chamada do método searchbytitleapi()
        console.log('Dados do formulário para salvar:', formData);
        // TO DO depois de salvar limpar formulario com:
        // handleClearForm();
    };

    const inputBaseClass = "w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:ring-sky-500 focus:border-sky-500 focus:outline-none";
    const labelBaseClass = "block mb-1.5 text-sm font-medium text-neutral-300";
    
    return (
        <div className='flex items-center justify-center min-h-screen py-10 px-4 sm:px-0'>
            <ContentContainer className='flex flex-col w-11/12 md:w-3/4 lg:max-w-2xl xl:max-w-3xl'>
                <div className='mb-6 sm:mb-8 relative'>
                    <Link 
                        href="/" 
                        className='
                            absolute
                            top-1/2
                            -translate-y-1/2
                            left-0
                            p-2
                            bg-black/20 hover:bg-white/20
                            rounded-full
                            transition-colors
                            '
                            aria-label="Voltar para o menu"
                            title="Voltar"
                    >
                        <ArrowLeftIcon className='h-6 w-6 text-white'/>
                    </Link>
                    <h1 className='text-3xl sm:text-4xl font-bold text-white text-center italic'>
                        Nova Entrada
                    </h1>
                </div>
                <form onSubmit={handleSubmit} className='flex-grow space-y-5 overflow-y-auto pr-1'>
                    <div>
                        <label htmlFor="titulo" className={labelBaseClass}>Título:</label>
                        <input 
                            type="text"
                            name="titulo"
                            id="titulo"
                            ref={titleInputRef}
                            value={formData.titulo}
                            onChange={handleTitleInput}
                            onInvalid={handleTitleInvalid}
                            className={inputBaseClass}
                            required
                            placeholder='Lavoura Arcaica'
                        />
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        <div>
                            <label htmlFor="diretor" className={labelBaseClass}>Diretor:</label>
                            <input type="text" name='diretor' id='diretor'
                                    value={formData.diretor} onChange={handleInputChange}
                                    className={inputBaseClass} placeholder='Luiz Fernando Carvalho'/>
                        </div>
                        <div>
                            <label htmlFor="ano" className={labelBaseClass}>Ano:</label>
                            <input type="number" name='ano' id='ano'
                                    value={formData.ano === undefined ? '' : formData.ano} onChange={handleInputChange}
                                    className={inputBaseClass} placeholder="Ex: 1998"
                                    />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                        <label htmlFor="genero" className={labelBaseClass}>Gênero:</label>
                        <input type="text" name="genero" id="genero"
                                value={formData.genero} onChange={handleInputChange}
                                className={inputBaseClass} />
                        </div>
                        <div>
                        <label htmlFor="duracao" className={labelBaseClass}>Duração (minutos):</label>
                        <input type="number" name="duracao" id="duracao"
                                value={formData.duracao === undefined ? '' : formData.duracao} onChange={handleInputChange}
                                className={inputBaseClass} placeholder="Ex: 163" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="elenco" className={labelBaseClass}>Elenco (separado por vírgulas):</label>
                        <input type="text" name="elenco" id="elenco"
                            value={formData.elenco} onChange={handleInputChange}
                            className={inputBaseClass} />
                    </div>

                    <div>
                        <label htmlFor="classificacao" className={labelBaseClass}>Classificação Etária:</label>
                        <input type="text" name="classificacao" id="classificacao"
                            value={formData.classificacao} onChange={handleInputChange}
                            className={inputBaseClass} placeholder="Ex: 12 anos" />
                    </div>

                    <div>
                        <label htmlFor="sinopse" className={labelBaseClass}>Sinopse:</label>
                        <textarea name="sinopse" id="sinopse" rows={4}
                                value={formData.sinopse} onChange={handleInputChange}
                                className={inputBaseClass}></textarea>
                    </div>

                    <div>
                        <label htmlFor="notaUsuario" className={labelBaseClass}>Sua Nota (0 a 5):</label>
                        <input type="number" name="notaUsuario" id="notaUsuario"
                            value={formData.notaUsuario === undefined ? '' : formData.notaUsuario} onChange={handleInputChange}
                            className={inputBaseClass} step="0.1" min="0" max="5" placeholder="Ex: 4.7"/>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 mt-6 border-t border-neutral-700">
                        <Button type="button" onClick={handleClearForm} variant="secondary" className="w-full sm:w-auto">
                            Limpar Entrada
                        </Button>
                        <Button type="submit" variant="primary" className="w-full sm:w-auto">
                            Salvar Entrada
                        </Button>
                    </div>
                </form>
            </ContentContainer>
        </div>
    );
}