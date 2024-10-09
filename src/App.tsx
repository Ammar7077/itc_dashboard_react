import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout';

function App() {

  const [loading, setLoading] = useState<boolean>(false);
  const {pathname} = useLocation()

  useEffect(()=>{
    window.scrollTo(0,0)
  },[pathname]);

  useEffect(()=>{
    setTimeout(()=>setLoading(false), 1000)
  },[]);


  return loading ?(
    <></>
  ) :(
    <>
    <DefaultLayout>
    <Routes>


  {/* <!-- ===== adding pages here ===== --> */}

    </Routes>
    </DefaultLayout>
    </>
  )
}

export default App
