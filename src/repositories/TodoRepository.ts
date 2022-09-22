import { TodoEntity, TodoEntityWithoutId } from '~/entities/TodoEntities';

let db: IDBDatabase;

const DB_NAME = 'todo-app';
const OBJECT_STORE_TODOS = 'todos';

export const initDatabase = () => {
  // 戻り値が Promise<void> だと、 useSWR しても Suspense が解決として判断してくれず、fallback したままになった。
  // そのため、boolean を利用してなにかしている訳ではないがこうしている。
  return new Promise<boolean>((resolve, reject) => {
    const openRequest = indexedDB.open(DB_NAME);

    openRequest.onsuccess = () => {
      db = openRequest.result;
      resolve(true);
    };

    // called at first open
    openRequest.onupgradeneeded = (event) => {
      // なんで型ないのこれ
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const db = event.target?.result as IDBDatabase;
      db.createObjectStore(OBJECT_STORE_TODOS, { keyPath: 'id', autoIncrement: true });
      console.log('object store created.');
    };

    openRequest.onerror = () => {
      reject(new Error('Failed to open database.'));
    };
  });
};

type TodoRepository = {
  create: (todo: TodoEntityWithoutId) => Promise<TodoEntity>;
  getAll: () => Promise<TodoEntity[]>;
  update: () => Promise<void>;
  delete: (id: number) => Promise<void>;
};

export const getRepository = async (): Promise<TodoRepository> => {
  if (db === undefined) {
    await initDatabase();
  }

  return {
    create: (todo: TodoEntityWithoutId) => {
      return new Promise<TodoEntity>((resolve, reject) => {
        const transaction = db.transaction(OBJECT_STORE_TODOS, 'readwrite');
        const todoStore = transaction.objectStore(OBJECT_STORE_TODOS);

        const request = todoStore.add(todo);
        request.onsuccess = () => {
          resolve({ id: request.result as number, value: todo.value });
        };
        request.onerror = reject;
      });
    },
    getAll: () => {
      return new Promise<TodoEntity[]>((resolve, reject) => {
        const transaction = db.transaction(OBJECT_STORE_TODOS, 'readwrite');
        const todoStore = transaction.objectStore(OBJECT_STORE_TODOS);

        const request = todoStore.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = reject;
      });
    },
    update: () => Promise.resolve(),
    delete: (id: number) => {
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(OBJECT_STORE_TODOS, 'readwrite');
        const todoStore = transaction.objectStore(OBJECT_STORE_TODOS);

        const request = todoStore.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = reject;
      });
    },
  };
};
