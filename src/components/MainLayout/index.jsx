import './mainLayout.css'
import Header from 'components/Header/index'
import React from 'react'

const MainLayout = ({ children }) => {
  return (
    <div className='main-container'>
      <Header />
      <div>
        {children}
      </div>
    </div>
  )
}

export default MainLayout
