import { Stack, Text } from '@chakra-ui/react';

import { TodoItem } from '~/components/Todo/TodoItem';
import { TodoEntity } from '~/entities/TodoEntities';

type Props = { todoList: TodoEntity[]; error?: Error; deleteTodo: (id: number) => Promise<void> };

export const TodoList = ({ todoList, error, deleteTodo }: Props) => {
  if (error) {
    return <Text>{`Error: ${error.message}`}</Text>;
  }

  return (
    <Stack px={4} overflow="auto">
      {todoList.map((todo) => (
        <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
      ))}
    </Stack>
  );
};
