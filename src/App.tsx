import React from 'react';
import './App.css';
import Menu from './components/Menu';
import { useState } from 'react';
import Panier from './components/panier';

function App() {
  const [fondClass, setFondClass] = useState("bg-pas-vegan");
  const [regime, setRegime]= useState(2);
  const [formule, setFormule]= useState(1);
  const [job, setJob] = useState(0);

const handleRegimeClick = (index:number) => {
  const fond = ["bg-vegan", "bg-pas-vegan", "bg-viandard-sensible"];
  setFondClass(fond[index]);
setRegime(index);
}
const handleFormuleClick = (index:number) => {
  setFormule(index);
  }
  const handleJobClick = (index:number) => 
    setJob(index);
    }
  return (
    <div className="App">
      <header className={fondClass}>
        <Menu propsClassName={`regime ${fondClass}`} data={["Vegan", "Viandard", "Véquoi ?"]} onClick={handleRegimeClick} selected={regime}/>
        <Menu propsClassName={fondClass} data={["Petite faim", "Grosse faim"]} onClick={handleFormuleClick} selected={formule}/>
      </header>
      <nav></nav>
      <section className={fondClass}></section>
      <footer>
      <Menu propsClassName={`job ${fondClass}`} data={["Abonné","Pompier ou Militaire","Autre"]} onClick={handleJobClick} selected={job } />
      <Panier job={job}/>
      <Menu propsClassName={`valide ${fondClass}`} data={["Commander"]}/>
      </footer>

    </div>
  );
}

export default App;
