import { Suspense } from 'react';

import useSWR from 'swr';

import { CenterLoader } from '~/components/CenterLoader';
import { Todo } from '~/components/Todo';
import { initDatabase } from '~/repositories/TodoRepository';

export const HelloIndexedDB = () => {
  // 戻り値使わないのは想定されてる使い方なのか怪しい
  useSWR('indexeddb', initDatabase, { suspense: true });

  return (
    <Suspense fallback={<CenterLoader text="fetching..." />}>
      <Todo />
    </Suspense>
  );
};
