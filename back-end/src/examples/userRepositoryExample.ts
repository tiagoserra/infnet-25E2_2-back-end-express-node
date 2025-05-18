import { UserRepository } from '../repositories/user.repository';
//npx ts-node src/examples/userRepositoryExample.ts
async function runExample() {
    const userRepo = new UserRepository();

    console.log('------ Exemplo de uso do UserRepository ------');

    // 1. Testar credenciais corretas
    console.log('\n1. Testando login com credenciais corretas...');
    const validUser = await userRepo.getByLoginAndPassword('usuario', 'senha123');
    if (validUser) {
        console.log('Login bem-sucedido!');
        console.log('Usuário encontrado:', validUser);
    } else {
        console.log('Falha no login: Usuário não encontrado');
    }

    // 2. Testar credenciais incorretas - login errado
    console.log('\n2. Testando login com login incorreto...');
    const invalidLogin = await userRepo.getByLoginAndPassword('usuario_inexistente', 'senha123');
    if (invalidLogin) {
        console.log('Login bem-sucedido!');
        console.log('Usuário encontrado:', invalidLogin);
    } else {
        console.log('Falha no login: Usuário não encontrado');
    }

    // 3. Testar credenciais incorretas - senha errada
    console.log('\n3. Testando login com senha incorreta...');
    const invalidPassword = await userRepo.getByLoginAndPassword('usuario', 'senha_errada');
    if (invalidPassword) {
        console.log('Login bem-sucedido!');
        console.log('Usuário encontrado:', invalidPassword);
    } else {
        console.log('Falha no login: Usuário não encontrado');
    }

    // 4. Buscar todos os usuários
    console.log('\n4. Listando todos os usuários cadastrados...');
    const allUsers = await userRepo.getAll();
    console.log(`Total de usuários: ${allUsers.length}`);
    console.log('Usuários:', allUsers);
}

// Executar o exemplo e tratar erros
runExample()
    .then(() => console.log('\n------ Exemplo concluído com sucesso! ------'))
    .catch(error => console.error('\nErro ao executar exemplo:', error));
