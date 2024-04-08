import { useState,useEffect } from 'react'
import viteLogo from '/vite.svg'
import '../style/App.css'
import Die from './Die.jsx'
import { nanoid } from "nanoid"
import ReactConfetti from 'react-confetti'
//import useLS from './useLS.jsx'

function App() {
  // const [count, setCount] = useState(0)
  const [dice, setDice] = useState(allNewDice()  )
  const [tenzies,setTenzies] =useState(false)
  const [userScore,setUserScore]=useState(0)

 // const [hiScore,setHiScore] =useLS("hiScore",0)
 const [hiScore, setHiScore] = useState(() => {
  // getting stored value
  const saved = localStorage.getItem("hiScore");
  const initialValue = JSON.parse(saved);
  console.log("initial hiscore"+initialValue)
  if (initialValue ==null){
console.log("initialValue is null")

localStorage.setItem("hiScore", JSON.stringify(999));

  }
  return initialValue || 999;
});

 useEffect(() => {
  // storing input name
  console.log('hiscore')
  const saved = localStorage.getItem("hiScore");
  console.log('hi:'+saved)
  if ( saved>userScore &&  userScore!=0){
  localStorage.setItem("hiScore", JSON.stringify(userScore));
  setHiScore(userScore)
  }
}, [tenzies]);



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
      setUserScore(0)
    }
    else{
      setUserScore(prev=>prev+1)
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
  // let tenzie = result=== true? "Well Done, you WIN!":null
  let tenzie = result=== true? true:null
 if( tenzie){
   
  setTenzies(true)
  // <ReactConfetti />
 }
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

function clearHiScore(){
  localStorage.removeItem("hiScore")

}


  return (
    <>
      <main>
     { tenzies && <ReactConfetti/>}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            
         <div className="central">
           <div className="your-score" >Your Score</div>
           <br/>
           {userScore}
           {/* <div className="your-score-value" >10</div> */}
           
          <div className="dice-container">
            {diceElements}
    


          </div>
          <div className="hi-score" >Best Score</div>
          <br/>
           {hiScore}
        </div>   
        <button onClick={rollDice} className="rollDice">{tenzies? "New Game": "Roll" }</button>
        <button onClick={clearHiScore} className="rollDice">Clear Best Score</button>

      </main>

    </>
  )
}

export default App
