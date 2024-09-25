import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import NotFound from "./components/NotFound";
import PokemonGrid from "./components/PokemonGrid";
import PokemonDetailedView from "./components/PokemonDetailedView";

function App() {
  return (
      <div className="App">
        <Router>
          <div>
            <Routes>
                <Route path="/pokemon" element={<PokemonGrid/>}/>
                <Route path="/pokemon/:pokemonId" element={<PokemonDetailedView/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;

