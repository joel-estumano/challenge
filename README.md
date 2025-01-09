This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

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

Com essas informações, a seção `About` do seu repositório Git estará bem documentada, clara e profissional. Se precisar de mais alguma coisa ou quiser ajustar algum detalhe, estou à disposição! 🌟
