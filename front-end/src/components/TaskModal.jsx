import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskAsync, updateTaskAsync } from '../redux/slices/taskSlice';
//import taskTypes from '../assets/taskTypes.json';

const TaskModal = ({ isOpen, toggle, task }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    description: '',
    //type: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData({
        name: '',
        date: '',
        time: '',
        description: '',
        //type: ''
      });
    }
  }, [task, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.time || !formData.description) {// || !formData.type) {
      setError('Todos os campos são obrigatórios!');
      return;
    }
    
    try {
      if (task) {
        await dispatch(updateTaskAsync({ token: user.jwt, taskData: { ...formData, id: task.id } })).unwrap();
      } else {
        await dispatch(createTaskAsync({ token: user.jwt, taskData: formData })).unwrap();
      }
      toggle();
    } catch (error) {
      setError('Erro ao salvar a tarefa. Tente novamente.');
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {task ? 'Editar Tarefa' : 'Nova Tarefa'}
      </ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Nome</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormGroup>
          {/*<FormGroup>
            <Label for="type">Tipo</Label>
            <Input
              type="select"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              {taskTypes.types.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </Input>
          </FormGroup>*/}
          <FormGroup>
            <Label for="date">Data</Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="time">Hora</Label>
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Descrição</Label>
            <Input
              type="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
        <Button color="primary" onClick={handleSubmit}>Salvar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default TaskModal; 