import { first151Pokemon, getFullPokedexNumber } from "../utils"
import { useState } from 'react'

export default function SideNav({ selectedPokemon, setSelectedPokemon }) {
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const handlePokemonSelect = (pokemonIndex) => {
        setIsLoading(true)
        setSelectedPokemon(pokemonIndex)
        setIsLoading(false)
        
        // Close nav on mobile after selection
        if (window.innerWidth < 768) {
            const nav = document.querySelector('nav')
            nav.classList.remove('open')
        }
    }

    const filteredPokemon = first151Pokemon.filter((pokemon, index) => {
        const pokemonNumber = getFullPokedexNumber(index)
        return pokemon.toLowerCase().includes(searchTerm.toLowerCase()) || 
               pokemonNumber.includes(searchTerm)
    })

    return (
        <nav>
            <div className="header">
                <h1 className="text-gradient">Pokedex</h1>
                <input 
                    placeholder="Search by name or number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {filteredPokemon.map((pokemon, index) => {
                const originalIndex = first151Pokemon.indexOf(pokemon)
                return (
                    <button 
                        key={originalIndex}
                        className={`nav-card ${selectedPokemon === originalIndex ? 'selected' : ''}`}
                        onClick={() => handlePokemonSelect(originalIndex)}
                    >
                        <p>{getFullPokedexNumber(originalIndex)}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}