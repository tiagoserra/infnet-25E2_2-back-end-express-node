# Projeto Full Stack - Task Manager

Este é um projeto full stack de gerenciamento de tarefas, desenvolvido com React no frontend e Express.js + Node.js no backend.

## 🚀 Tecnologias Utilizadas

### Frontend
- React
- Redux Toolkit
- React Router
- Reactstrap
- Styled Components
- React Icons
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- ESLint
- Nodemon
- bcryptjs
- jsonwebtoken
- dotenv
- express-rate-limit
- uuid

## 📋 Pré-requisitos

- Node.js (versão LTS recomendada)
- npm ou yarn

## 🔧 Instalação e Execução

### Backend

1. Entre na pasta do backend:
```bash
cd back-end
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto backend com as seguintes variáveis:
```env
PORT=3000
JWT_SECRET=seu_segredo_jwt
```

4. Execute o backend:
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

### Frontend

1. Em um novo terminal, entre na pasta do frontend:
```bash
cd front-end
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto frontend com as seguintes variáveis:
```env
REACT_APP_API_URL=http://localhost:3001
```

4. Execute o frontend:
```bash
npm start
```

## 📝 Scripts Disponíveis

### Backend
- `npm run dev`: Inicia o servidor em modo de desenvolvimento com hot-reload
- `npm run build`: Compila o projeto TypeScript para JavaScript
- `npm start`: Inicia o servidor em modo de produção
- `npm run lint`: Executa o linter para verificar o código

### Frontend
- `npm start`: Inicia o servidor de desenvolvimento na porta 3001
- `npm run build`: Cria a build de produção
- `npm run test`: Executa os testes
- `npm run eject`: Ejecta do Create React App

## 🔍 Estrutura do Projeto

```
projeto/
├── back-end/           # Backend Express + Node.js
│   ├── src/           # Código fonte
│   ├── dist/          # Código compilado
│   ├── node_modules/  # Dependências
│   ├── package.json   # Configurações e dependências
│   └── tsconfig.json  # Configuração do TypeScript
│
└── front-end/         # Frontend React
    ├── src/          # Código fonte
    │   ├── components/    # Componentes React
    │   ├── pages/        # Páginas da aplicação
    │   ├── redux/        # Configuração do Redux
    │   ├── services/     # Serviços e APIs
    │   └── contexts/     # Contextos React
    ├── public/       # Arquivos estáticos
    └── package.json  # Configurações e dependências
```

## 🔒 Segurança

### Backend
- Implementação de rate limiting para proteção contra ataques de força bruta
- Autenticação via JWT
- Senhas criptografadas com bcrypt

### Frontend
- Proteção de rotas com autenticação
- Armazenamento seguro do token JWT
- Validação de formulários

## 📚 Documentação da API

A documentação da API estará disponível em `/api-docs` quando o servidor backend estiver rodando.

## 🤝 Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.