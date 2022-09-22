import { Grid, Spinner, Text, VStack } from '@chakra-ui/react';

export const CenterLoader = ({ text }: { text: string }) => {
  return (
    <Grid h="full" w="full" placeContent="center">
      <VStack>
        <Spinner />
        <Text>{text}</Text>
      </VStack>
    </Grid>
  );
};
