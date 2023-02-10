import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MetamaskProvider from './contexts/Metamask';
import CoinsProvider from 'contexts/Coins';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import classes from 'variables.module.scss';

toast.configure({ theme: 'colored', style: { marginTop: 70 } });

ReactDOM.render(
  <React.StrictMode>
    <MetamaskProvider>
      <CoinsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CoinsProvider>
    </MetamaskProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
