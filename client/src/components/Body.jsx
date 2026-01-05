import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '../routes'
import { Toaster } from 'sonner';

const Body = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default Body
