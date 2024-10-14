import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout';
import PageTitle from './components/PageTitle';
import DataBank from './pages/Dashboard/DataBank';
import Ai from './pages/ais/Ai';
import Consulting from './pages/consulting/Consulting';
import AI from './pages/DataEntry/AI/AI';
import JSONLs from './pages/JSONLs/JSONLs';

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

      <Route 
        index
        element={
          <>
          <PageTitle title='Main Dashboard for Analysiz'/>
          <DataBank/>
          </>
        }
      />

      <Route 
      path='/data/ai'
      element={
        <>
        <PageTitle title='Data of AI Folder'/>
        <Ai/>
        </>
      }
      />

      <Route 
      path='/data/consultings'
      element={
        <>
        <PageTitle title='Data of Consulting Folder'/>
        <Consulting/>
        </>
      }
      />

      <Route
      path='/upload/admin/ai'
      element={
        <>
        <PageTitle title='Data Entry upload for AI'/>
        <AI/>
        </>
      }
      />

      <Route
      path='/data/JSONLs'
      element={
        <>
        <PageTitle title='Data of JSONLs Folders'/>
        <JSONLs/>
        </>
      }
      />

    {/* <!-- ===== adding pages here ===== --> */}


  

    </Routes>
    </DefaultLayout>
    </>
  )
}

export default App
