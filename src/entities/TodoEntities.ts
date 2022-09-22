export type TodoEntity = { id: number; value: string };
export type TodoEntityWithoutId = Omit<TodoEntity, 'id'>;
