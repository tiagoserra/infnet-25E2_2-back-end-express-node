import { useState, useEffect } from 'react';
import { Container, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksAsync, deleteTaskAsync } from '../redux/slices/taskSlice';
import TaskModal from '../components/TaskModal';

const Home = () => {
  const dispatch = useDispatch();
  const { tasks, status } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    if (user?.jwt) {
      dispatch(fetchTasksAsync(user.jwt));
    } else {
      console.log('Token não disponível');
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (shouldReload && user?.jwt) {
      dispatch(fetchTasksAsync(user.jwt));
      setShouldReload(false);
    }
  }, [shouldReload, dispatch, user]);

  const toggle = () => {
    setModalOpen(!modalOpen);
    if (!modalOpen) {
      setSelectedTask(null);
    } else {
      setShouldReload(true);
    }
  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleDelete = (task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteTaskAsync({ token: user.jwt, taskId: taskToDelete.id }));
    setDeleteModalOpen(false);
    setShouldReload(true);
  };

  if (status === 'loading') {
    return <Container>Carregando...</Container>;
  }

  return (

    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Tarefas</h2>
        <Button color="primary" onClick={toggle}>Nova Tarefa</Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            {/*<th>Tipo</th>*/}
            <th>Data</th>
            <th>Hora</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.length > 0 ? tasks.map(task => (
            task && (
              <tr key={task.id}>
                <td>{task.name || 'Sem nome'}</td>
                {/*<td>{task.type}</td>*/}
                <td>{task.date || 'Sem data'}</td>
                <td>{task.time || 'Sem hora'}</td>
                <td>
                  <Button color="info" size="sm" className="mr-2" onClick={() => handleEdit(task)}>
                    <FaEdit />
                  </Button>
                  <Button color="danger" size="sm" onClick={() => handleDelete(task)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            )
          )) : (
            <tr>
              <td colSpan="4" className="text-center">Nenhuma tarefa encontrada</td>
            </tr>
          )}
        </tbody>
      </Table>

      <TaskModal
        isOpen={modalOpen}
        toggle={toggle}
        task={selectedTask}
      />

      <Modal isOpen={deleteModalOpen} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirmar Exclusão</ModalHeader>
        <ModalBody>
          Tem certeza que deseja excluir esta tarefa?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleDeleteModal}>Não</Button>
          <Button color="danger" onClick={confirmDelete}>Sim</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Home; 