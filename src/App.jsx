import React from 'react'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Todo from './components/Todo'
import UserInfo from './components/UserInfo'
export const API = 'https://okk-6ka1.onrender.com/api/'


const App = () => {
  return (
    <>
    <Router>
     <Header/>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/todo' element={<Todo/>}/>
        <Route path='/userInfo' element={<UserInfo/>}/>
      </Routes>
      <Toaster/>
    </Router>
 


    </>
  )
}

export default App
