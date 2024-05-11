import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from './loading/Loading';

export default function Protected({children,authentication=true}) {

    const navigate = useNavigate();
    const [loader,setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
      if(authentication && authStatus !== authentication){
        navigate("/login")
      }else if(!authentication && authStatus !== authentication){
        navigate("/");
      }
      setLoader(false);
    }, [authStatus,navigate,authentication])
    

  return loader ? <Loading/> : <>{children}</> 
}
