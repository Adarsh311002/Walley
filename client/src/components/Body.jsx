import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '../routes'

const Body = () => {
  return (
    <div>
      <RouterProvider router = {router} />
    </div>
  )
}

export default Body
