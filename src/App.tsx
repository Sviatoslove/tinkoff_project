import { Flex } from '@chakra-ui/react';
import { useLocation, useRoutes } from 'react-router-dom';
import routes from './app/components/routes/routes';
import localStorageService from './app/services/localStorage.service';
import AppLoader from './app/components/ui/hoc/AppLoader';

function App() {
  const isLoggedIn: any = localStorageService.getUser();
  const location = useLocation();

  const elements:React.ReactNode = useRoutes(routes(isLoggedIn, location));

  return (
    <AppLoader>
      <Flex flexDirection={'column'} mx={'auto'} maxW="1230px" h="100dvh" p={2}>
        {elements}
      </Flex>
    </AppLoader>
  );
}

export default App;
