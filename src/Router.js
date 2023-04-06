import Navigation from 'component/Navigation';
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profiles from 'routes/Profiles';

function AppRouter({isLoggeIn, userObj}) {
  // const [isLoggeIn, setIsLoggedIn] = useState(true);

  return (
    <BrowserRouter>
    {isLoggeIn && <Navigation userObj={userObj} /> }
      <Routes>
       {isLoggeIn ? (
        <>
        <Route path='/' element={<Home userObj={userObj} />}/>
        <Route path='/profile' element={<Profiles userObj={userObj} />} />
        </>
       ): (
        <Route path='/' element={<Auth/>}/>
       )}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter