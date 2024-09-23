import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";import './App.css';
import NotFound from "./components/NotFound";
import PokemonCardObject from "./components/PokemonCardObject";

import { Pokemon, PokemonClient } from 'pokenode-ts';

function App() {

    const [pokemon, setPokemon] = React.useState<Pokemon>();
    const api = new PokemonClient();

    React.useEffect(() => {
        const getPokemon = () => {
            api.getPokemonById(1)
                .then((response) => {setPokemon(response)})
                .catch((error) => {console.log(error);});
        }
        getPokemon();
    })



  return (
      <div className="App">
        <Router>
          <div>
            <Routes>
                <Route path="/pokemon" element={<PokemonCardObject pokemon={pokemon}/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;

