import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Toast from './components/popup/Toast';

function App() {
  return (
    <BrowserRouter>
       <AppLayout/>
       <Toast/>
    </BrowserRouter>
  )
}

export default App