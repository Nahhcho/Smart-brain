import React, { useContext, useEffect } from 'react'
import './rank.css'
import { Context } from '../ContextProvider'
import { useNavigate } from 'react-router-dom'

const Rank = () => {
  const [session, setSession] = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    if(session.user === null) {
        return navigate('/')
    }
  })

  return (
    <div>
        <div className='white f3'>
          {
            session.user !== null ? (
              <p>{session.user.name}, your current entry count is...</p>
            ) : (null)
          }
            
        </div>
        <div className='white f1'>
            {session.user.entries}
        </div>
    </div>
  )
}

export default Rank