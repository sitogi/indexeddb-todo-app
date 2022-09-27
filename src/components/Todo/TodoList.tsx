import { Stack } from '@chakra-ui/react';

import { TodoItem } from '~/components/Todo/TodoItem';
import { TodoEntity } from '~/entities/TodoEntities';

type Props = { todoList: TodoEntity[]; deleteTodo: (id: number) => Promise<void> };

export const TodoList = ({ todoList, deleteTodo }: Props) => {
  return (
    <Stack px={4} overflow="auto">
      {todoList.map((todo) => (
        <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
      ))}
    </Stack>
  );
};
