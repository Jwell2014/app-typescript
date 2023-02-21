import React from 'react';
import './App.css';
import Menu from './components/Menu';
import { useState, useEffect } from 'react';
import Panier from './components/panier';
import api, {IDataRow } from './services/api';

function App() {
  const [fondClass, setFondClass] = useState("bg-pas-vegan");
  const [regime, setRegime]= useState(2);
  const [formule, setFormule]= useState(1);
  const [job, setJob] = useState(0);
  const [entreesDuJour, setEntreesDuJour] = useState([] as IDataRow[]);
  const [isMounted, setIsMounted] = useState(false);

const handleRegimeClick = (index:number) => {
  const fond = ["bg-vegan", "bg-pas-vegan", "bg-viandard-sensible"];
  setFondClass(fond[index]);
setRegime(index);
}
const handleFormuleClick = (index:number) => {
  setFormule(index);
  }
  const handleJobClick = (index:number) => {
    setJob(index);
    }

  useEffect(() => {
    !isMounted && api.getEntreesDuJour().then(json => {
      setIsMounted(true);
      setEntreesDuJour(json)
    })
    
  }, [isMounted])
  return (
    <div className="App">
      <header className={fondClass}>
        {/* Permet d'afficher le jour de la semaine */}
        <h1>Menu du {new Date().toLocaleDateString("fr-FR", {weekday:'long'}) }</h1>
      </header>
      <nav>
        <Menu propsClassName={`regime ${fondClass}`} data={["Vegan", "Viandard", "Véquoi ?"]} onClick={handleRegimeClick} selected={regime}/>
        <Menu propsClassName={fondClass} data={["Petite faim", "Grosse faim"]} onClick={handleFormuleClick} selected={formule}/>
      </nav>
      <section className={fondClass}>
      {formule === 1 && (
          <article className="entree">
            <h2>Entrées</h2>
            {entreesDuJour &&
              entreesDuJour
                .filter(
                  (row) =>
                    (regime === 0 && row.Vegan) || (regime !== 0 && !row.Vegan)
                )
                .map((row, index) => {
                  return (
                    <div key={index}>
                      <h3>{row.Nom}</h3>
                      <p>{row.Description}</p>
                    </div>
                  );
                })}
          </article>
        )}
        <article className="plat">
          <h2>Plat</h2>
          <h3>Etouffe-Chrétien</h3>
          <p>
            C'est au figuré
            <br />
            En vrai on n'a rien contre les chrétiens d'ailleurs j'ai un ami
            chrétien, et il <b>adore</b> ce{" "}
            <span className="principal">Sandwich</span>
            {regime === 0 && (
              <span className="garniture">
                <a
                  href="https://vegan-pratique.fr/cote-cuisine/cuisiner-proteines-de-soja-texturees/"
                  target="_blank"
                  rel="noreferrer">
                  protéines de soja texturées
                </a>
              </span>
            )}
            {regime !== 0 && (
              <span className="garniture">
                <a
                  href="https://fr.wikipedia.org/wiki/poulet"
                  target="_blank"
                  rel="noreferrer">
                  poulet
                </a>
              </span>
            )}{" "}
            <span className="sauce">mayonnaise {regime === 0 && "vegan"}</span>
          </p>
        </article>
      </section>
      <footer>
      <Menu propsClassName={`job ${fondClass}`} data={["Abonné","Pompier ou Militaire","Autre"]} onClick={handleJobClick} selected={job } />
      <Panier fondClass={`panier ${fondClass}`} job={job}/>
      <Menu propsClassName={`valide ${fondClass}`} data={["Commander"]}/>
      </footer>

    </div>
  );
  }

export default App;
