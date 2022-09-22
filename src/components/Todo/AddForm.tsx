import { Button, Flex, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { TodoEntityWithoutId } from '~/entities/TodoEntities';

/**
 * see: https://github.com/colinhacks/zod/issues/372#issuecomment-826380330
 */
function schemaForType<T>() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <S extends z.ZodType<T, any, any>>(arg: S) => arg;
}

const schema = schemaForType<TodoEntityWithoutId>()(
  z.object({
    value: z.string().min(1, { message: 'Required' }),
  }),
);

export const AddForm = ({ createTodo }: { createTodo: (todo: TodoEntityWithoutId) => Promise<void> }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoEntityWithoutId>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit(async (value) => {
        await createTodo(value);
        reset();
      })}
    >
      <Flex gap={6}>
        <FormControl isInvalid={errors.value !== undefined}>
          <Input {...register('value')} placeholder="Add your todo" bg="white" />
          <FormErrorMessage>{errors.value?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" minW={24} colorScheme="green" shadow="md">
          Add
        </Button>
      </Flex>
    </form>
  );
};
