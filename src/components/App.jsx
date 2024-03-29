import { useState,useEffect } from 'react'
import viteLogo from '/vite.svg'
import '../style/App.css'
import Die from './Die.jsx'
import { nanoid } from "nanoid"

function App() {
  // const [count, setCount] = useState(0)
  const [dice, setDice] = useState(allNewDice()  )
  const [tenzies,setTenzies] =useState(false)






  function allNewDice() {
    let arr = []
    for (let i = 0; i < 10; i++) {
      const num = Math.ceil(Math.random() * 6)
      arr.push({ value: num, held: false, id: nanoid() })
    }

    return arr
  }

  const diceElements = dice.map((ele) => {
    return (
      <Die hold={() => hold(ele.id)} value={ele.value} key={ele.id} held={ele.held} />
    )

  })
  //this also works
  // function hold(id){
  // setDice(
  // (prev)=>{  
  //   let arr = []
  //   for(let i=0;i<10;i++){
  //       arr[i] = prev[i]
  //       if(prev[i].id==id){
  //           arr[i].held= !arr[i].held
  //       }
  //   }
  //   return arr
  // }
  // )
  // }
  function hold(id) {
    setDice(
      (prev) =>
        prev.map((ele) => {
          return ele.id === id ? { ...ele, held: !ele.held } : ele
        }
        )
    )
  }

  function rollDice() {

    // setDice(allNewDice())
    if(tenzies){
      setTenzies(false)
      setDice(allNewDice())
    }
    else{
    setDice(prevDice => prevDice.map(die => {

      return die.held === true ? die :
        {
          id: nanoid()
          , held: false
          , value: Math.ceil(Math.random() * 6)
        }
    })
    )
  }
  }


  useEffect(()=>{console.log("Winner!")
  let result = dice.every(checkTenzies)
  let tenzie = result=== true? "Well Done, you WIN!":null
  tenzie && setTenzies(true)
}, [dice])
  

function checkTenzies(el,index,arr){

  console.log("b4!")
  if(index===0){
    return true
  }
  else{
      return ((el.value === arr[index-1].value) && el.held===true)

  }


}
  return (
    <>
      <main>
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            
        <div className="dice-container">
          {diceElements}
  


        </div>
        <button onClick={rollDice} className="rollDice">{tenzies? "New Game": "Roll" }</button>

      </main>

    </>
  )
}

export default App
