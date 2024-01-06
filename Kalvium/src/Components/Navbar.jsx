import React, { useContext, useEffect, useLayoutEffect } from 'react'
import KalviumLogo from './../assets/KalviumBigLogo.png'
import SearchIcon from './../assets/SearchIcon.png'
import { Link } from 'react-router-dom'
import { AppContext } from './ParentContext'


const Navbar = () => {
  const {isLogin,setIsLogin} =useContext(AppContext)
  const handleLogout=()=>{
    setIsLogin(false)
    localStorage.removeItem("User")
  }
  useLayoutEffect(()=>{
    const User = localStorage.getItem("User")
    if(User){
      setIsLogin(true)
    }
  },[])

  return (
    <nav className='nav'>
      <Link to={"/"}>
        <img className="logo" src={KalviumLogo} alt="" />
      </Link>
        <div className='search-section'>
        <img src={SearchIcon} alt="" />
        <input className='searchbar' type="search" placeholder='Search Books'/>
        </div>
        {isLogin?<button onClick={handleLogout} className='register'>LOG OUT</button>:<Link to={"/register"}>
        <button className='register'>REGISTER</button>
        </Link>}
        {/* <Link to={"/register"}>
        <button className='register'>REGISTER</button>
        </Link> */}

    </nav>
  )
}

export default Navbar

