import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { Provider} from './contexts/ModalContext';
import {Provider as DataProvider} from './contexts/DataContext'

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
    <Provider>
    <App />
    </Provider>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

