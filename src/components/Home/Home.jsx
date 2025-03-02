import React, { useState,useEffect, useContext } from 'react'
import styles from './Home.module.css'
import RecentProduct from './components/RecentProduct/RecentProduct'
import CategorySlider from './components/CategorySlider/CategorySlider'
import StatusSlider from './components/StatusSlider/StatusSlider'

export default function Home() {

    useEffect(() => {
    // code to run on component mount
    }, [])
  
  return (
    <>

    <div className='p-10'>
      <StatusSlider />
     <CategorySlider />
      <RecentProduct />
    </div>
    </>
    
  )
}
