import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'



export const Context =  createContext({isAuthnecated:false})


const AppWrapper=()=>{
const[isAuthnecated,setIsAuthnecated] = useState(false)
const[isLoading,setIsLoading] = useState(false)

  return <Context.Provider value={{
    isAuthnecated,
    setIsAuthnecated,
    isLoading,
    setIsLoading
  }}> 
         <App />
          </Context.Provider>
}

ReactDOM.createRoot(document.getElementById('root')).render(

    <AppWrapper/>

)
