import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import store from './app/store/createStore';
import { Provider } from 'react-redux';
import { FormsProvider } from './app/context/useForms';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <ChakraProvider toastOptions={{ defaultOptions: { position: 'top-right' } }}>
      <FormsProvider>
        <App />
      </FormsProvider>
    </ChakraProvider>
    {/* </React.StrictMode> */}
  </Provider>
);
