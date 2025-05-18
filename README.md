# Projeto Full Stack - Backend Express Node.js

Este é o backend do projeto desenvolvido com Express.js e Node.js, utilizando TypeScript.

## 🚀 Tecnologias Utilizadas

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

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Entre na pasta do backend:
```bash
cd back-end
```

3. Instale as dependências:
```bash
npm install
```

4. Crie um arquivo `.env` na raiz do projeto backend com as seguintes variáveis:
```env
PORT=3000
JWT_SECRET=seu_segredo_jwt
```

## 🚀 Executando o Projeto

### Desenvolvimento
Para rodar o projeto em modo de desenvolvimento:
```bash
npm run dev
```

### Produção
Para build e execução em produção:
```bash
npm run build
npm start
```

## 📝 Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com hot-reload
- `npm run build`: Compila o projeto TypeScript para JavaScript
- `npm start`: Inicia o servidor em modo de produção
- `npm run lint`: Executa o linter para verificar o código

## 🔍 Estrutura do Projeto

```
back-end/
├── src/           # Código fonte
├── dist/          # Código compilado
├── node_modules/  # Dependências
├── package.json   # Configurações e dependências
└── tsconfig.json  # Configuração do TypeScript
```

## 🔒 Segurança

- Implementação de rate limiting para proteção contra ataques de força bruta
- Autenticação via JWT
- Senhas criptografadas com bcrypt

## 📚 Documentação da API

A documentação da API estará disponível em `/api-docs` quando o servidor estiver rodando.

## 🤝 Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.