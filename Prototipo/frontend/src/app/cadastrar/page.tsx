"use client";

import React, { useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import ContentContainer from '@/components/ContentContainer';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';
import { FilmeData } from '@/types/filme.types';
import { FilmeDetalhado } from '@/types/filme.types';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';

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
//mocks para simular a chamada api no dropdown
const todosOsFilmesMockadosParaBusca: FilmeDetalhado[] = [
    {
      id: 299536,
      titulo: 'Vingadores: Ultimato',
      ano: '2019',
      popularidade: 300,
      genero: 'Ação, Aventura, Ficção Científica',
      duracao: '181 min',
      elenco: 'Robert Downey Jr., Chris Evans, Mark Ruffalo',
      sinopse: 'Após os eventos devastadores de Vingadores: Guerra Infinita, o universo está em ruínas...',
      classificacao: '12 anos'
    },
    {
      id: 157336,
      titulo: 'Interestelar',
      ano: '2014',
      popularidade: 290,
      genero: 'Aventura, Drama, Ficção Científica',
      duracao: '169 min',
      elenco: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
      sinopse: 'As reservas naturais da Terra estão chegando ao fim e um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial...',
      classificacao: '10 anos'
    },
    {
      id: 27205,
      titulo: 'A Origem',
      ano: '2010',
      popularidade: 280,
      genero: 'Ação, Ficção Científica, Aventura',
      duracao: '148 min',
      elenco: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
      sinopse: 'Dom Cobb é um ladrão com a rara habilidade de roubar informações ao entrar nos sonhos das pessoas...',
      classificacao: '14 anos'
    },
    {
      id: 155,
      titulo: 'Batman: O Cavaleiro das Trevas',
      ano: '2008',
      popularidade: 270,
      genero: 'Ação, Crime, Drama',
      duracao: '152 min',
      elenco: 'Christian Bale, Heath Ledger, Aaron Eckhart',
      sinopse: 'Com a ajuda de Jim Gordon e Harvey Dent, Batman tem mantido a ordem na cidade de Gotham...',
      classificacao: '12 anos'
    },
    {
      id: 680,
      titulo: 'Pulp Fiction: Tempo de Violência',
      ano: '1994',
      popularidade: 260,
      genero: 'Crime, Drama',
      duracao: '154 min',
      elenco: 'John Travolta, Uma Thurman, Samuel L. Jackson',
      sinopse: 'Dois assassinos profissionais, um boxeador e a esposa de um gângster se entrelaçam em uma história de violência e redenção.',
      classificacao: '18 anos'
    },
    {
      id: 120,
      titulo: 'O Senhor dos Anéis: O Retorno do Rei',
      ano: '2003',
      popularidade: 250,
      genero: 'Aventura, Fantasia, Ação',
      duracao: '201 min',
      elenco: 'Elijah Wood, Viggo Mortensen, Ian McKellen',
      sinopse: 'O confronto final entre as forças do bem e do mal que lutam pelo controle do futuro da Terra Média se aproxima...',
      classificacao: '12 anos'
    },
    {
      id: 76341,
      titulo: 'Mad Max: Estrada da Fúria',
      ano: '2015',
      popularidade: 240,
      genero: 'Ação, Aventura, Ficção Científica',
      duracao: '120 min',
      elenco: 'Tom Hardy, Charlize Theron, Nicholas Hoult',
      sinopse: 'Em um mundo apocalíptico, Max Rockatansky acredita que a melhor forma de sobreviver é não depender de mais ninguém.',
      classificacao: '16 anos'
    },
    {
      id: 238,
      titulo: 'O Poderoso Chefão',
      ano: '1972',
      popularidade: 230,
      genero: 'Crime, Drama',
      duracao: '175 min',
      elenco: 'Marlon Brando, Al Pacino, James Caan',
      sinopse: 'O patriarca de uma família do crime passa o controle do império para seu filho relutante.',
      classificacao: '16 anos'
    },
    {
      id: 497,
      titulo: 'O Resgate do Soldado Ryan',
      ano: '1998',
      popularidade: 225,
      genero: 'Drama, Guerra',
      duracao: '169 min',
      elenco: 'Tom Hanks, Matt Damon, Tom Sizemore',
      sinopse: 'Durante a Segunda Guerra Mundial, um grupo de soldados é enviado para resgatar um paraquedista cujo irmãos morreram em combate.',
      classificacao: '16 anos'
    },
    {
      id: 424,
      titulo: 'A Lista de Schindler',
      ano: '1993',
      popularidade: 220,
      genero: 'Drama, História, Guerra',
      duracao: '195 min',
      elenco: 'Liam Neeson, Ralph Fiennes, Ben Kingsley',
      sinopse: 'A história real de Oskar Schindler, que salvou mais de mil judeus do Holocausto ao empregá-los em sua fábrica.',
      classificacao: '14 anos'
    },
    {
      id: 122,
      titulo: 'O Senhor dos Anéis: A Sociedade do Anel',
      ano: '2001',
      popularidade: 215,
      genero: 'Aventura, Fantasia, Ação',
      duracao: '178 min',
      elenco: 'Elijah Wood, Ian McKellen, Orlando Bloom',
      sinopse: 'Um jovem hobbit recebe a missão de destruir um anel poderoso antes que caia nas mãos erradas.',
      classificacao: '12 anos'
    },
    {
      id: 13,
      titulo: 'Forrest Gump: O Contador de Histórias',
      ano: '1994',
      popularidade: 210,
      genero: 'Drama, Romance',
      duracao: '142 min',
      elenco: 'Tom Hanks, Robin Wright, Gary Sinise',
      sinopse: 'Forrest Gump, um homem com QI abaixo da média, testemunha e influencia vários eventos históricos dos EUA.',
      classificacao: '12 anos'
    },
    {
      id: 603,
      titulo: 'Matrix',
      ano: '1999',
      popularidade: 205,
      genero: 'Ação, Ficção Científica',
      duracao: '136 min',
      elenco: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
      sinopse: 'Um programador descobre que o mundo em que vive é uma simulação criada por máquinas.',
      classificacao: '14 anos'
    },
    {
      id: 1891,
      titulo: 'O Curioso Caso de Benjamin Button',
      ano: '2008',
      popularidade: 200,
      genero: 'Drama, Fantasia, Romance',
      duracao: '166 min',
      elenco: 'Brad Pitt, Cate Blanchett, Taraji P. Henson',
      sinopse: 'A história de um homem que nasce idoso e rejuvenesce com o passar do tempo.',
      classificacao: '12 anos'
    },
    {
      id: 550,
      titulo: 'Clube da Luta',
      ano: '1999',
      popularidade: 195,
      genero: 'Drama',
      duracao: '139 min',
      elenco: 'Brad Pitt, Edward Norton, Helena Bonham Carter',
      sinopse: 'Um homem desiludido forma um clube secreto de luta como forma de escapar da rotina.',
      classificacao: '18 anos'
    },
    {
      id: 272,
      titulo: 'Batman Begins',
      ano: '2005',
      popularidade: 190,
      genero: 'Ação, Crime, Drama',
      duracao: '140 min',
      elenco: 'Christian Bale, Michael Caine, Liam Neeson',
      sinopse: 'A origem de Bruce Wayne como Batman e sua luta contra o crime em Gotham.',
      classificacao: '12 anos'
    },
    {
      id: 68718,
      titulo: 'Django Livre',
      ano: '2012',
      popularidade: 185,
      genero: 'Drama, Faroeste',
      duracao: '165 min',
      elenco: 'Jamie Foxx, Christoph Waltz, Leonardo DiCaprio',
      sinopse: 'Um escravo liberto se torna caçador de recompensas e busca libertar sua esposa das mãos de um fazendeiro cruel.',
      classificacao: '18 anos'
    }
  ];
  

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

    const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setFormData(prev => ({ ...prev!, titulo: newTitle }));
        // Chama a função debounced para buscar sugestões
        debouncedFetchSuggestions(newTitle);
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

    const fetchSuggestionsFromMock = async (query: string): Promise<FilmeDetalhado[]> => {
        console.log('[CadastrarPage] Buscando mock para:', query);
        setLoadingSugestoes(true); 
        return new Promise((resolve) => {
          setTimeout(() => {
            if (!query.trim()) {
              setLoadingSugestoes(false);
              resolve([]);
              return;
            }
            const lowerCaseQuery = query.toLowerCase();
            const results = todosOsFilmesMockadosParaBusca.filter(filme =>
              filme.titulo.toLowerCase().includes(lowerCaseQuery)
            );
            setLoadingSugestoes(false);
            resolve(results);
          }, 700);
        });
    };
    
    const debouncedFetchSuggestions = useCallback(
      debounce(async (query: string) => {
          if (query.length >= 4) {  // a partir de 4 caracteres a busca pode iniciar
            const fetchedSugestoes = await fetchSuggestionsFromMock(query);
            setSugestoes(fetchedSugestoes);
            setMostrarSugestoes(fetchedSugestoes.length > 0);
          } else {
            setSugestoes([]);
            setMostrarSugestoes(false);
          }
        }, 500), // Aguarda 500ms após a última digitação para chamar a busca
        [] 
    );

    const handleSugestaoClick = (sugestao: FilmeDetalhado) => {
        console.log('Sugestão clicada:', sugestao);
        //  TO DO Lógica para preencher o form
        setFormData(prev => ({
          ...prev!, // Mantém o que já estava no form (ex: Sua Nota, se já digitada)
          titulo: sugestao.titulo,
          diretor: sugestao.diretor,
          ano: sugestao.ano ? parseInt(sugestao.ano, 10) : undefined, // Converte ano string para number
          genero: sugestao.genero,
          // Para 'duracao', você precisará extrair o número. Ex: "120 min" -> 120
          duracao: sugestao.duracao ? parseInt(sugestao.duracao.split(' ')[0], 10) : undefined,
          elenco: sugestao.elenco,
          classificacao: sugestao.classificacao,
          sinopse: sugestao.sinopse,
        }));
        setMostrarSugestoes(false); // Esconde o dropdown após a seleção
        // Poderia também limpar o array de sugestoes se quisesse: setSugestoes([]);
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
                    <div className='relative'>
                        <label htmlFor="titulo" className={labelBaseClass}>Título:</label>
                        <input 
                            type="text"
                            name="titulo"
                            id="titulo"
                            ref={titleInputRef}
                            value={formData.titulo}
                            onChange={handleTitleInputChange}
                            onInvalid={handleTitleInvalid}
                            className={inputBaseClass}
                            required
                            placeholder='Lavoura Arcaica'
                            autoComplete='off'
                        />
                        {loadingSugestoes && (
                            <div className='absolute w-full mt-1 p-2 text-sm text-neutral-400 text-center'>
                                Buscando
                            </div>
                        )}
                        <ul
                            className='
                                absolute top-full left-0 right-0 z-10
                                mt-1
                                bg-neutral-800 border border-neutral-700
                                rounded-md shadow-lg
                                max-h-72 over-y-auto
                            '
                        >
                            {sugestoes.map((sugestao, index) => (
                                <li
                                    key={sugetao.id || index}
                                    onClick={() => handleSugestaoClick(sugestao)}
                                    className='
                                        px-4 py-2.5
                                        text-sm text-neutral-200
                                        hover:bg-sky-700 hover:text-white
                                        cursor-pointer
                                        border-b border-neutral-700/50 last:border-b-0    
                                    '
                                >
                                    <span className='font-semibold'>{sugestao.titulo}</span>
                                    {sugestao.ano && <span className='text-xs text-neutral-400 ml-2'>({sugestao.ano})</span>}
                                </li>
                            ))}
                        </ul>
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