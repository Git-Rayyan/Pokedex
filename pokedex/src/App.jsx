import Header  from "./components/Header"
import Pokecard  from "./components/PokeCard"
import SideNav  from "./components/SideNav"
import {useState} from 'react'


function App() {
  const {selectedPokemon, setSelectedPokemon} = useState(0)
  return (
    <>
      <Header />
      <SideNav selectedPokemon={selectedPokemon} setSelectedPokemon={selectedPokemon}/>
      <Pokecard selectedPokemon={selectedPokemon}/>
    </>
  )
}

export default App
