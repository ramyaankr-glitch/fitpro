import { useState } from "react";

const C = [
  { name:"Priya Sharma",  ph:"9845012345", col:"#FF6B6B", sess:8,  paid:4000, due:0    },
  { name:"Arjun Mehta",   ph:"9741023456", col:"#00D4AA", sess:6,  paid:3000, due:500  },
  { name:"Sneha Nair",    ph:"9632014567", col:"#FFB800", sess:10, paid:5000, due:0    },
  { name:"Rahul Gupta",   ph:"9512034678", col:"#B388FF", sess:4,  paid:2000, due:1000 },
  { name:"Divya Pillai",  ph:"9420134789", col:"#FF8B94", sess:12, paid:6000, due:0    },
];

const SCH = {
  Mon:[{t:"6:00 AM",ci:0},{t:"7:00 AM",ci:2},{t:"8:00 AM",ci:4},{t:"9:00 AM",ci:null}],
  Tue:[{t:"6:30 AM",ci:1},{t:"7:30 AM",ci:3},{t:"9:00 AM",ci:null},{t:"5:00 PM",ci:0}],
  Wed:[{t:"6:00 AM",ci:0},{t:"8:00 AM",ci:2},{t:"5:00 PM",ci:null}],
  Thu:[{t:"7:00 AM",ci:4},{t:"5:00 PM",ci:1},{t:"6:00 PM",ci:null}],
  Fri:[{t:"6:00 AM",ci:3},{t:"7:00 AM",ci:0},{t:"8:00 AM",ci:null}],
  Sat:[{t:"8:00 AM",ci:2},{t:"9:00 AM",ci:4},{t:"10:00 AM",ci:null}],
};
const DAYS=["Mon","Tue","Wed","Thu","Fri","Sat"];
const DNO={Mon:3,Tue:4,Wed:5,Thu:6,Fri:7,Sat:8};

const LOGS=[
  {date:"Feb 28",intensity:"High",muscles:["Back","Shoulders"],
   exercises:[{n:"Deadlift",m:"Back",s:3,r:8},{n:"Pull-ups",m:"Back",s:3,r:10},{n:"Overhead Press",m:"Shoulders",s:3,r:10},{n:"Lateral Raises",m:"Shoulders",s:3,r:15},{n:"Face Pulls",m:"Back",s:3,r:15},{n:"Russian Twist",m:"Core",s:3,r:20}],
   notes:"PB on deadlifts – 70kg!"},
  {date:"Feb 26",intensity:"High",muscles:["Legs","Glutes"],
   exercises:[{n:"Squats",m:"Legs",s:4,r:10},{n:"Step-ups",m:"Legs",s:3,r:12},{n:"Leg Press",m:"Legs",s:3,r:15},{n:"Hip Thrust",m:"Glutes",s:3,r:20},{n:"Leg Curl",m:"Hamstrings",s:3,r:12},{n:"Crunches",m:"Core",s:3,r:20}],
   notes:"Switched lunges to step-ups (knee)."},
];

const MUSCLES=["Chest","Back","Shoulders","Biceps","Triceps","Legs","Glutes","Core","Cardio"];
const INTENS=["Light","Moderate","High","Max Effort"];
const IC={Light:{bg:"#00d4aa18",c:"#00D4AA"},Moderate:{bg:"#ffe66d18",c:"#FFB800"},High:{bg:"#ffe66d22",c:"#FFE66D"},"Max Effort":{bg:"#ff4d4d18",c:"#FF4D4D"}};
const ICOLOR={Light:"#00D4AA",Moderate:"#FFB800",High:"#FFE66D","Max Effort":"#FF4D4D"};

const WA_SVG=<svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;

function Av({name,col,sz=40}){
  return <div style={{width:sz,height:sz,borderRadius:"50%",background:`${col}22`,border:`2px solid ${col}`,display:"flex",alignItems:"center",justifyContent:"center",color:col,fontWeight:800,fontSize:sz*0.38,flexShrink:0}}>{name[0]}</div>;
}

function Sheet({open,onClose,children}){
  if(!open)return null;
  return(
    <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.82)",backdropFilter:"blur(6px)",zIndex:50,display:"flex",alignItems:"flex-end"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",background:"#181818",borderTop:"1px solid #2a2a2a",borderRadius:"22px 22px 0 0",padding:"0 18px 30px",maxHeight:"86%",overflowY:"auto",animation:"su .28s cubic-bezier(.32,.72,0,1)"}}>
        <div style={{width:34,height:4,background:"#333",borderRadius:2,margin:"12px auto 18px"}}/>
        {children}
      </div>
    </div>
  );
}

function AB({label,col,bg,icon,onClick}){
  return <button onClick={onClick} style={{width:"100%",padding:"14px 16px",borderRadius:13,border:"none",background:bg,color:col,fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:9,fontFamily:"inherit"}}>{icon}{label}</button>;
}

// ── SCHEDULE ────────────────────────────────────────────────────────────────
function ScheduleScreen({onSlotTap,onFree}){
  const [day,setDay]=useState("Tue");
  const slots=SCH[day]||[];
  const booked=slots.filter(s=>s.ci!==null).length;
  return(
    <div style={{flex:1,overflowY:"auto",padding:"0 16px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"14px 0 16px"}}>
        <div>
          <div style={{fontFamily:"system-ui,sans-serif",fontSize:26,fontWeight:800,letterSpacing:-0.5}}>Schedule</div>
          <div style={{fontSize:11,color:"#555",marginTop:2}}>Week of Mar 3–8, 2026</div>
        </div>
        <button onClick={onFree} style={{background:"#D4FF00",color:"#000",border:"none",borderRadius:20,padding:"8px 16px",fontWeight:800,fontSize:12,cursor:"pointer"}}>+ Book</button>
      </div>

      {/* Day chips */}
      <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:14,margin:"0 -16px",paddingLeft:16,paddingRight:16,scrollbarWidth:"none"}}>
        {DAYS.map(d=>{
          const hasSess=SCH[d].some(s=>s.ci!==null);
          return(
            <button key={d} onClick={()=>setDay(d)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,minWidth:50,padding:"9px 8px",borderRadius:13,border:"none",cursor:"pointer",background:day===d?"#D4FF00":"#1a1a1a",flexShrink:0,transition:"all .15s"}}>
              <span style={{fontSize:9,fontWeight:700,color:day===d?"#000":"#555"}}>{d}</span>
              <span style={{fontFamily:"system-ui,sans-serif",fontSize:17,fontWeight:800,color:day===d?"#000":"#f0f0f0"}}>{DNO[d]}</span>
              <div style={{width:4,height:4,borderRadius:"50%",background:day===d?"#000":"#D4FF00",opacity:hasSess?1:0}}/>
            </button>
          );
        })}
      </div>

      <div style={{fontSize:10,fontWeight:600,color:"#444",textTransform:"uppercase",letterSpacing:1,margin:"0 0 10px"}}>
        {booked} booked · {slots.length-booked} free
      </div>

      {/* Slots */}
      <div style={{display:"flex",flexDirection:"column",gap:9,paddingBottom:20}}>
        {slots.map((s,i)=>{
          const cl=s.ci!==null?C[s.ci]:null;
          return(
            <div key={i} onClick={()=>cl?onSlotTap({slot:s,day}):onFree()} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 14px",background:"#141414",borderRadius:15,cursor:"pointer",borderLeft:`3px solid ${cl?cl.col:"#242424"}`,border:`1px solid ${cl?cl.col+"44":"#242424"}`,borderLeftWidth:3}}>
              <div style={{minWidth:62,fontSize:12,fontWeight:700,fontFamily:"system-ui,sans-serif",color:cl?"#eee":"#444"}}>{s.t}</div>
              {cl?(
                <>
                  <Av name={cl.name} col={cl.col} sz={36}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600}}>{cl.name.split(" ")[0]}</div>
                    <div style={{fontSize:10,color:"#555",marginTop:1}}>{cl.sess} sessions this month</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </>
              ):(
                <>
                  <div style={{width:36,height:36,borderRadius:"50%",background:"#1e1e1e",border:"2px dashed #2a2a2a",display:"flex",alignItems:"center",justifyContent:"center",color:"#333",fontSize:18,flexShrink:0}}>+</div>
                  <div style={{fontSize:12,color:"#3a3a3a",flex:1}}>Free slot — tap to book</div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a2a2a" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── CLIENTS ─────────────────────────────────────────────────────────────────
function ClientsScreen({onLog,onPayment}){
  const [expanded,setExpanded]=useState(null);
  return(
    <div style={{flex:1,overflowY:"auto",padding:"0 16px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"14px 0 16px"}}>
        <div>
          <div style={{fontFamily:"system-ui,sans-serif",fontSize:26,fontWeight:800,letterSpacing:-0.5}}>Clients</div>
          <div style={{fontSize:11,color:"#555",marginTop:2}}>5 active members</div>
        </div>
        <button style={{background:"#D4FF00",color:"#000",border:"none",borderRadius:20,padding:"8px 16px",fontWeight:800,fontSize:12,cursor:"pointer"}}>+ Add</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,paddingBottom:20}}>
        {C.map((c,i)=>(
          <div key={i} style={{background:"#141414",border:"1px solid #242424",borderRadius:15,padding:15}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
              <Av name={c.name} col={c.col} sz={42}/>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:600}}>{c.name}</div>
                <div style={{fontSize:10,color:"#555",marginTop:1}}>+91 {c.ph}</div>
              </div>
              <button style={{width:32,height:32,borderRadius:9,background:"#1a2e1a",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}
                onClick={()=>window.open(`https://wa.me/91${c.ph}?text=Hi+${c.name.split(' ')[0]}!+Your+next+session+is+scheduled.`,'_blank')}>
                {WA_SVG}
              </button>
            </div>
            <div style={{display:"flex",gap:7,marginBottom:11}}>
              {[[c.sess,"Sessions","#D4FF00"],[`₹${c.paid.toLocaleString()}`,"Paid","#00D4AA"],[c.due>0?`₹${c.due}`:"✓",c.due>0?"Due":"Clear",c.due>0?"#FF4D4D":"#00D4AA"]].map(([v,l,col])=>(
                <div key={l} style={{flex:1,background:"#1c1c1c",borderRadius:9,padding:"8px 6px",textAlign:"center"}}>
                  <div style={{fontFamily:"system-ui,sans-serif",fontSize:17,fontWeight:800,color:col}}>{v}</div>
                  <div style={{fontSize:9,color:"#444",textTransform:"uppercase",letterSpacing:0.5,marginTop:1}}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:7}}>
              <button onClick={()=>onPayment(i)} style={{flex:1,padding:"9px 6px",borderRadius:9,border:"none",background:"#1a2e1a",color:"#00D4AA",fontWeight:600,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>+ Payment</button>
              <button onClick={()=>onLog(i)} style={{flex:1,padding:"9px 6px",borderRadius:9,border:"none",background:"#1a1a2e",color:"#B388FF",fontWeight:600,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>Progress</button>
              <button onClick={()=>onLog(i)} style={{flex:"0 0 auto",padding:"9px 13px",borderRadius:9,border:"none",background:"#1e2a1a",color:"#D4FF00",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>+ Log</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PAYMENTS ────────────────────────────────────────────────────────────────
function PaymentsScreen({onRecordPayment}){
  const totalPaid=C.reduce((a,c)=>a+c.paid,0);
  const totalDue=C.reduce((a,c)=>a+c.due,0);
  return(
    <div style={{flex:1,overflowY:"auto",padding:"0 16px"}}>
      <div style={{padding:"14px 0 16px"}}>
        <div style={{fontFamily:"system-ui,sans-serif",fontSize:26,fontWeight:800,letterSpacing:-0.5}}>Payments</div>
        <div style={{fontSize:11,color:"#555",marginTop:2}}>March 2026</div>
      </div>
      <div style={{background:"linear-gradient(135deg,#1a2e1a,#0e1a0e)",border:"1px solid #2a3a2a",borderRadius:17,padding:18,marginBottom:18}}>
        <div style={{fontSize:10,color:"#4a7a4a",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Total Collected</div>
        <div style={{fontFamily:"system-ui,sans-serif",fontSize:32,fontWeight:800,color:"#00D4AA"}}>₹{totalPaid.toLocaleString()}</div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:12,paddingTop:12,borderTop:"1px solid #1e3a1e"}}>
          {[["Pending",`₹${totalDue.toLocaleString()}`,"#FF4D4D"],["Clients",C.length,"#f0f0f0"],["Sessions",C.reduce((a,c)=>a+c.sess,0),"#f0f0f0"]].map(([l,v,col])=>(
            <div key={l}><div style={{fontSize:10,color:"#4a7a4a"}}>{l}</div><div style={{fontFamily:"system-ui,sans-serif",fontSize:15,fontWeight:700,color:col}}>{v}</div></div>
          ))}
        </div>
      </div>
      <div style={{fontSize:10,fontWeight:600,color:"#444",textTransform:"uppercase",letterSpacing:1,marginBottom:11}}>All Clients</div>
      <div style={{display:"flex",flexDirection:"column",gap:9,paddingBottom:20}}>
        {C.map((c,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:11,background:"#141414",border:"1px solid #242424",borderRadius:13,padding:"13px 13px"}}>
            <Av name={c.name} col={c.col} sz={34}/>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:600}}>{c.name}</div>
              <div style={{fontSize:10,color:"#555"}}>{c.sess} sessions · ₹{c.paid.toLocaleString()} paid</div>
            </div>
            <div style={{display:"flex",gap:7,alignItems:"center"}}>
              {c.due>0&&(
                <button onClick={()=>window.open(`https://wa.me/91${c.ph}?text=Hi+${c.name.split(' ')[0]}!+You+have+a+pending+balance+of+%E2%82%B9${c.due}.+Please+clear+at+your+earliest.+Thanks!`,'_blank')}
                  style={{width:28,height:28,borderRadius:7,background:"#1a2e1a",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {WA_SVG}
                </button>
              )}
              {c.due>0
                ?<button onClick={()=>onRecordPayment(i)} style={{padding:"5px 10px",borderRadius:20,background:"#2e1a1a",color:"#FF4D4D",fontSize:10,fontWeight:700,border:"none",cursor:"pointer",whiteSpace:"nowrap"}}>Due ₹{c.due}</button>
                :<div style={{padding:"5px 10px",borderRadius:20,background:"#1a2e1a",color:"#00D4AA",fontSize:10,fontWeight:700}}>✓ Clear</div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PROGRESS ─────────────────────────────────────────────────────────────────
function ProgressScreen({onLog,initClient=0}){
  const [ci,setCi]=useState(initClient);
  const cl=C[ci];
  return(
    <div style={{flex:1,overflowY:"auto",padding:"0 16px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"14px 0 16px"}}>
        <div>
          <div style={{fontFamily:"system-ui,sans-serif",fontSize:26,fontWeight:800,letterSpacing:-0.5}}>Progress</div>
          <div style={{fontSize:11,color:"#555",marginTop:2}}>Session logs</div>
        </div>
        <button onClick={()=>onLog(ci)} style={{background:"#D4FF00",color:"#000",border:"none",borderRadius:20,padding:"8px 16px",fontWeight:800,fontSize:12,cursor:"pointer"}}>+ Log</button>
      </div>

      {/* Client selector */}
      <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:14,margin:"0 -16px",paddingLeft:16,paddingRight:16,scrollbarWidth:"none"}}>
        {C.map((c,i)=>(
          <button key={i} onClick={()=>setCi(i)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,minWidth:64,padding:"10px 10px",borderRadius:13,border:"none",cursor:"pointer",background:ci===i?`${c.col}18`:"#1a1a1a",outline:ci===i?`2px solid ${c.col}55`:"none",flexShrink:0}}>
            <Av name={c.name} col={c.col} sz={26}/>
            <span style={{fontSize:9,fontWeight:700,color:ci===i?c.col:"#444"}}>{c.name.split(" ")[0].toUpperCase()}</span>
            <span style={{fontFamily:"system-ui,sans-serif",fontSize:13,fontWeight:800,color:ci===i?c.col:"#555"}}>{c.sess}</span>
          </button>
        ))}
      </div>

      {/* Summary card */}
      <div style={{display:"flex",alignItems:"center",gap:12,background:"#141414",border:"1px solid #242424",borderRadius:15,padding:14,marginBottom:14}}>
        <Av name={cl.name} col={cl.col} sz={44}/>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:600}}>{cl.name}</div>
          <div style={{fontSize:11,color:"#555"}}>{cl.sess} sessions this month</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
          {[[cl.sess,"Sessions","#D4FF00"],[LOGS.length,"Logged","#00D4AA"]].map(([v,l,col])=>(
            <div key={l} style={{background:"#1c1c1c",borderRadius:8,padding:"7px 9px",textAlign:"center"}}>
              <div style={{fontFamily:"system-ui,sans-serif",fontSize:17,fontWeight:800,color:col}}>{v}</div>
              <div style={{fontSize:9,color:"#444"}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{fontSize:10,fontWeight:600,color:"#444",textTransform:"uppercase",letterSpacing:1,marginBottom:11}}>Session History</div>

      <div style={{display:"flex",flexDirection:"column",gap:10,paddingBottom:20}}>
        {LOGS.map((log,i)=>{
          const ic=IC[log.intensity]||{bg:"#fff1",c:"#fff"};
          return(
            <div key={i} style={{background:"#141414",border:"1px solid #242424",borderRadius:15,padding:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div>
                  <div style={{fontFamily:"system-ui,sans-serif",fontSize:13,fontWeight:700}}>{log.date}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:5}}>
                    {log.muscles.map(m=><span key={m} style={{padding:"2px 8px",borderRadius:20,background:`${cl.col}22`,color:cl.col,fontSize:9,fontWeight:600}}>{m}</span>)}
                  </div>
                </div>
                <span style={{padding:"3px 9px",borderRadius:20,background:ic.bg,color:ic.c,fontSize:9,fontWeight:700}}>{log.intensity}</span>
              </div>
              <div style={{background:"#0d0d0d",borderRadius:9,overflow:"hidden"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 46px 46px",padding:"5px 11px",borderBottom:"1px solid #1a1a1a"}}>
                  {["Exercise","Sets","Reps"].map(h=><span key={h} style={{fontSize:9,color:"#2a2a2a",fontWeight:600,textTransform:"uppercase"}}>{h}</span>)}
                </div>
                {log.exercises.map((ex,j)=>(
                  <div key={j} style={{display:"grid",gridTemplateColumns:"1fr 46px 46px",padding:"6px 11px",background:j%2===0?"transparent":"#0a0a0a"}}>
                    <div>
                      <div style={{fontSize:12,color:"#ccc"}}>{ex.n}</div>
                      <div style={{fontSize:9,color:"#3a3a3a"}}>{ex.m}</div>
                    </div>
                    <div style={{fontFamily:"system-ui,sans-serif",fontSize:13,fontWeight:800,color:"#D4FF00"}}>{ex.s}</div>
                    <div style={{fontFamily:"system-ui,sans-serif",fontSize:13,fontWeight:800,color:"#00D4AA"}}>{ex.r}</div>
                  </div>
                ))}
              </div>
              {log.notes&&<div style={{marginTop:9,paddingTop:9,borderTop:"1px solid #1e1e1e",fontSize:11,color:"#555",fontStyle:"italic"}}>📝 {log.notes}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── LOG SHEET ────────────────────────────────────────────────────────────────
function LogSheet({clientIdx=0,onClose}){
  const [muscles,setMuscles]=useState(["Legs","Glutes"]);
  const [intensity,setIntensity]=useState("High");
  const [exercises,setExercises]=useState([{n:"Squats",m:"Legs",s:4,r:10},{n:"Hip Thrust",m:"Glutes",s:3,r:15},{n:"Leg Press",m:"Legs",s:3,r:12}]);
  const [newEx,setNewEx]=useState({n:"",m:"Legs",s:3,r:10});
  const [adding,setAdding]=useState(false);
  const cl=C[clientIdx];
  const togM=m=>setMuscles(p=>p.includes(m)?p.filter(x=>x!==m):[...p,m]);
  const addEx=()=>{
    if(!newEx.n.trim())return;
    setExercises(p=>[...p,{...newEx}]);
    setNewEx({n:"",m:"Legs",s:3,r:10});
    setAdding(false);
  };
  const adj=(field,idx,delta)=>setExercises(p=>p.map((e,i)=>i===idx?{...e,[field]:Math.max(1,e[field]+delta)}:e));
  return(
    <>
      <div style={{fontFamily:"system-ui,sans-serif",fontSize:20,fontWeight:800,marginBottom:3}}>Log Session</div>
      <div style={{fontSize:12,color:"#555",marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
        <Av name={cl.name} col={cl.col} sz={22}/>
        {cl.name} · Today
      </div>

      <div style={{fontSize:9,color:"#444",textTransform:"uppercase",letterSpacing:1,marginBottom:7}}>Muscle Groups</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:16}}>
        {MUSCLES.map(m=>(
          <button key={m} onClick={()=>togM(m)} style={{padding:"5px 11px",borderRadius:20,border:"none",cursor:"pointer",fontSize:10,fontWeight:600,background:muscles.includes(m)?"#D4FF0022":"#1e1e1e",color:muscles.includes(m)?"#D4FF00":"#555",outline:muscles.includes(m)?"1px solid #D4FF0055":"none",fontFamily:"inherit"}}>
            {m}
          </button>
        ))}
      </div>

      <div style={{fontSize:9,color:"#444",textTransform:"uppercase",letterSpacing:1,marginBottom:7}}>Exercises</div>
      <div style={{background:"#111",borderRadius:11,overflow:"hidden",marginBottom:13}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 70px 70px 24px",padding:"6px 11px",borderBottom:"1px solid #1a1a1a"}}>
          {["Exercise","Sets","Reps",""].map(h=><span key={h} style={{fontSize:8,color:"#2a2a2a",fontWeight:600,textTransform:"uppercase"}}>{h}</span>)}
        </div>
        {exercises.map((ex,i)=>(
          <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 70px 70px 24px",padding:"7px 11px",alignItems:"center",background:i%2===0?"transparent":"#0a0a0a",borderBottom:"1px solid #141414"}}>
            <div><div style={{fontSize:12,color:"#ddd"}}>{ex.n}</div><div style={{fontSize:9,color:"#3a3a3a"}}>{ex.m}</div></div>
            <div style={{display:"flex",alignItems:"center",gap:3}}>
              <button onClick={()=>adj("s",i,-1)} style={{width:18,height:18,borderRadius:4,background:"#222",border:"none",color:"#888",fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>−</button>
              <span style={{fontFamily:"system-ui,sans-serif",fontSize:14,fontWeight:800,color:"#D4FF00",minWidth:18,textAlign:"center"}}>{ex.s}</span>
              <button onClick={()=>adj("s",i,1)} style={{width:18,height:18,borderRadius:4,background:"#222",border:"none",color:"#888",fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>+</button>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:3}}>
              <button onClick={()=>adj("r",i,-1)} style={{width:18,height:18,borderRadius:4,background:"#222",border:"none",color:"#888",fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>−</button>
              <span style={{fontFamily:"system-ui,sans-serif",fontSize:14,fontWeight:800,color:"#00D4AA",minWidth:18,textAlign:"center"}}>{ex.r}</span>
              <button onClick={()=>adj("r",i,1)} style={{width:18,height:18,borderRadius:4,background:"#222",border:"none",color:"#888",fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>+</button>
            </div>
            <button onClick={()=>setExercises(p=>p.filter((_,j)=>j!==i))} style={{width:20,height:20,borderRadius:4,background:"#2e1a1a",border:"none",color:"#FF4D4D",fontSize:10,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div>
        ))}
        {adding?(
          <div style={{padding:"10px 11px",borderTop:"1px solid #1a1a1a",display:"flex",flexDirection:"column",gap:7}}>
            <input value={newEx.n} onChange={e=>setNewEx(p=>({...p,n:e.target.value}))} placeholder="Exercise name" style={{background:"#1a1a1a",border:"1px solid #2a2a2a",borderRadius:7,padding:"7px 10px",color:"#f0f0f0",fontSize:12,fontFamily:"inherit",width:"100%"}}/>
            <div style={{display:"flex",gap:7}}>
              <select value={newEx.m} onChange={e=>setNewEx(p=>({...p,m:e.target.value}))} style={{flex:1,background:"#1a1a1a",border:"1px solid #2a2a2a",borderRadius:7,padding:"7px 8px",color:"#f0f0f0",fontSize:11,fontFamily:"inherit"}}>
                {MUSCLES.map(m=><option key={m}>{m}</option>)}
              </select>
              <div style={{display:"flex",alignItems:"center",gap:5}}>
                <span style={{fontSize:10,color:"#555"}}>Sets</span>
                <button onClick={()=>setNewEx(p=>({...p,s:Math.max(1,p.s-1)}))} style={{width:22,height:22,borderRadius:5,background:"#222",border:"none",color:"#888",cursor:"pointer"}}>−</button>
                <span style={{fontFamily:"system-ui,sans-serif",fontWeight:800,color:"#D4FF00",minWidth:16,textAlign:"center"}}>{newEx.s}</span>
                <button onClick={()=>setNewEx(p=>({...p,s:p.s+1}))} style={{width:22,height:22,borderRadius:5,background:"#222",border:"none",color:"#888",cursor:"pointer"}}>+</button>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:5}}>
                <span style={{fontSize:10,color:"#555"}}>Reps</span>
                <button onClick={()=>setNewEx(p=>({...p,r:Math.max(1,p.r-1)}))} style={{width:22,height:22,borderRadius:5,background:"#222",border:"none",color:"#888",cursor:"pointer"}}>−</button>
                <span style={{fontFamily:"system-ui,sans-serif",fontWeight:800,color:"#00D4AA",minWidth:16,textAlign:"center"}}>{newEx.r}</span>
                <button onClick={()=>setNewEx(p=>({...p,r:p.r+1}))} style={{width:22,height:22,borderRadius:5,background:"#222",border:"none",color:"#888",cursor:"pointer"}}>+</button>
              </div>
            </div>
            <div style={{display:"flex",gap:7}}>
              <button onClick={addEx} style={{flex:1,padding:"8px",borderRadius:8,border:"none",background:"#D4FF0022",color:"#D4FF00",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>Add</button>
              <button onClick={()=>setAdding(false)} style={{padding:"8px 14px",borderRadius:8,border:"none",background:"#222",color:"#666",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
            </div>
          </div>
        ):(
          <button onClick={()=>setAdding(true)} style={{width:"100%",padding:"10px",background:"transparent",border:"none",color:"#444",fontSize:11,cursor:"pointer",borderTop:"1px dashed #1e1e1e",fontFamily:"inherit"}}>+ Add exercise</button>
        )}
      </div>

      <div style={{fontSize:9,color:"#444",textTransform:"uppercase",letterSpacing:1,marginBottom:7}}>Intensity</div>
      <div style={{display:"flex",gap:5,marginBottom:16}}>
        {INTENS.map(lvl=>{
          const col=ICOLOR[lvl];const on=intensity===lvl;
          return <button key={lvl} onClick={()=>setIntensity(lvl)} style={{flex:1,padding:"9px 2px",borderRadius:9,border:"none",cursor:"pointer",background:on?`${col}22`:"#1a1a1a",outline:on?`1px solid ${col}55`:"none",color:on?col:"#444",fontSize:9,fontWeight:700,fontFamily:"inherit"}}>{lvl}</button>;
        })}
      </div>

      <button onClick={onClose} style={{width:"100%",padding:14,borderRadius:13,border:"none",background:"#D4FF00",color:"#000",fontFamily:"system-ui,sans-serif",fontSize:14,fontWeight:800,cursor:"pointer"}}>💾 Save Session Log</button>
    </>
  );
}

// ── PAYMENT SHEET ────────────────────────────────────────────────────────────
function PaymentSheet({clientIdx,onClose}){
  const [amount,setAmount]=useState("");
  const cl=C[clientIdx]||C[0];
  return(
    <>
      <div style={{fontFamily:"system-ui,sans-serif",fontSize:20,fontWeight:800,marginBottom:3}}>Record Payment</div>
      <div style={{fontSize:12,color:"#555",marginBottom:18,display:"flex",alignItems:"center",gap:8}}>
        <Av name={cl.name} col={cl.col} sz={22}/>{cl.name}
        {cl.due>0&&<span style={{padding:"3px 8px",borderRadius:20,background:"#2e1a1a",color:"#FF4D4D",fontSize:10,fontWeight:700}}>Due ₹{cl.due}</span>}
      </div>
      <div style={{fontSize:9,color:"#444",textTransform:"uppercase",letterSpacing:1,marginBottom:7}}>Amount Received</div>
      <div style={{display:"flex",alignItems:"center",gap:8,background:"#111",borderRadius:12,padding:"12px 14px",marginBottom:14}}>
        <span style={{fontFamily:"system-ui,sans-serif",fontSize:22,fontWeight:800,color:"#00D4AA"}}>₹</span>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0" style={{flex:1,background:"transparent",border:"none",color:"#f0f0f0",fontSize:22,fontFamily:"system-ui,sans-serif",fontWeight:800,outline:"none",width:"100%"}}/>
      </div>
      <div style={{display:"flex",gap:7,marginBottom:16}}>
        {[500,1000,1500,2000].map(a=>(
          <button key={a} onClick={()=>setAmount(String(a))} style={{flex:1,padding:"8px 4px",borderRadius:9,border:`1px solid ${amount==a?"#00D4AA55":"#222"}`,background:amount==a?"#00D4AA18":"#1a1a1a",color:amount==a?"#00D4AA":"#555",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>₹{a}</button>
        ))}
      </div>
      <button onClick={onClose} style={{width:"100%",padding:14,borderRadius:13,border:"none",background:amount?"#D4FF00":"#1e1e1e",color:amount?"#000":"#444",fontFamily:"system-ui,sans-serif",fontSize:14,fontWeight:800,cursor:"pointer"}}>
        {amount?`✓ Record ₹${parseInt(amount).toLocaleString()}`:"Enter amount"}
      </button>
    </>
  );
}

// ── SLOT ACTION SHEET ────────────────────────────────────────────────────────
function SlotSheet({info,onLog,onClose}){
  if(!info)return null;
  const {slot,day}=info;
  const cl=slot.ci!==null?C[slot.ci]:null;
  if(!cl)return null;
  return(
    <>
      <div style={{fontFamily:"system-ui,sans-serif",fontSize:20,fontWeight:800,marginBottom:3}}>{day} · {slot.t}</div>
      <div style={{fontSize:12,color:"#555",marginBottom:18,display:"flex",alignItems:"center",gap:8}}><Av name={cl.name} col={cl.col} sz={22}/>{cl.name} · 1 hr session</div>
      <AB label="Mark Done & Log Session" col="#000" bg="#D4FF00" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>} onClick={()=>{onClose();onLog(slot.ci);}}/>
      <AB label="Send WhatsApp Reminder" col="#25D366" bg="#1a2e1a" icon={WA_SVG} onClick={()=>{window.open(`https://wa.me/91${cl.ph}?text=Hi+${cl.name.split(' ')[0]}!+Reminder:+Your+session+is+at+${encodeURIComponent(slot.t)}.+See+you!`,'_blank');onClose();}}/>
      <AB label="Cancel Session" col="#FF4D4D" bg="#2e1a1a" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF4D4D" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>} onClick={onClose}/>
    </>
  );
}

// ── BOOK SHEET ───────────────────────────────────────────────────────────────
function BookSheet({onClose}){
  return(
    <>
      <div style={{fontFamily:"system-ui,sans-serif",fontSize:20,fontWeight:800,marginBottom:3}}>Book a Slot</div>
      <div style={{fontSize:12,color:"#555",marginBottom:14}}>Select a client to book</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {C.map((c,i)=>(
          <div key={i} onClick={onClose} style={{display:"flex",alignItems:"center",gap:11,padding:"12px 13px",background:`${c.col}11`,border:`1px solid ${c.col}33`,borderRadius:12,cursor:"pointer"}}>
            <Av name={c.name} col={c.col} sz={34}/>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:c.col}}>{c.name}</div>
              <div style={{fontSize:10,color:"#555"}}>{c.sess} sessions this month</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ── HELPERS ──────────────────────────────────────────────────────────────────
function slotToMins(slot){
  const[time,period]=slot.split(" ");
  let[h,m]=time.split(":").map(Number);
  if(period==="PM"&&h!==12)h+=12;
  if(period==="AM"&&h===12)h=0;
  return h*60+m;
}
function minsToSlot(totalMins){
  const h24=Math.floor(totalMins/60)%24,m=totalMins%60;
  const period=h24>=12?"PM":"AM";
  const h12=h24===0?12:h24>12?h24-12:h24;
  return `${h12}:${String(m).padStart(2,"0")} ${period}`;
}
function formatSlot(h,m,period){
  const h24=period==="AM"?(h===12?0:h):(h===12?12:h+12);
  return minsToSlot(h24*60+m);
}

// ── AVAILABILITY SCREEN ───────────────────────────────────────────────────────
const DEFAULT_SLOTS=["6:00 AM","6:30 AM","7:00 AM","7:30 AM","8:00 AM","9:00 AM","10:00 AM","5:00 PM","6:00 PM","7:00 PM"];

function AvailabilityScreen({slots,setSlots,activeDays,setActiveDays,activeSlots,setActiveSlots,blockedDates,setBlockedDates}){
  const [section,setSection]=useState("slots"); // "slots" | "days" | "block"
  const [h,setH]=useState(6);
  const [m,setM]=useState(0);
  const [period,setPeriod]=useState("AM");
  const [blockDate,setBlockDate]=useState(new Date().toISOString().slice(0,10));
  const [blockReason,setBlockReason]=useState("");
  const [blockScope,setBlockScope]=useState("all");
  const [blockSlots,setBlockSlots]=useState([]);
  const [toast,setToast]=useState("");

  const showToast=(msg)=>{setToast(msg);setTimeout(()=>setToast(""),2200);};

  const addSlot=()=>{
    const label=formatSlot(h,m,period);
    if(slots.includes(label)){showToast("Slot already exists");return;}
    const next=[...slots,label].sort((a,b)=>slotToMins(a)-slotToMins(b));
    setSlots(next);
    setActiveSlots(prev=>{
      const n={...prev};
      DAYS.forEach(d=>{n[d]={...n[d],[label]:true};});
      return n;
    });
    showToast(`${label} added ✓`);
  };

  const removeSlot=(slot)=>{
    setSlots(prev=>prev.filter(s=>s!==slot));
    setActiveSlots(prev=>{
      const n={...prev};
      DAYS.forEach(d=>{const{[slot]:_,...rest}=n[d]||{};n[d]=rest;});
      return n;
    });
    showToast(`${slot} removed`);
  };

  const toggleDay=(day)=>setActiveDays(p=>({...p,[day]:!p[day]}));
  const toggleDaySlot=(day,slot)=>setActiveSlots(p=>({...p,[day]:{...p[day],[slot]:!p[day][slot]}}));

  const saveBlock=()=>{
    if(!blockReason.trim()){showToast("Add a reason");return;}
    setBlockedDates(prev=>({...prev,[blockDate]:{reason:blockReason,scope:blockScope,slots:blockSlots}}));
    setBlockReason("");setBlockSlots([]);
    showToast(`${blockDate} blocked`);
  };

  const removeBlock=(date)=>{setBlockedDates(prev=>{const n={...prev};delete n[date];return n;});showToast("Block removed");};

  const togBlockSlot=(sl)=>setBlockSlots(p=>p.includes(sl)?p.filter(x=>x!==sl):[...p,sl]);

  return(
    <div style={{flex:1,overflowY:"auto",padding:"0 16px"}}>
      {toast&&<div style={{position:"sticky",top:8,zIndex:10,background:"#D4FF00",color:"#000",borderRadius:20,padding:"7px 16px",fontSize:12,fontWeight:700,textAlign:"center",marginBottom:8,animation:"su .2s ease"}}>{toast}</div>}

      <div style={{padding:"14px 0 16px"}}>
        <div style={{fontFamily:"system-ui,sans-serif",fontSize:26,fontWeight:800,letterSpacing:-0.5}}>Availability</div>
        <div style={{fontSize:11,color:"#555",marginTop:2}}>Manage your slots & days off</div>
      </div>

      {/* Section tabs */}
      <div style={{display:"flex",background:"#1a1a1a",borderRadius:10,padding:3,gap:2,marginBottom:18}}>
        {[["slots","Time Slots"],["days","Working Days"],["block","Block Dates"]].map(([id,label])=>(
          <button key={id} onClick={()=>setSection(id)} style={{flex:1,padding:"8px 4px",borderRadius:7,border:"none",cursor:"pointer",background:section===id?"#D4FF00":"transparent",color:section===id?"#000":"#555",fontWeight:700,fontSize:11,fontFamily:"inherit",transition:"all .15s"}}>
            {label}
          </button>
        ))}
      </div>

      {/* ── TIME SLOTS ── */}
      {section==="slots"&&(
        <div>
          {/* Add new slot */}
          <div style={{background:"#141414",border:"1px solid #242424",borderRadius:15,padding:16,marginBottom:14}}>
            <div style={{fontSize:10,color:"#555",textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Add New Slot</div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
              {/* Hour */}
              <div style={{display:"flex",alignItems:"center",background:"#1c1c1c",borderRadius:10,overflow:"hidden"}}>
                <button onClick={()=>setH(h===1?12:h-1)} style={{padding:"10px 12px",background:"none",border:"none",color:"#666",fontSize:16,cursor:"pointer"}}>−</button>
                <span style={{fontFamily:"system-ui,sans-serif",fontSize:20,fontWeight:800,color:"#D4FF00",minWidth:28,textAlign:"center"}}>{h}</span>
                <button onClick={()=>setH(h===12?1:h+1)} style={{padding:"10px 12px",background:"none",border:"none",color:"#666",fontSize:16,cursor:"pointer"}}>+</button>
              </div>
              <span style={{color:"#444",fontSize:18,fontWeight:700}}>:</span>
              {/* Minutes toggle */}
              <button onClick={()=>setM(m===0?30:0)} style={{background:"#1c1c1c",border:"none",borderRadius:10,padding:"10px 16px",fontFamily:"system-ui,sans-serif",fontSize:20,fontWeight:800,color:"#00D4AA",cursor:"pointer",minWidth:56}}>
                {String(m).padStart(2,"0")}
              </button>
              {/* AM/PM */}
              <div style={{display:"flex",background:"#1c1c1c",borderRadius:10,overflow:"hidden"}}>
                {["AM","PM"].map(p=>(
                  <button key={p} onClick={()=>setPeriod(p)} style={{padding:"10px 12px",background:period===p?"#D4FF0022":"transparent",border:"none",color:period===p?"#D4FF00":"#555",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
              <span style={{fontSize:12,color:"#555"}}>Preview: <span style={{color:"#D4FF00",fontWeight:700}}>{formatSlot(h,m,period)}</span></span>
              <button onClick={addSlot} style={{padding:"9px 20px",borderRadius:20,background:"#D4FF00",color:"#000",border:"none",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>+ Add</button>
            </div>
            <div style={{fontSize:10,color:"#3a3a3a"}}>Tap the minutes to toggle :00 / :30</div>
          </div>

          {/* Existing slots */}
          <div style={{fontSize:10,color:"#444",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>{slots.length} slots configured</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,paddingBottom:20}}>
            {slots.map(slot=>(
              <div key={slot} style={{display:"flex",alignItems:"center",background:"#141414",border:"1px solid #242424",borderRadius:12,padding:"12px 14px",gap:12}}>
                <div style={{fontFamily:"system-ui,sans-serif",fontSize:16,fontWeight:800,color:"#f0f0f0",flex:1}}>{slot}</div>
                <div style={{display:"flex",gap:6}}>
                  {DAYS.map(day=>{
                    const on=activeSlots[day]?.[slot];
                    const dayOff=!activeDays[day];
                    return(
                      <button key={day} onClick={()=>!dayOff&&toggleDaySlot(day,slot)} style={{width:28,height:28,borderRadius:6,border:"none",cursor:dayOff?"not-allowed":"pointer",background:dayOff?"#0d0d0d":on?"#D4FF0022":"#1e1e1e",color:dayOff?"#1e1e1e":on?"#D4FF00":"#333",fontSize:9,fontWeight:700,title:day}}>
                        {dayOff?"—":on?"✓":"✕"}
                      </button>
                    );
                  })}
                </div>
                <button onClick={()=>removeSlot(slot)} style={{width:26,height:26,borderRadius:7,background:"#2e1a1a",border:"none",color:"#FF4D4D",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✕</button>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",paddingBottom:8,marginBottom:8}}>
            {DAYS.map(d=><span key={d} style={{fontSize:9,color:activeDays[d]?"#D4FF00":"#333",fontWeight:700}}>{d}{!activeDays[d]?" (off)":""}</span>)}
          </div>
          <div style={{fontSize:10,color:"#333",paddingBottom:20}}>Each column = day · ✓ available · ✕ off · — day off</div>
        </div>
      )}

      {/* ── WORKING DAYS ── */}
      {section==="days"&&(
        <div>
          <div style={{background:"#141414",border:"1px solid #242424",borderRadius:15,padding:16,marginBottom:16}}>
            <div style={{fontSize:10,color:"#555",textTransform:"uppercase",letterSpacing:1,marginBottom:14}}>Toggle your working days</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {DAYS.map(day=>(
                <button key={day} onClick={()=>toggleDay(day)} style={{flex:"1 0 calc(33% - 8px)",padding:"14px 8px",borderRadius:13,border:`2px solid ${activeDays[day]?"#D4FF00":"#242424"}`,background:activeDays[day]?"#D4FF0018":"#1a1a1a",cursor:"pointer",fontFamily:"inherit",transition:"all .15s"}}>
                  <div style={{fontFamily:"system-ui,sans-serif",fontSize:17,fontWeight:800,color:activeDays[day]?"#D4FF00":"#f0f0f0"}}>{day}</div>
                  <div style={{fontSize:10,marginTop:4,color:activeDays[day]?"#a8cc00":"#444",fontWeight:600}}>{activeDays[day]?"Working":"Day Off"}</div>
                </button>
              ))}
            </div>
          </div>
          <div style={{background:"#141414",border:"1px solid #242424",borderRadius:15,padding:14,paddingBottom:20}}>
            <div style={{fontSize:10,color:"#555",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Summary</div>
            {DAYS.map(day=>(
              <div key={day} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #1a1a1a"}}>
                <span style={{fontSize:13,fontWeight:600,color:activeDays[day]?"#f0f0f0":"#333"}}>{day}</span>
                <div style={{display:"flex",gap:4,alignItems:"center"}}>
                  {activeDays[day]?(
                    <>
                      <span style={{fontSize:10,color:"#555"}}>{slots.filter(sl=>activeSlots[day]?.[sl]).length} slots</span>
                      <span style={{padding:"2px 8px",borderRadius:20,background:"#D4FF0018",color:"#D4FF00",fontSize:9,fontWeight:700}}>ON</span>
                    </>
                  ):(
                    <span style={{padding:"2px 8px",borderRadius:20,background:"#1e1e1e",color:"#444",fontSize:9,fontWeight:700}}>OFF</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── BLOCK DATES ── */}
      {section==="block"&&(
        <div>
          <div style={{background:"#141414",border:"1px solid #242424",borderRadius:15,padding:16,marginBottom:16}}>
            <div style={{fontSize:10,color:"#555",textTransform:"uppercase",letterSpacing:1,marginBottom:14}}>Block a Date</div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:10,color:"#444",marginBottom:6}}>Date</div>
              <input type="date" value={blockDate} onChange={e=>setBlockDate(e.target.value)}
                style={{width:"100%",background:"#1c1c1c",border:"1px solid #2a2a2a",borderRadius:9,padding:"10px 12px",color:"#f0f0f0",fontSize:14,fontFamily:"inherit"}}/>
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:10,color:"#444",marginBottom:6}}>Reason</div>
              <input value={blockReason} onChange={e=>setBlockReason(e.target.value)} placeholder="e.g. Unwell, Travel, Holiday..."
                style={{width:"100%",background:"#1c1c1c",border:"1px solid #2a2a2a",borderRadius:9,padding:"10px 12px",color:"#f0f0f0",fontSize:13,fontFamily:"inherit"}}/>
            </div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:10,color:"#444",marginBottom:8}}>Block</div>
              <div style={{display:"flex",gap:7}}>
                {[["all","Full Day"],["specific","Specific Slots"]].map(([v,l])=>(
                  <button key={v} onClick={()=>{setBlockScope(v);setBlockSlots([]);}} style={{flex:1,padding:"9px",borderRadius:9,border:`1px solid ${blockScope===v?"#FF4D4D55":"#242424"}`,background:blockScope===v?"#FF4D4D18":"#1a1a1a",color:blockScope===v?"#FF4D4D":"#555",fontWeight:600,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            {blockScope==="specific"&&(
              <div style={{marginBottom:14}}>
                <div style={{fontSize:10,color:"#444",marginBottom:8}}>Select slots to block</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {slots.map(sl=>{
                    const on=blockSlots.includes(sl);
                    return <button key={sl} onClick={()=>togBlockSlot(sl)} style={{padding:"5px 10px",borderRadius:20,border:`1px solid ${on?"#FF4D4D55":"#242424"}`,background:on?"#FF4D4D18":"#1a1a1a",color:on?"#FF4D4D":"#555",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{sl}</button>;
                  })}
                </div>
              </div>
            )}
            <button onClick={saveBlock} style={{width:"100%",padding:"12px",borderRadius:11,border:"none",background:"#FF4D4D",color:"#fff",fontFamily:"system-ui,sans-serif",fontSize:13,fontWeight:800,cursor:"pointer"}}>
              🚫 Block This Date
            </button>
          </div>

          {/* Blocked list */}
          {Object.keys(blockedDates).length>0&&(
            <>
              <div style={{fontSize:10,color:"#444",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Blocked Dates</div>
              <div style={{display:"flex",flexDirection:"column",gap:8,paddingBottom:20}}>
                {Object.entries(blockedDates).sort().map(([date,info])=>(
                  <div key={date} style={{background:"#1a0e0e",border:"1px solid #FF4D4D33",borderRadius:13,padding:"13px 14px",display:"flex",alignItems:"flex-start",gap:12}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:"#FF4D4D",marginTop:4,flexShrink:0}}/>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:700}}>{date}</div>
                      <div style={{fontSize:11,color:"#888",marginTop:2}}>{info.scope==="all"?"Full day blocked":`Slots: ${info.slots.join(", ")||"none"}`}</div>
                      <div style={{fontSize:11,color:"#FF4D4D",marginTop:1}}>{info.reason}</div>
                    </div>
                    <button onClick={()=>removeBlock(date)} style={{padding:"5px 10px",borderRadius:8,background:"#2e1a1a",border:"none",color:"#FF4D4D",fontSize:10,fontWeight:700,cursor:"pointer"}}>Remove</button>
                  </div>
                ))}
              </div>
            </>
          )}
          {Object.keys(blockedDates).length===0&&(
            <div style={{textAlign:"center",color:"#333",fontSize:13,padding:"30px 0",paddingBottom:20}}>No dates blocked yet.</div>
          )}
        </div>
      )}
    </div>
  );
}

// ── NAV ──────────────────────────────────────────────────────────────────────
const NAV=[
  ["schedule","Schedule",<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>],
  ["clients","Clients",<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>],
  ["payments","Payments",<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>],
  ["progress","Progress",<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>],
  ["avail","Avail.",<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>],
];

// ── APP ──────────────────────────────────────────────────────────────────────
export default function FitPro(){
  const [tab,setTab]=useState("schedule");
  const [slotInfo,setSlotInfo]=useState(null);
  const [bookOpen,setBookOpen]=useState(false);
  const [logOpen,setLogOpen]=useState(false);
  const [logClient,setLogClient]=useState(0);
  const [payOpen,setPayOpen]=useState(false);
  const [payClient,setPayClient]=useState(0);
  const [progressClient,setProgressClient]=useState(0);

  // Availability state
  const [slots,setSlots]=useState(DEFAULT_SLOTS);
  const [activeDays,setActiveDays]=useState({Mon:true,Tue:true,Wed:true,Thu:true,Fri:true,Sat:true});
  const [activeSlots,setActiveSlots]=useState(()=>{
    const s={};DAYS.forEach(d=>{s[d]={};DEFAULT_SLOTS.forEach(sl=>{s[d][sl]=true;});});return s;
  });
  const [blockedDates,setBlockedDates]=useState({});

  const openLog=(ci)=>{setLogClient(ci);setLogOpen(true);};
  const openPay=(ci)=>{setPayClient(ci);setPayOpen(true);};
  const openProgress=(ci)=>{setProgressClient(ci);setTab("progress");};

  return(
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",background:"#030303",fontFamily:"system-ui,sans-serif",fontSize:14,lineHeight:1.4}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased;text-size-adjust:100%}
        html{font-size:14px}
        button,input,select,textarea{font-family:system-ui,sans-serif;font-size:inherit}
        ::-webkit-scrollbar{display:none}
        @keyframes su{from{transform:translateY(100%)}to{transform:translateY(0)}}
      `}</style>

      <div style={{width:375,height:780,background:"#0a0a0a",color:"#f0f0f0",borderRadius:50,overflow:"hidden",position:"relative",boxShadow:"0 0 0 1px #1e1e1e,0 50px 120px rgba(0,0,0,0.95)",display:"flex",flexDirection:"column",flexShrink:0}}>

        {/* Notch */}
        <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:118,height:32,background:"#000",borderRadius:"0 0 18px 18px",zIndex:20}}/>

        {/* Status bar */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 26px 6px",flexShrink:0,position:"relative",zIndex:10}}>
          <span style={{fontFamily:"system-ui,sans-serif",fontSize:14,fontWeight:800}}>9:41</span>
          <div style={{display:"flex",gap:5,alignItems:"center"}}>
            <svg width="13" height="10" viewBox="0 0 24 18" fill="#f0f0f0"><path d="M12 4C8 4 4.5 5.5 2 8l2 2c2-2 4.7-3 8-3s6 1 8 3l2-2C19.5 5.5 16 4 12 4zM12 8c-2.5 0-4.7.9-6.4 2.4l2 2C8.8 11.3 10.3 11 12 11s3.2.3 4.4 1.4l2-2C16.7 8.9 14.5 8 12 8zM12 12c-1.4 0-2.6.5-3.5 1.3l3.5 3.5 3.5-3.5C14.6 12.5 13.4 12 12 12z"/></svg>
            <svg width="21" height="11" viewBox="0 0 28 14" fill="none"><rect x="1" y="1" width="22" height="12" rx="2" stroke="#f0f0f0" strokeWidth="1.5"/><rect x="3" y="3" width="14" height="8" rx="1" fill="#f0f0f0"/><path d="M24 5h2a1 1 0 0 1 0 4h-2" stroke="#f0f0f0" strokeWidth="1.5"/></svg>
          </div>
        </div>

        {/* Screen */}
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"}}>
          {tab==="schedule"&&<ScheduleScreen onSlotTap={setSlotInfo} onFree={()=>setBookOpen(true)}/>}
          {tab==="clients" &&<ClientsScreen onLog={openLog} onPayment={openPay}/>}
          {tab==="payments"&&<PaymentsScreen onRecordPayment={openPay}/>}
          {tab==="progress"&&<ProgressScreen onLog={openLog} initClient={progressClient}/>}
          {tab==="avail"   &&<AvailabilityScreen slots={slots} setSlots={setSlots} activeDays={activeDays} setActiveDays={setActiveDays} activeSlots={activeSlots} setActiveSlots={setActiveSlots} blockedDates={blockedDates} setBlockedDates={setBlockedDates}/>}

          <Sheet open={!!slotInfo} onClose={()=>setSlotInfo(null)}>
            <SlotSheet info={slotInfo} onLog={openLog} onClose={()=>setSlotInfo(null)}/>
          </Sheet>
          <Sheet open={bookOpen} onClose={()=>setBookOpen(false)}>
            <BookSheet onClose={()=>setBookOpen(false)}/>
          </Sheet>
          <Sheet open={logOpen} onClose={()=>setLogOpen(false)}>
            <LogSheet clientIdx={logClient} onClose={()=>setLogOpen(false)}/>
          </Sheet>
          <Sheet open={payOpen} onClose={()=>setPayOpen(false)}>
            <PaymentSheet clientIdx={payClient} onClose={()=>setPayOpen(false)}/>
          </Sheet>
        </div>

        {/* Bottom nav */}
        <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",background:"#141414",borderTop:"1px solid #1e1e1e",padding:"7px 0 18px",flexShrink:0}}>
          {NAV.map(([id,label,icon])=>(
            <button key={id} onClick={()=>setTab(id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",cursor:"pointer",color:tab===id?"#D4FF00":"#444",fontFamily:"system-ui,sans-serif",fontSize:9,fontWeight:600,padding:"5px 12px",minWidth:56}}>
              {icon}<span>{label}</span>
              <div style={{width:4,height:4,borderRadius:"50%",background:"#D4FF00",opacity:tab===id?1:0,marginTop:1}}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
