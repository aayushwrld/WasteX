import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context'

const PrivateAuthRoute = ({children}) => {

    const navigate = useNavigate()
    const {login,setLogin} = useContext(AppContext)
    useEffect(()=>{
        if(!login){
            navigate("/signup")
        }
    },[])

    return (
        <>{children}</>
    )
}

export default PrivateAuthRoute