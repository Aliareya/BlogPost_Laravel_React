import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Toast from "./components/popup/Toast";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
      <Toast />
    </BrowserRouter>
  );
}

export default App;
