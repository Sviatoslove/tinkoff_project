import { Flex } from '@chakra-ui/react';
import { useLocation, useRoutes } from 'react-router-dom';
import routes from './app/components/routes/routes';
import localStorageService from './app/services/localStorage.service';

function App() {
  const isLoggedIn: any = localStorageService.getUser();
  const location = useLocation();

  const elements = useRoutes(routes(isLoggedIn, location));

  return (
    <Flex flexDirection={'column'} mx={'auto'} maxW="1230px" h="100dvh" p={2}>
      {elements}
    </Flex>
  );
}

export default App;
