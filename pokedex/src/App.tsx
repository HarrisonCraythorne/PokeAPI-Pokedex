import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";import './App.css';
import NotFound from "./components/NotFound";
import PokemonCardObject from "./components/PokemonCardObject";

import { Pokemon, PokemonClient } from 'pokenode-ts';
import PokemonGrid from "./components/PokemonGrid";

function App() {
  return (
      <div className="App">
        <Router>
          <div>
            <Routes>
                <Route path="/pokemon" element={<PokemonGrid/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;

