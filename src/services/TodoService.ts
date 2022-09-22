import { TodoEntity, TodoEntityWithoutId } from '~/entities/TodoEntities';
import { getRepository } from '~/repositories/TodoRepository';

export const create = async (todo: TodoEntityWithoutId): Promise<TodoEntity> => {
  if (todo.value === '') {
    throw new Error('value is required.');
  }

  const todoRepository = await getRepository();

  return await todoRepository.create(todo);
};

export const list = async (): Promise<{ todos: TodoEntity[] }> => {
  try {
    const todoRepository = await getRepository();
    const todos = await todoRepository.getAll();

    return { todos };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to list todo.');
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  const todoRepository = await getRepository();
  await todoRepository.delete(id);
};
