## About

### Projeto
Este projeto é uma aplicação completa que permite aos usuários gerenciar tickets. A aplicação oferece funcionalidades para adicionar, editar, deletar e visualizar tickets, além de permitir a adição de comentários. A interface foi desenvolvida usando React e Next.js, com o estado sendo gerenciado pelo Redux. O backend da aplicação é fornecido por um endpoint de API.

### Funcionalidades
- **Adicionar Ticket**: Permite aos usuários criar novos tickets com título, descrição e autor.
- **Editar Ticket**: Facilita a atualização dos detalhes de um ticket existente.
- **Deletar Ticket**: Oferece uma maneira de remover tickets desnecessários.
- **Visualizar Tickets**: Exibe os tickets e seus detalhes.
- **Adicionar Comentários**: Permite aos usuários adicionar comentários aos tickets.
- **Atualizar Status do Ticket**: Facilita a alteração do status de um ticket.

### Tecnologias Utilizadas
- **Frontend**: React, Next.js, Redux, TypeScript
- **Backend**: API Node.js hospedada no Render
- **Styling**: Tailwind CSS, clsx
- **Outras Ferramentas**: Lucide-icons, Formik, Yup, Sonner para notificações

### Instalação e Configuração
1. Clone o repositório:
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DO_REPOSITORIO>
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente:
    - Crie um arquivo `.env` na raiz do projeto e adicione a variável:
        ```env
        NEXT_PUBLIC_API_URL=https://dev-joel-estumano-api.onrender.com
        ```

4. Execute a aplicação em desenvolvimento:
    ```bash
    npm run dev
    ```

5. Acesse a aplicação em seu navegador em `http://localhost:3000`.

### Deploy
O deploy desta aplicação está configurado para ser feito no Netlify. Certifique-se de configurar as variáveis de ambiente no painel do Netlify conforme descrito anteriormente.

### Contribuição
Sinta-se à vontade para contribuir com este projeto. Aqui estão algumas maneiras de começar:
- Crie um fork do projeto
- Faça suas alterações
- Envie um pull request para revisão

### Autor
Este projeto foi desenvolvido por Joel Estumano. Se tiver alguma dúvida ou sugestão, entre em contato através do [LinkedIn](https://www.linkedin.com/in/joel-estumano/).

### Licença
Este projeto é licenciado sob a [MIT License](LICENSE).

---
