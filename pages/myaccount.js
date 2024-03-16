import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Myaccount = () => {
    const router = useRouter();
    useEffect(()=>{
       if(!localStorage.getItem('token')){
        router.push("/login")
       } 
    },[])
  return (
    <div>
      Router
    </div>
  )
}

export default Myaccount
