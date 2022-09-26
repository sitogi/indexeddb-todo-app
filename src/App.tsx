import { Suspense } from 'react';

import { Box, Flex } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';

import { CenterLoader } from '~/components/CenterLoader';
import { ErrorDetail } from '~/components/ErrorDetail';
import { HelloIndexedDB } from '~/components/HelloIndexedDB';

export const App = () => {
  return (
    <Flex h="100vh" w="100vw" justify="center" px="auto" py={4}>
      <Box w="full" maxW="container.lg" bg="blue.50" p={6} rounded="md">
        <ErrorBoundary fallbackRender={(fallbackProps) => <ErrorDetail error={fallbackProps.error} />}>
          <Suspense fallback={<CenterLoader text="initializing database..." />}>
            <HelloIndexedDB />
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Flex>
  );
};
