import React, { useState } from "react";
import Pages  from "./pages/Pages";


function App() {
  const [cursor,setCursor]=useState({});
  // const [maskPos,setMaskPos]=useState({x:0,y:0});
  // const Cursor= React.createContext(cursor)
  const onMoveHandler=(e)=>{
    setCursor({x:e.pageX,y:e.pageY});
    // setMaskPos({x:e.pageX,y:e.pageY});
  }

  const server="10.0.0.169";
  // const server="localhost";

  return (
    
<div className='App'onMouseMove={onMoveHandler}>
<Pages cursor={cursor} settings={{server:server}}/>

</div>
  );
}

export default App;

