import { useState } from 'react'
import './App.css'

import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Crud from './Pages/CRUD/Crud'

import AddStudent from './Pages/AddStudent/AddStudent'
import UpdateStudent from './Pages/UpdteStudent/UpdateStudent'
import DelStudent from './Pages/DelStudent/DelStudent'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import ProtectedRoute from './Pages/ProtectedRoute/ProtectedRoute'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        
        <Route path="/crud" element={
          <ProtectedRoute>
            <Crud/>
          </ProtectedRoute>
        } />

        <Route path='/addStudent' element={<AddStudent/>} />
        <Route path='/updateStudent/:id' element={<UpdateStudent/>} />
        <Route path='/delStudent/:id' element={<DelStudent/>} />

        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </>
  )
}

export default App
