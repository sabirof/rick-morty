import { useState } from 'react'
import './App.css'
import Characters from './Characters'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 <h1>Rick and Morty <h1 className='wiki'>Wiki</h1></h1>

 <Characters />
    </>
  )
}


export default App
