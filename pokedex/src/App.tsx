import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import NotFound from "./components/NotFound";
import PokemonGrid from "./components/PokemonGrid";
import PokemonDetailedView from "./components/PokemonDetailedView";
import {Pokemon, PokemonClient} from "pokenode-ts";
import {POKE_ID_RANGE} from "./constants/constants";

function App() {
    const [pokemon, setPokemon] = React.useState<Array<Pokemon>>([]);

    /**
     * Get the pokemon data from PokeAPI to populate the pokemon card grid. Grabs all pokemon and then the pokemon grid
     * component sorts out which subset of pokemon that should show up on the current page.
     */
    React.useEffect(() => {
        const getPokemon = async () => {
            const api = new PokemonClient();

            try {
                if (pokemon.length < POKE_ID_RANGE.MAX) {
                    const promises: Array<Promise<Pokemon>> = [];
                    for (let i = POKE_ID_RANGE.MIN; i <= POKE_ID_RANGE.MAX; i++) {
                        promises.push(api.getPokemonById(i));
                    }
                    // Wait for all the promises to resolve
                    const responses = await Promise.all(promises);
                    setPokemon(responses);
                }
            } catch (error: any) {
            }
        };
        getPokemon();
    }, []);

  return (
      <div className="App">
        <Router>
          <div>
            <Routes>
                <Route path="/pokedex/:pageNum" element={<PokemonGrid pokemon={pokemon}/>}/>
                <Route path="/pokemon/:pokemonId" element={<PokemonDetailedView/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;

