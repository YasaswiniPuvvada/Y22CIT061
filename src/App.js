import React,{useState,useEffect} from "react"
import "./App.css";
function App(){
  const [url,seturl]=useState("")
  const [shorts,setshorts]=useState([])
  const [msg,setmsg]=useState("")

  useEffect(()=>{
    const d = localStorage.getItem("shorts")
    if(d){
      setshorts(JSON.parse(d))
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("shorts",JSON.stringify(shorts))
  },[shorts])

  function mkShort(){
    if(!url){setmsg("pls enter url");return}
    const sh = Math.random().toString(36).substring(2,7)
    const newOne={full:url,short:sh,clk:0,crt:new Date().toLocaleString()}
    setshorts([...shorts,newOne])
    seturl("")
    setmsg("done")
  }

  function openShort(s){
    const upd=shorts.map(x=>{
      if(x.short===s){
        x.clk+=1
        window.open(x.full,"_blank")
      }
      return x
    })
    setshorts(upd)
  }

  function alive(){
    setmsg("i am alive")
  }

  return(
    <div style={{padding:20}}>
      <h2>url shortner</h2>
      <input value={url} onChange={e=>seturl(e.target.value)} placeholder="enter url"/>
      <button onClick={mkShort}>short it</button>
      <button onClick={alive}>alive?</button>
      <p>{msg}</p>
      <h3>all urls</h3>
      <ul>
        {shorts.map((u,i)=>(
          <li key={i}>
            {u.full} 👉 
            <a href="#" onClick={()=>openShort(u.short)}>/{u.short}</a>  
            | clicks:{u.clk} | created:{u.crt}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App