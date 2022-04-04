import {createContext,useRef,useState} from 'react';


const myContext=createContext();



export function ContextProvider({children}){
  
  // const server="10.0.0.169";
  const server="localhost";

  const [cursor,setCursor]=useState({x:0,y:0});
  
  const appRef=useRef();
  
  const updateCursor=(e)=>{
    setCursor({x:e.pageX,y:e.pageY});
  }


  const [page,setPage]=useState("");

  return(
    <myContext.Provider value={{server,cursor,updateCursor,page,setPage,appRef}}>
        {children}
    </myContext.Provider>

  )
}

export default myContext;

