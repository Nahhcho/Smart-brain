import React, { useContext } from 'react'
import './navigation.css'
import { useNavigate } from 'react-router-dom'
import { Context } from '../ContextProvider';

const Navigation = () => {

  const navigate = useNavigate();
  const [session, setSession] = useContext(Context)

  const signOut = () => {
    navigate('/')
    setSession({...session, user: null})
    
  }

  return (
    <nav className='navbar'>
        <p className='f3 link dim black underline pa3 pointer' onClick={signOut}>Sign out</p>
    </nav>
  )
}

export default Navigation