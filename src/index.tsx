import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import store from './app/store/createStore';
import { Provider } from 'react-redux';
import { FormsProvider } from './app/context/useForms';
import { colors, config } from './themesSettings';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = extendTheme({ config, colors });

root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <React.StrictMode> */}

      <ChakraProvider
        toastOptions={{ defaultOptions: { position: 'top-right' } }}
        theme={theme}
      >
        <FormsProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </FormsProvider>
      </ChakraProvider>
      {/* </React.StrictMode> */}
    </BrowserRouter>
  </Provider>
);
