
import React, {useState,useEffect} from 'react'
import Loading from './components/Loading.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Play from './pages/Play.jsx'
import Tournament from './pages/Tournament.jsx'
import Settings from './pages/Settings.jsx'
function fp(){ try{const n=navigator;const s=[n.userAgent,n.language,(screen.width+'x'+screen.height)].join('|');let h=0;for(let i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h=h&h}return 'fp_'+Math.abs(h).toString(36)}catch(e){return 'fp_unknown'} }
export default function App(){
  const [ready,setReady]=useState(false); const [route,setRoute]=useState('home'); const [theme,setTheme]=useState(localStorage.getItem('cw_theme')||'dark'); const [account,setAccount]=useState(null)
  useEffect(()=>setTimeout(()=>setReady(true),700),[])
  useEffect(()=>{ const f=fp(); let db=JSON.parse(localStorage.getItem('cw_accounts')||'[]'); let acc=db.find(a=>a.fingerprint===f); if(acc){setAccount(acc); return} let name=null; while(!name){name=prompt('Enter display name (permanent):','Viewer'+Math.floor(Math.random()*9000)); if(name===null) break; name=String(name).trim().slice(0,32)} if(!name){alert('Name required');return} const isFirst=db.length===0; const newAcc={id:'u_'+Math.random().toString(36).slice(2,9),name, fingerprint:f, isStreamer:isFirst}; db.push(newAcc); localStorage.setItem('cw_accounts',JSON.stringify(db)); setAccount(newAcc); if(isFirst) alert('You are the first account and are the Streamer (owner).') },[])
  if(!ready) return <Loading/>; if(!account) return <div style={{padding:20}}>Account setup required</div>
  return (<div className={'app '+(theme==='dark'?'theme-dark':'theme-light')}><Navbar onNavigate={setRoute} account={account}/><div className='top-rect'><div className='top-rect-inner'>{account.isStreamer? 'Streamer':'Viewer'} • {account.name}</div></div><main className='main'>{route==='home' && <Home account={account}/>} {route==='play' && <Play account={account}/>} {route==='tournament' && <Tournament account={account}/>} {route==='settings' && <Settings account={account} setAccount={setAccount} setTheme={setTheme}/> }</main></div>)
}
