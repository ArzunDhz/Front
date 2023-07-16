import React from 'react'
import Logo from '../assets/Logo.png'
const Header = () => {
  return (
    <div className=' select-none flex items-center ml-2 mt-2 space-x-2' >
  <img src={Logo}  className='  w-[40px] rounded-full' alt="" />
  <h1 className=' text-lg'>Dhzking</h1>
    </div>
  )
}

export default Header