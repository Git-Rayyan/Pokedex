import Header from "./components/Header"
import Pokecard from "./components/PokeCard"
import SideNav from "./components/SideNav"
import { useState } from 'react'

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0)
  console.log('App - selectedPokemon:', selectedPokemon)

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <SideNav selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon}/>
        <Pokecard selectedPokemon={selectedPokemon}/>
      </div>
    </div>
  )
}

export default App
