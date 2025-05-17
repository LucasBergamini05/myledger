# 🚧🚧 **MyLedger** 🚧🚧

Este projeto será um sistema de organização financeira simples.


## 📝 **Requisitos Funcionais**

- Login e autenticação do usuário
- Cadastro de transações (entrada e saída)
- Cadastro de transações em lote (via planilha, csv, etc)
- Listagem de transações com filtros
- Edição e exclusão de transações
- Cálculo automático do saldo total, entradas e saídas
- Cadastro e edição de categorias personalizadas
- Agrupamento por mês (relatórios mensais)
- Visualização de gráfico de gastos por categoria
- Armazenamento dos dados no banco de dados relacional
- Responsividade para celular e desktop

## 🖥️ **Stack de Tecnologias**

### 💻 Frontend + Backend

- [**Next.js**](https://nextjs.org/)
    - Framework React FullStack
- [**TypeScript**](https://www.typescriptlang.org/)
    - Extensão do JavaScript com tipagem forte
- [**Tailwind CSS**](https://tailwindcss.com/)
    - Framework CSS

### 🗃️ Banco de dados

- [**Neon**](https://planetscale.com/)
    - Banco de dados Postgres serverless
- [**Prisma ORM**](https://www.prisma.io/)
    - Interface entre o app e o banco, com tipagem e migrations

### ☁️ Deploy

- [**Vercel**](https://vercel.com/)
    - Deploy integrado ao GitHub.

### ⚙️ Dev Tools / Boas práticas

- [**Conventional Commits**](https://www.conventionalcommits.org/en/v1.0.0/)
    - Convenção de commits que facilita o versionamento semântico e changelogs automáticos
- [**Eslint**](https://eslint.org/)
    - Validação de estilo e erros no código
    - Com o plugin `eslint-plugin-perfectionist` (organização de objetos, imports, etc.)
- [**Prettier**](https://prettier.io/)
    - Formatação automática de código