import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../ContextProvider'
import Error from '../error/Error'

const Signin = () => {

    const navigate = useNavigate();
    const [session, setSession] = useContext(Context);
    const [error, setError] = useState({
        warn: false,
        message: ''
    })
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const signin = (e) => {
        setError({...error, warn: false})
        e.preventDefault();
        fetch(`${session.SERVER_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.message === 'Successful login') {
                navigate('/detect')
                setSession({...session, user: result.user})
            } else {
                setError({
                    warn: true,
                    message: result.message
                })
            }
        })
    }

    

  return (
    <>
    {
        error.warn ? (
            <Error message={error.message} />
        ) : null
    }
    <article class="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main class="pa4 black-80">
            <form class="measure">
                <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                    <legend class="f2 fw6 ph0 mh0">Sign In</legend>
                    <p>Email: demo1@email.com </p>
                    <p>Password: 1234 </p>
                        <div class="mt3">
                            <label class="db fw6 lh-copy f6" for="email-address">Email</label>
                            <input onChange={(e) => {setUser({...user, email: e.target.value})}} value={user.email} class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div class="mv3">
                            <label class="db fw6 lh-copy f6" for="password">Password</label>
                                <input onChange={(e) => {setUser({...user, password: e.target.value})}} value={user.password} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                </fieldset>
                <div class="">
                    <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={(e) => signin(e)} />
                </div>
                <div class="lh-copy mt3">
                    <a href="/register" class="f6 link dim black db">Register</a>
                </div>
            </form>
        </main>
    </article>
    </>
  )
}

export default Signin