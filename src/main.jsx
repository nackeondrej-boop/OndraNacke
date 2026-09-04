import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AlertTriangle, ArrowRight, CalendarDays, Check, ChevronDown, CircleHelp, Clock3, Database, FileCheck2, GitBranch, LayoutDashboard, Menu, MessageSquareText, Milestone, Plus, Presentation, Search, Settings2, ShieldAlert, Target, Users, X } from 'lucide-react';
import './styles.css';

const nav = [
  ['Přehled', LayoutDashboard], ['AS-IS & požadavky', GitBranch], ['Rozhodnutí', CircleHelp, 4],
  ['Data & segmenty', Database], ['Rizika', ShieldAlert, 3], ['Milníky', Milestone],
  ['Definition of Done', FileCheck2], ['Tým & odpovědnosti', Users]
];

const decisions = [
  {id:'DEC-014', title:'Rozsah korporátního MVP', meta:'Produkt • SME, Corporate', owner:'Michaela Zítková (neověřeno)', due:'12. 9. 2026', level:'Kritické', tone:'red'},
  {id:'DEC-018', title:'Zdroj dat pro scoring klientů', meta:'Data • SME', owner:'Dominik Prokop (neověřeno)', due:'15. 9. 2026', level:'Vysoké', tone:'amber'},
  {id:'DEC-021', title:'Migrační strategie Siebel', meta:'Technologie • Všechny segmenty', owner:'Veronika Řeháková (neověřeno)', due:'18. 9. 2026', level:'Vysoké', tone:'amber'},
  {id:'DEC-023', title:'Výjimky z obslužného modelu', meta:'Proces • Corporate', owner:'Neověřený vlastník', due:'20. 9. 2026', level:'Střední', tone:'blue'}
];

const chain = [
  {tag:'AS-IS', title:'Správa obchodních příležitostí', id:'FUN-008', state:'Existuje', tone:'green'},
  {tag:'Požadavek', title:'Jednotný pohled na příležitost', id:'REQ-032', state:'Čeká na validaci', tone:'amber'},
  {tag:'Use case', title:'Práce RM s pipeline', id:'UC-011', state:'Právě vzniká', tone:'purple'},
  {tag:'Rozhodnutí', title:'Rozsah korporátního MVP', id:'DEC-014', state:'Otevřené', tone:'red'},
  {tag:'Priorita', title:'Po rozhodnutí', id:'—', state:'Blokováno', tone:'gray'}
];

const milestones = [
  {date:'10. 9.', title:'Validace AS-IS a gapů', sub:'7 dní', state:'active'},
  {date:'18. 9.', title:'Uzavření klíčových rozhodnutí', sub:'15 dní'},
  {date:'24. 9.', title:'Návrh cílového řešení', sub:'21 dní'},
  {date:'30. 9.', title:'Finální výstup a akceptace', sub:'27 dní', final:true}
];

function Status({tone='gray', children}) { return <span className={`pill ${tone}`}><i />{children}</span> }

function Sidebar({open, close}) {
  return <aside className={open ? 'sidebar open' : 'sidebar'}>
    <div className="brand"><div className="brandMark"><Target size={19}/></div><div><b>Projektový kompas</b><span>Transformace CRM</span></div><button className="mobileClose" onClick={close}><X/></button></div>
    <nav>{nav.map(([label, Icon, count], i) => <button key={label} className={i===0?'selected':''}><Icon size={18}/><span>{label}</span>{count && <em>{count}</em>}</button>)}</nav>
    <div className="sidebarBottom"><button><Settings2 size={18}/> Nastavení</button><div className="profile"><div className="avatar">VŘ</div><div><b>Veronika Řeháková</b><span>Projektová manažerka</span></div><ChevronDown size={16}/></div></div>
  </aside>
}

function Metric({icon:Icon, color, value, label, note, warning}) { return <div className="metric"><div className={`metricIcon ${color}`}><Icon size={20}/></div><div className="metricValue">{value}</div><div className="metricLabel">{label}</div><div className={warning?'metricNote warn':'metricNote'}>{warning?<AlertTriangle size={13}/>:<ArrowRight size={13}/>} {note}</div></div> }

function Modal({close}) {
  const [done,setDone]=useState(false);
  return <div className="modalBackdrop" onMouseDown={close}><div className="modal" onMouseDown={e=>e.stopPropagation()}><button className="close" onClick={close}><X/></button>{done ? <div className="success"><div><Check/></div><h2>Odpověď byla uložena</h2><p>Potvrzení bylo přidáno do historie položky včetně času a vlastníka.</p><button className="primary" onClick={close}>Hotovo</button></div> : <><span className="eyebrow">RYCHLÁ AKCEPTACE</span><h2>Validace požadavku REQ-032</h2><p>Jednotný pohled na obchodní příležitost pro všechny klientské segmenty.</p><label>Vaše rozhodnutí</label><div className="choice"><button className="chosen"><Check size={16}/> Akceptuji</button><button>Vrátit k doplnění</button></div><label>Strukturovaná odpověď</label><select><option>Bez výhrad</option><option>S podmínkou</option><option>Nesouhlasím</option></select><label>Komentář <span>(volitelné)</span></label><textarea placeholder="Doplňte kontext nebo podmínky akceptace…"/><button className="primary full" onClick={()=>setDone(true)}>Uložit odpověď</button></>}</div></div>
}

function App(){
  const [sidebar,setSidebar]=useState(false); const [modal,setModal]=useState(false); const [presentation,setPresentation]=useState(false);
  const today='4. září 2026';
  return <div className={presentation?'app presenting':'app'}>
    <Sidebar open={sidebar} close={()=>setSidebar(false)}/><main>
      <header><button className="hamb" onClick={()=>setSidebar(true)}><Menu/></button><div className="crumb">CRM TRANSFORMACE <span>/</span> MANAŽERSKÝ PŘEHLED</div><div className="headerRight"><div className="search"><Search size={16}/><span>Hledat v projektu…</span><kbd>⌘ K</kbd></div><button className="present" onClick={()=>setPresentation(!presentation)}><Presentation size={17}/>{presentation?'Ukončit prezentaci':'Prezentovat'}</button></div></header>
      <div className="content">
        <section className="welcome"><div><span className="eyebrow">STAV K {today.toUpperCase()}</span><h1>Dobré ráno, Veroniko.</h1><p>Tady je aktuální obraz projektu a témata, která vyžadují pozornost.</p></div><button className="primary" onClick={()=>setModal(true)}><Plus size={17}/> Přidat záznam</button></section>
        <section className="metrics"><Metric icon={FileCheck2} color="mint" value="68 %" label="Dokončené výstupy" note="+8 % za poslední týden"/><Metric icon={CircleHelp} color="rose" value="4" label="Otevřená rozhodnutí" note="2 blokují další postup" warning/><Metric icon={Milestone} color="violet" value="10. 9." label="Nejbližší milník" note="Validace AS-IS a gapů"/><Metric icon={CalendarDays} color="sky" value="26 dní" label="Do finální akceptace" note="Cílové datum 30. 9. 2026"/></section>

        <div className="grid topGrid"><section className="card decisions"><div className="cardHead"><div><h2>Rozhodnutí vyžadující pozornost</h2><p>Otevřené body seřazené podle naléhavosti</p></div><button className="linkBtn">Zobrazit vše <ArrowRight size={15}/></button></div><div className="decisionList">{decisions.map(d=><div className="decision" key={d.id}><div className={`urgency ${d.tone}`}/><div className="decisionMain"><b>{d.title}</b><span>{d.id} · {d.meta}</span></div><Status tone={d.tone}>{d.level}</Status><div className="person"><b>{d.owner}</b><span>Rozhodnout do {d.due}</span></div><button className="round"><ArrowRight size={16}/></button></div>)}</div></section>
        <section className="card milestoneCard"><div className="cardHead"><div><h2>Cesta k akceptaci</h2><p>Harmonogram do 30. září 2026</p></div></div><div className="timeline">{milestones.map((m,i)=><div className={`timelineItem ${m.state||''}`} key={m.date}><div className="date"><b>{m.date}</b><span>{m.sub}</span></div><div className="line"><i>{m.final?<Check size={13}/>:i+1}</i></div><div className="mileText"><b>{m.title}</b>{m.final&&<Status tone="green">Cílový stav</Status>}</div></div>)}</div><div className="delay"><AlertTriangle size={18}/><div><b>Podmíněný posun: nejpozději 15. 10.</b><p>Pouze při neuzavření kritických rozhodnutí do 18. 9. nebo nedostupnosti datových vstupů.</p></div></div></section></div>

        <div className="grid bottomGrid"><section className="card trace"><div className="cardHead"><div><h2>Trasovatelnost a gap analýza</h2><p>Ukázka vazby od současné funkce po prioritu</p></div><span className="verified"><Check size={13}/> Aktualizováno dnes</span></div><div className="chain">{chain.map((c,i)=><React.Fragment key={c.tag}><div className="chainItem"><span className="chainTag">{c.tag}</span><b>{c.title}</b><small>{c.id}</small><Status tone={c.tone}>{c.state}</Status></div>{i<chain.length-1&&<ArrowRight className="chainArrow" size={17}/>}</React.Fragment>)}</div><div className="gapRow"><div><span>OSUD AS-IS FUNKCE</span><b>Nahradit cílovou funkcionalitou</b></div><div><span>IDENTIFIKOVANÝ GAP</span><b>Chybí konsolidovaný pohled napříč segmenty</b></div><button onClick={()=>setModal(true)}>Rychle validovat <ArrowRight size={15}/></button></div></section>
        <section className="card progress"><div className="cardHead"><div><h2>Stav projektových podkladů</h2><p>Validace dostupných vstupů</p></div></div>{[['Definition of Done','12 / 16 bodů','75%','green'],['Datová zadání Q2 2024–2026','2 / 3 období','67%','blue'],['Materiály Q-noma','Čeká na validaci','40%','amber'],['Platná ADR','5 / 7 rozhodnutí','71%','purple']].map(r=><div className="progressRow" key={r[0]}><div><b>{r[0]}</b><span>{r[1]}</span></div><div className="bar"><i className={r[3]} style={{width:r[2]}}/></div><strong>{r[2]}</strong></div>)}<div className="unverified"><ShieldAlert size={17}/><p><b>Část podkladů není ověřena.</b><br/>Je označena jako „čeká na validaci“ a není prezentována jako schválená skutečnost.</p></div></section></div>
        <section className="horizon"><div className="horizonIcon"><Clock3/></div><div><span>NÁSLEDNÁ REALIZACE</span><h3>Implementace a migrace před vypnutím Siebelu</h3><p>Samostatný realizační horizont • říjen 2026 — prosinec 2027</p></div><div className="horizonLine"><i/><b>Vypnutí Siebelu<br/><span>31. 12. 2027</span></b></div></section>
      </div>
    </main>{modal&&<Modal close={()=>setModal(false)}/>}</div>
}

createRoot(document.getElementById('root')).render(<App/>);
