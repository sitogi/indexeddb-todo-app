import { Alert, AlertDescription, AlertIcon, AlertTitle, Grid } from '@chakra-ui/react';

export const ErrorDetail = ({ error }: { error: Error }) => {
  return (
    <Grid h="full" w="full" placeContent="center">
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        h="200px"
        w="600px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Error occurred.
        </AlertTitle>
        <AlertDescription maxWidth="sm">{error.message}</AlertDescription>
      </Alert>
    </Grid>
  );
};
