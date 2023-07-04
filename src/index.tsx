import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './global-state/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import DeleteModalContext from './app/DeleteModal/DeleteModalContext';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

//Views
import App from './App';
import PublicView from './PublicView';
import AdminView from './AdminView';
import LoginView from './routes/login/LoginPage';
import ResetPasswordView from './routes/reset-password/ResetPasswordView';

const container = document.getElementById('root')!;
const root = createRoot(container);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DeleteModalContext>
        <AdminView />
      </DeleteModalContext>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
