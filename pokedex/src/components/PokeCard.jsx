import { useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber } from "../utils"
import TypeCard  from "./TypeCard"
import MoveModal from "./MoveModal"

export default function Pokecard(props) {
    const {selectedPokemon} = props
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [selectedMove, setSelectedMove] = useState(null)

    const {name, height, abilities, stats = [], types = [], moves, sprites = {}} = data || {}

    useEffect(() => {
        if (!localStorage) { return }
        
        let cache = {}
        try {
            cache = JSON.parse(localStorage.getItem('pokedex') || '{}')
        } catch (error) {
            console.error('Error parsing cache:', error)
        }

        if (!selectedPokemon && selectedPokemon !== 0) return;

        if (selectedPokemon in cache) {
            setData(cache[selectedPokemon])
            return
        }

        async function fetchPokemonData() {
            setLoading(true)
            try {
                const baseUrl = 'https://pokeapi.co/api/v2/'
                const suffix = `pokemon/${selectedPokemon + 1}`
                const finalUrl = `${baseUrl}${suffix}`
                console.log('Fetching from:', finalUrl)
                const res = await fetch(finalUrl)
                if (!res.ok) throw new Error('Failed to fetch Pokemon data')
                const pokemonData = await res.json()
                console.log('Received data:', pokemonData)
                setData(pokemonData)
                
                try {
                    cache[selectedPokemon] = pokemonData
                    localStorage.setItem('pokedex', JSON.stringify(cache))
                } catch (error) {
                    console.error('Error saving to cache:', error)
                }
            } catch (err) {
                console.error('Error fetching Pokemon:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchPokemonData()
    }, [selectedPokemon])

    const imgList = Object.keys(sprites || {}).filter(val => {
        if (!sprites[val]) { return false }
        if (['versions', 'other'].includes(val)) { return false }
        return true
    })

    const pokemonNumber = getFullPokedexNumber(selectedPokemon)
    const imageUrl = `/pokemon/${pokemonNumber}.png`

    const handleMoveClick = async (move) => {
        try {
            const res = await fetch(move.move.url)
            if (!res.ok) throw new Error('Failed to fetch move data')
            const moveData = await res.json()
            setSelectedMove({
                name: move.move.name,
                description: moveData.effect_entries.find(entry => entry.language.name === 'en')?.effect || 'No description available'
            })
        } catch (err) {
            console.error('Error fetching move:', err)
        }
    }

    return (
        <div className='poke-card'>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : data ? (
                <>
                    <div className="pokemon-header">
                        <h4>#{pokemonNumber}</h4>
                        <h2>{data.name}</h2>
                    </div>
                    <div className='type-container'>
                        {types.map((typeObj, typeIndex) => (
                            <TypeCard key={typeIndex} type={typeObj?.type?.name} />
                        ))}
                    </div>
                    <img 
                        className='default-img' 
                        src={imageUrl}
                        alt={`${data.name}-large-img`}
                        onError={(e) => {
                            console.error('Image failed to load:', imageUrl);
                            setImageError(true);
                        }}
                    />
                    <div className='img-container'>
                        {imgList.map((spriteUrl, spriteIndex) => (
                            <img 
                                key={spriteIndex} 
                                src={sprites[spriteUrl]} 
                                alt={`${name}-img-${spriteUrl}`} 
                            />
                        ))}
                    </div>

                    <section>
                        <h3>Stats</h3>
                        <div className='stats-card'>
                            {stats.map((statObj, statIndex) => {
                                const { stat, base_stat } = statObj;
                                return (
                                    <div key={statIndex} className='stat-item'> 
                                        <p>{stat?.name.replaceAll('-', ' ')}</p>
                                        <h4>{base_stat}</h4>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section>
                        <h3>Moves</h3>
                        <div className='pokemon-move-grid'>
                            {moves?.map((moveObj, moveIndex) => (
                                <button 
                                    key={moveIndex} 
                                    className='nav-card pokemon-move'
                                    onClick={() => handleMoveClick(moveObj)}
                                >
                                    <p className='skill-name'>{moveObj.move.name.replaceAll('-', ' ')}</p>
                                </button>
                            ))}
                        </div>
                    </section>
                </>
            ) : (
                <div className="no-data">Select a Pokemon</div>
            )}

            {selectedMove && (
                <MoveModal 
                    move={selectedMove} 
                    onClose={() => setSelectedMove(null)} 
                />
            )}
        </div>
    )
}