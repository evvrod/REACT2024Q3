import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { setupStore } from './store/store';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import router from './router';

import './App.css';

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </React.StrictMode>
    </Provider>
  );
}

export default App;
