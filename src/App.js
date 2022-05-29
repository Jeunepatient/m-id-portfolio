import React from 'react'
import { Navbar } from './component';
import {About, Footer, Header, Work, Skills, Testmonial} from './container'
import './App.scss'
const App = ()=> {
  return(
    <div className='app'>
      <Navbar />
        <Header />
        <About />
        <Work />
        <Skills />
        <Testmonial />
        <Footer />
    </div>
  
  )
}
export default App;