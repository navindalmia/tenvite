import { useState } from 'react'
import viteLogo from '/vite.svg'
import '../style/App.css'
import Die from  './Die.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main>
        <div className="innerBox">
        
                <Die value="1" align-self="end"/>
                <Die value="2"/>
                <Die value="3"/>
                <Die value="4"/>
                <Die value="5"/>
                <Die value="1"/>
                <Die value="2"/>
                <Die value="3"/>
                <Die value="4"/>
                <Die value="5"/>
            
            
         
        </div>
      </main>
     
    </>
  )
}

export default App
