import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from '@/components/ui/provider';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContextProvider } from './context/Themecontext.jsx';
import store from './store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <Provider>
        <ThemeContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeContextProvider>
      </Provider>
    </ReduxProvider>
  </StrictMode>
);
