import { useCallback } from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Text } from '@chakra-ui/react';

import { TodoEntity } from '~/entities/TodoEntities';

export const TodoItem = ({ todo, deleteTodo }: { todo: TodoEntity; deleteTodo: (id: number) => Promise<void> }) => {
  const handleDeleteClick = useCallback(async () => {
    await deleteTodo(todo.id);
  }, [todo.id]);

  return (
    <Flex align="center" justify="space-between" bg="blackAlpha.50" py={2} px={4} rounded="md">
      <Text>{todo.value}</Text>
      <IconButton
        aria-label="delete todo"
        onClick={handleDeleteClick}
        icon={<DeleteIcon />}
        colorScheme="red"
        variant="ghost"
      />
    </Flex>
  );
};
