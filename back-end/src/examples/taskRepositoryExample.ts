import { TaskRepository } from '../repositories/task.repository';
import { Task } from '../models/task.model';
//npx ts-node src/examples/taskRepositoryExample.ts
async function runExample() {
    const taskRepo = new TaskRepository();

    console.log('------ Exemplo de uso do TaskRepository ------');

    // 1. Inserir uma tarefa
    console.log('\n1. Inserindo uma nova tarefa...');
    const newTask: Task = {
        name: 'Estudar Node.js',
        type: 'Estudo',
        date: new Date(),
        time: '2h'
    };

    const insertedTask = await taskRepo.insert(newTask);
    console.log('Tarefa inserida:', insertedTask);

    // 2. Buscar todas as tarefas
    console.log('\n2. Buscando todas as tarefas...');
    const allTasks = await taskRepo.getAll();
    console.log(`Total de tarefas: ${allTasks.length}`);
    console.log('Tarefas:', allTasks);

    // 3. Buscar uma tarefa pelo ID
    console.log('\n3. Buscando tarefa pelo ID...');
    const taskById = await taskRepo.getById(insertedTask.id!);
    console.log('Tarefa encontrada:', taskById);

    // 4. Atualizar uma tarefa
    console.log('\n4. Atualizando uma tarefa...');
    const updatedTask = await taskRepo.update(insertedTask.id!, {
        name: 'Estudar Node.js e Express',
        time: '3h'
    });
    console.log('Tarefa atualizada:', updatedTask);

    // 5. Buscar todas as tarefas novamente para verificar a atualização
    console.log('\n5. Verificando tarefas após atualização...');
    const tasksAfterUpdate = await taskRepo.getAll();
    console.log('Tarefas após atualização:', tasksAfterUpdate);

    // 6. Deletar uma tarefa
    console.log('\n6. Deletando uma tarefa...');
    const isDeleted = await taskRepo.delete(insertedTask.id!);
    console.log(`Tarefa deletada: ${isDeleted}`);

    // 7. Verificar se a tarefa foi realmente excluída
    console.log('\n7. Verificando se a tarefa foi excluída...');
    const tasksAfterDelete = await taskRepo.getAll();
    console.log(`Total de tarefas após exclusão: ${tasksAfterDelete.length}`);
    console.log('Tarefas após exclusão:', tasksAfterDelete);
}

// Executar o exemplo e tratar erros
runExample()
    .then(() => console.log('\n------ Exemplo concluído com sucesso! ------'))
    .catch(error => console.error('\nErro ao executar exemplo:', error));
