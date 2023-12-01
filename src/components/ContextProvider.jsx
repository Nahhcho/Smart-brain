import React, { createContext, useState } from 'react'

const Context = createContext()

const ContextProvider = ({ children }) => {
    const [session, setSession] = useState({
        API_KEY: "ce6c2cd8dcd9433a8bcb6881e070927e",
        API_URL: 'https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs',
        PAT: '43f1df10e43b4a5abd81ad68d4447aa1',
        USER_ID: 'clarifai',
        APP_ID: 'main',
        SERVER_URL: 'http://localhost:3001',
        user: null
    })

    return (
        <Context.Provider value={[ session, setSession ]}>
            {children}
        </Context.Provider>
    )
}

export {Context, ContextProvider}