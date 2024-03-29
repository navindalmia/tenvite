import { useState } from 'react'
import viteLogo from '/vite.svg'
import '../style/App.css'
import React from 'react'


export default  function  Die(props){



const diceColor = props.held? {backgroundColor : "#59E391"}:{backgroundColor : "#FFFFFF"}


return(



    <>
<button  onClick={props.hold} className="Die" style={diceColor}>
    {props.value}



</button>

</>

)


}