This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Protótipo Projeto Final de PWEB

## Descrição

Este projeto é um protótipo frontend desenvolvido como parte dos requisitos para aprovação parcial na matéria de Programação Web (PWEB) da FATEC Sorocaba.

A aplicação consiste em um diário de filmes assistidos. Nesta etapa de protótipo, o frontend foi construído utilizando React/Next.js e opera com dados mocados (simulados) para demonstração das funcionalidades da interface do usuário e navegação.

O protótipo funcional pode ser acessado em: [[Protótipo](https://prototipo-jade.vercel.app/)]

## Como Baixar/Rodar o Projeto Localmente

Para baixar e executar este projeto frontend em sua máquina local, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/abertanha/PWEB.git
    ```
2.  **Navegue até a pasta do frontend:**

    ```bash
    cd PWEB/prototipo/frontend
    ```
3.  **Instale as dependências:**
    Certifique-se de ter o [Node.js](https://nodejs.org/) (que inclui o npm) instalado.
    ```bash
    npm install
    ```
    (Se você utilizar `yarn` ou `pnpm`, substitua pelo comando correspondente: `yarn install` ou `pnpm install`)

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
5.  **Abra no navegador:**
    Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação rodando.

## Funcionalidades Implementadas no Protótipo Frontend

* **Tela de Menu Principal:**
    * Navegação para as seções de cadastro e consulta.
    * (Animações de entrada implementadas parcialmente).
* **Tela de Cadastro de Novo Filme (`/cadastrar`):**
    * Formulário para adicionar novos filmes.
    * Foco automático no campo "Título".
    * Autocompletar para o campo "Título" com dados mockados e dropdown de sugestões.
    * Preenchimento automático do formulário ao selecionar uma sugestão.
    * Botões para "Limpar Entrada" e "Salvar Entrada" (salvamento mockado).
    * Mensagem de validação customizada para o campo título.
* **Tela de Consulta da Coleção (`/colecao`):**
    * Exibição da lista de filmes mockados em uma grade responsiva de cartazes.
    * Botão para retornar ao menu principal.
    * Campo de busca para filtrar filmes pelo título (filtrando os dados mockados).
    * Interatividade nos cartazes de filme:
        * Ao clicar no cartaz: efeito de blur e exibição de ícones de ação (detalhes, editar, deletar).
        * Tooltips e cursor de "mãozinha" nos ícones de ação.
    * **Modal de Detalhes do Filme:**
        * Exibição das informações completas de um filme.
        * Layout com imagem de backdrop e degradê para a área de texto.
        * Botão para fechar o modal.
    * **Modal de Confirmação de Deleção:**
        * Mensagem de confirmação incluindo o título do filme.
        * Botões "Excluir" e "Cancelar".
        * Botão para fechar o modal.
    * **Modal de Edição de Filme:**
        * Formulário pré-preenchido com os dados do filme.
        * Botões "Salvar Alterações", "Resetar Mudanças" e um botão para fechar/cancelar.
        * (Validação detalhada dos campos do formulário de edição será implementada futuramente).

## Tecnologias Utilizadas (Frontend)

* **TypeScript**
* **React**
* **Next.js** (App Router)
* **TailwindCSS** (para estilização)
* **Heroicons** (para iconografia)
* `lodash.debounce` (para a funcionalidade de autocompletar)

## Autor

* **Adriano Bertanha**
* **RA:** 0030482321026
* FATEC Sorocaba - Análise e Desenvolvimento de Sistemas

---
