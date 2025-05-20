'use client';

import React, { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import { FilmeData } from "@/types/filme.types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

interface EditMovieModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (updateMovieData: FilmeData) => void;
    movie : FilmeData | null;
}

type NonEditableFields = 'id' | 'dataAdicao' | 'posterUrl' | 'backdropUrl';
export type MovieFormData = Omit<FilmeData, NonEditableFields>;

export default function EditMovieModal({
    isOpen,
    onClose,
    onSave,
    movie,
}: EditMovieModalProps ) {
    const [formData, setFormData] = useState<MovieFormData | null>(null);
    const [originalMovieData, setOriginalMovieData] = useState<MovieFormData | null>(null);

    useEffect(() => {
        if (movie) {
            const movieFormValues: MovieFormData = {
                titulo: movie.titulo,
                diretor: movie.diretor || '',
                ano: movie.ano === null ? undefined : movie.ano, 
                genero: movie.genero || '',
                duracao: movie.duracao === null ? null : movie.duracao,
                elenco: movie.elenco || '',
                classificacao: movie.classificacao || '',
                sinopse: movie.sinopse || '',
                notaUsuario: movie.notaUsuario === null ? undefined : movie.notaUsuario, 
            };
            setFormData(movieFormValues);
            setOriginalMovieData(movieFormValues);
        } else {
        // Se não houver filme (ou o modal fechar e 'movie' se tornar null), limpa o formulário
            setFormData(null);
            setOriginalMovieData(null);
        }
    }, [movie]);

    if (!isOpen || !movie || !formData) {
    // Não renderiza se não estiver aberto, ou se não houver filme, ou se o formData não estiver pronto
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let processedValue: string | number | undefined = value;
        const targetInput = e.target as HTMLInputElement;
        if (targetInput.type === 'number') {
            processedValue = value === '' ? undefined : parseFloat(value);
            if (isNaN(processedValue as number)) {
                processedValue = undefined;
            }
        }

        setFormData(prev => (prev ? { ...prev, [name]: processedValue } : null));
    };

    const handleReset = () => {
        setFormData(originalMovieData);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData && movie) {
            const updatedMovie: FilmeData = {
                ...movie, 
                ...formData, 
                ano: formData.ano === undefined ? null : formData.ano,
                duracao: formData.duracao === undefined ? null : formData.duracao,
                notaUsuario: formData.notaUsuario === undefined ? null : formData.notaUsuario,
            };
            onSave(updatedMovie);
        }
    };

    const movieTitle = movie?.titulo || 'filme';
    const inputBaseClass = "w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:ring-sky-500 focus:border-sky-500 focus:outline-none";
    const labelBaseClass = "block mb-1.5 text-sm font-medium text-neutral-300";

    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <div
                className={`
                relative
                bg-neutral-900/85
                backdrop-filter backdrop-blur-md
                w-11/12 md:w-3/4 lg:w-[700px] xl:max-w-3xl
                max-h-[90vh]
                overflow-hidden
                rounded-2xl
                shadow-2xl
                text-white
                flex flex-col
                `}
            >
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-700">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Voltar e fechar modal"
                        title="Voltar"
                    >
                        <ArrowLeftIcon className="h-6 w-6 text-white" />
                    </button>
                    <h2 className="text-xl sm:text-2xl font-semibold text-center flex-grow pr-8 sm:pr-0">
                        Editando: <span className="font-bold">{movieTitle}</span>
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 sm:p-8 flex-grow overflow-y-auto space-y-5">
                    {/*Título*/}
                    <div>
                        <label htmlFor="titulo" className={labelBaseClass}>Título:</label>
                        <input type="text" name="titulo" id="titulo"
                            value={formData.titulo || ''} onChange={handleInputChange}
                            className={inputBaseClass} required />
                    </div>
                    {/*Layout de duas colunas para Diretor e ano*/}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                        <label htmlFor="diretor" className={labelBaseClass}>Diretor:</label>
                        <input type="text" name="diretor" id="diretor"
                                value={formData.diretor || ''} onChange={handleInputChange}
                                className={inputBaseClass} />
                        </div>
                        <div>
                        <label htmlFor="ano" className={labelBaseClass}>Ano:</label>
                        <input type="number" name="ano" id="ano"
                                value={formData.ano === undefined ? '' : formData.ano} onChange={handleInputChange}
                                className={inputBaseClass} placeholder="Ex: 1998" />
                        </div>
                    </div>

                    {/* Layout de duas colunas para Gênero e Duração */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                        <label htmlFor="genero" className={labelBaseClass}>Gênero:</label>
                        <input type="text" name="genero" id="genero"
                                value={formData.genero || ''} onChange={handleInputChange}
                                className={inputBaseClass} />
                        </div>
                        <div>
                        <label htmlFor="duracao" className={labelBaseClass}>Duração (minutos):</label>
                        <input type="number" name="duracao" id="duracao"
                                value={formData.duracao === undefined ? '' : formData.duracao} onChange={handleInputChange}
                                className={inputBaseClass} placeholder="Ex: 103" />
                        </div>
                    </div>

                    {/* Elenco */}
                    <div>
                        <label htmlFor="elenco" className={labelBaseClass}>Elenco (separado por vírgulas):</label>
                        <input type="text" name="elenco" id="elenco"
                            value={formData.elenco || ''} onChange={handleInputChange}
                            className={inputBaseClass} />
                    </div>

                    {/* Classificação */}
                    <div>
                        <label htmlFor="classificacao" className={labelBaseClass}>Classificação Etária:</label>
                        <input type="text" name="classificacao" id="classificacao"
                            value={formData.classificacao || ''} onChange={handleInputChange}
                            className={inputBaseClass} placeholder="Ex: 12 anos" />
                    </div>

                    {/* Sinopse */}
                    <div>
                        <label htmlFor="sinopse" className={labelBaseClass}>Sinopse:</label>
                        <textarea name="sinopse" id="sinopse" rows={4}
                                value={formData.sinopse || ''} onChange={handleInputChange}
                                className={inputBaseClass}></textarea>
                    </div>

                    {/* Nota do Usuário */}
                    <div>
                        <label htmlFor="notaUsuario" className={labelBaseClass}>Sua Nota (0 a 5):</label>
                        <input type="number" name="notaUsuario" id="notaUsuario"
                            value={formData.notaUsuario === undefined ? '' : formData.notaUsuario} onChange={handleInputChange}
                            className={inputBaseClass} step="0.1" min="0" max="5" placeholder="Ex: 4.7"/>
                    </div>

                    {/* Data de Adição (Apenas para exibição, não editável) */}
                    {movie.dataAdicao && (
                        <div>
                        <p className={labelBaseClass}>Adicionado em:</p>
                        <p className="text-neutral-400 text-sm">{new Date(movie.dataAdicao + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                        </div>
                    )}
                  {/* Botões de Ação */}
                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-neutral-700 mt-6">
                        <Button type="button" onClick={handleReset} variant="secondary" className="w-full sm:w-auto">
                            Resetar
                        </Button>
                        <Button type="submit" variant="primary" className="w-full sm:w-auto">
                            Salvar Alterações
                        </Button>
                    </div>
                </form>
            </div>
        </BaseModal>
    );
}