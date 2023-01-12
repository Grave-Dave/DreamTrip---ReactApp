import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Form from './pages/Form'
import Trip from './pages/Trip'
import FormFinish from './pages/FormFinish'

function App() {
  return(
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/form' element={<Form />}></Route>
        <Route path='/finish' element={<FormFinish />}></Route>
        <Route path ='/:tripId' element={<Trip />}></Route>
      </Routes>

    </div>
  )
}

export default App