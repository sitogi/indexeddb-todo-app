import { Stack } from '@chakra-ui/react';
import useSWR from 'swr';

import { AddForm } from '~/components/Todo/AddForm';
import { TodoList } from '~/components/Todo/TodoList';
import * as todoService from '~/services/TodoService';

export const Todo = () => {
  const { data, error, mutate } = useSWR('todo', todoService.list, { suspense: true });

  return (
    <Stack h="full" gap={6}>
      <AddForm
        createTodo={async (todo) => {
          const created = await todoService.create(todo);
          await mutate((latest) => ({ todos: [...(latest?.todos || []), created] }), false);
        }}
      />
      <TodoList
        todoList={data?.todos || []}
        error={error}
        deleteTodo={async (id) => {
          await todoService.deleteTodo(id);
          await mutate((latest) => ({ todos: (latest?.todos || []).filter((todo) => todo.id !== id) }), false);
        }}
      />
    </Stack>
  );
};
