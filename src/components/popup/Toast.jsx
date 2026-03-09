// src/components/Toast.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />;
};

// // Helper functions to trigger toast from anywhere
// export const showSuccessToast = (message) => {
//   toast.success(message);
// };

// export const showErrorToast = (message) => {
//   toast.error(message);
// };

// export const showInfoToast = (message) => {
//   toast.info(message);
// };

// export const showWarningToast = (message) => {
//   toast.warning(message);
// };

export default Toast;