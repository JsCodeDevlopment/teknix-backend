# Teknix - Back-end Typescript + Clean Architecture

## 💬 Descrição.

Este projeto é uma api com sistema de autenticação e CRUD de produtos.

## 🚧 Estrutura do Projeto.
A arquitetura segue o padrão de Clean Architecture e Inversão de Dependência. As principais camadas são:
- Domain: Define as entidades, gateways e interfaces do domínio.
Contém as definições de entidades, gateways e interfaces. Essa camada representa o domínio da aplicação e define a lógica de negócios e regras.
- Factories: Define a criação de repositórios, rotas e casos de uso.
Contém a lógica para criar instâncias de repositórios, rotas e casos de uso.
- Infra: Implementa repositórios, rotas, Sequelize e serviços.
Contém implementações específicas de infraestrutura, como repositórios, rotas, e serviços.
- Main: Configura o aplicativo, middlewares, e documentação Swagger.
- Usecases: Implementa casos de uso e DTOs.

📂 **Esquema de pastas:** Este projeto segue os princípios da Clean Architecture, dividindo o código em camadas bem definidas:
```
  src
├── domain
│   ├── product
│   │   ├── entity
│   │   ├── gateway
│   │   └── interfaces
│   └── user
│       ├── entity
│       ├── gateway
│       └── interfaces
├── factories
│   ├── repositories
│   │   ├── product
│   │   └── user
│   ├── routes
│   │   ├── auth
│   │   ├── product
│   │   └── user
│   └── useCases
│       ├── auth
│       ├── product
│       └── user
├── infra
│   ├── repositories
│   │   ├── product
│   │   └── user
│   ├── routes
│   │   ├── auth
│   │   │   ├── login
│   │   │   ├── me
│   │   │   ├── products
│   │   │   │   ├── create
│   │   │   │   │   └── dto
│   │   │   │   ├── delete
│   │   │   │   │   └── dto
│   │   │   │   ├── list
│   │   │   │   │   └── dto
│   │   │   │   ├── listById
│   │   │   │   │   └── dto
│   │   │   │   └── update
│   │   │   │       └── dto
│   │   │   ├── user
│   │   │   │   ├── create
│   │   │   │   │   └── dto
│   │   │   │   ├── delete
│   │   │   │   │   └── dto
│   │   │   │   ├── list
│   │   │   │   │   └── dto
│   │   │   │   └── listById
│   │   │   │       └── dto
│   ├── sequelize
│   │   ├── migrations
│   │   ├── models
│   │   │   ├── product
│   │   │   └── user
│   └── services
│       ├── encryptor
│       └── tokenGenerator
├── main
│   ├── @types
│   ├── adapters
│   │   └── http
│   │       └── interfaces
│   ├── api
│   │   ├── config
│   │   └── interfaces
│   ├── docs
│   │   └── swagger
│   │       ├── components
│   │       │   ├── auth
│   │       │   │   └── schema
│   │       │   ├── products
│   │       │   │   └── schema
│   │       │   └── user
│   │       │       └── schema
│   │       ├── config
│   │       ├── responses
│   │       └── schemas
│   └── middlewares
└── usecases
    ├── auth
    │   ├── generateToken
    │   │   └── dto
    │   ├── login
    │   │   └── dto
    ├── errors
    ├── product
    │   ├── create
    │   │   └── dto
    │   ├── delete
    │   │   └── dto
    │   ├── list
    │   │   └── dto
    │   ├── listById
    │   │   └── dto
    │   └── update
    │       └── dto
    └── user
        ├── create
        │   └── dto
        ├── delete
        │   └── dto
        ├── list
        │   └── dto
        └── listById
            └── dto
```
## ⚙ Resumo da Estrutura.

- **Entidade:** Define a estrutura e lógica de negócios básica da(s) Entidade(s).
- **Caso de Uso (UseCase):** Implementa a lógica de aplicação específica para criação, edição, deleção, listage ou atualização de uma entidade.
- **Configurações de Rota:** Define a abstração para as rotas HTTP.
- **Rota Específica:** Implementa a lógica da rota para executar uma ação feita no usecase.
- **Ponto de Entrada (Main):** Configura e inicializa a aplicação, incluindo a injeção de dependências.

## 🪀 Fluxo da Aplicação.

### Recepção da Requisição:
- Cliente: Envia uma requisição HTTP para o servidor (por exemplo, POST /products para criar um novo produto).
- Infraestrutura de Roteamento: As rotas são configuradas na camada infra/routes. As rotas direcionam a requisição para os controladores apropriados (por exemplo, product.route.ts).

### Tratamento da Requisição:
- Middlewares: Antes de alcançar o controlador, a requisição passa pelos middlewares definidos (por exemplo, autenticação, validação).
- Controladores: Os controladores na camada infra/routes recebem a requisição e chamam o caso de uso correspondente.

### Caso de Uso (UseCase):
- O caso de uso recebe o DTO de entrada.
- Cria uma instância da entidade Product usando o método Ex.: Product.create.
- Interage com o repositório Ex.: (ProductGateway) para persistir o produto no banco de dados.
- Gera um DTO de saída Ex.: (CreateProductOutputDto) com os dados do produto criado.

### Interação com o Domínio:
- Camada de Domínio (domain): O caso de uso interage com as entidades e interfaces de domínio (por exemplo, Product entity) para realizar a lógica de negócios.

### Repositório (Gateway):
- Camada de Repositórios (factories/repositories e infra/repositories): O caso de uso utiliza os repositórios para acessar e manipular os dados no banco de dados. A implementação do repositório está na camada infra/repositories, mas a interface do repositório é definida na camada factories/repositories.
- Sequelize: Os repositórios utilizam o Sequelize para interagir com o banco de dados, e os modelos são definidos na camada infra/sequelize/models.

### Persistência dos dados:
- Banco de Dados: Os dados são armazenados no banco de dados PostgreSQL conforme definido nos modelos Sequelize. As operações CRUD são realizadas por meio dos métodos do Sequelize.

### Resposta da Rota:
- Casos de Uso e Controladores: Após a execução do caso de uso, o controlador formata a resposta e a envia de volta ao cliente.
- Swagger: A documentação Swagger, configurada na pasta main/docs/swagger, descreve as APIs e suas rotas. A documentação é gerada a partir das definições e schemas Swagger e está acessível para os desenvolvedores via Swagger UI.

### 📱 Exemplo de Fluxo de Criação de Produto
- Requisição: O cliente envia uma requisição POST /products com um corpo JSON contendo os dados do produto.
- Middleware: O middleware de autenticação verifica o token JWT. Se válido, o request prossegue.
- Controlador: O controlador CreateProductController recebe a requisição e chama CreateProductUseCase.
- Caso de Uso: CreateProductUseCase valida os dados e utiliza o repositório para persistir o produto.
- Repositório: O repositório ProductRepository usa o Sequelize para salvar o produto no banco de dados.
- Resposta: O controlador formata a resposta e a envia ao cliente. A resposta é documentada no Swagger para referência.

## 🎯 Instalação.
1°→ Instalação das dependências:
```bash
npm install
# ou
yarn install
```
2°→ Inicialização do Prisma:
```bash
npx prisma init
```
3°→ Configure o banco de dados no arquivo `.env`:
```env
DB_HOST="exemple"
DB_NAME="exemple"
DB_USER="exemple"
DB_PASS="exemple"
DB_PORT=5432
```
4°→ Subir o container no docker:
```bash
docker compose up -d
```
5°→ Execute as migrações do Sequelize para configurar o banco de dados:
```bash
npm run migrate:up
# ou
yarn migrate:up
```
6°→ Execute a aplicação:
```bash
npm run dev
# ou
yarn dev

```

## 💻 Tecnologias Utilizadas.

 <div align="center">
  <image src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <image src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white" />
  <image src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <image src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white" />
  <image src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" />
</div>

## 👨‍💻 Desenvolvedor.

| Foto                                                                                                                           | Nome                                                 | Cargo               |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- | ------------------- |
| <img src="https://avatars.githubusercontent.com/u/100796752?s=400&u=ae99bd456c6b274cd934d85a374a44340140e222&v=4" width="100"> | [Jonatas Silva](https://github.com/JsCodeDevlopment) | FullStack Developer |
