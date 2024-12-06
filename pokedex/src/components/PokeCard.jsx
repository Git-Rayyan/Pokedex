import { useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber } from "../utils"
import TypeCard  from "./TypeCard"
export default function Pokecard() {
    const{selectedPokemon} = props
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const {name, height, abilities, stats, types, moves, sprites } = data || {}

    const imgList = Object.keys(sprite || {}).filter(val => {
        if (!sprites[val]) { return false }
        if (['versions', 'other'].includes(val)) { return false }
        return true
    })
    useEffect(() => {
        // if loading, exit logic
        if (loading || !localStorage) { return }
        // check if the selceted pokemon information is available in caache
        // define cache
        let cache = {}
        if (localStorage.getItem('pokedex')) {
            cache = JSON.parse(localStorage.getItem('pokedex'))
        }
        // check if selected pokemon is in cache, otherwise fetch from api

        if(selectedPokemon in cache) {
            setData(cache[selectedPokemon])
            return
        }

        // passed all cache and now need to fetch data from api

        async function fetchPokemonData() {
            setLoading(true)
            try {
                const baseUrl = 'https://pokeapi.co/api/v2/'
                const suffix = 'pokemon/' + getPokedexNumber
                const finalUrl = baseUrl + suffix
                const res = await fetchPokemonData(finalUrl)
                const pokemonData = await res.json()
                setData(pokemonData)
                console.log(pokemonData)
                cache[selectedPokemon] = pokemonData
                localStorage.setItem('pokedex', JSON.stringify(cache))
            } catch (err) {
                    console.log(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPokemonData()
        // if fetched from api save the infromation to the cache
    }, [selectedPokemon])

    if (loading || !data) {
        return (
            <div>
                <h4>loading...</h4>
            </div>
        )
    }

    return (
        <div className='poke-card'>
            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className='type-container'>
            {types.map((typeObj, typeIndex) => {
                return (
                    <TypeCard key={typeIndex} type={typeObj?. type?. name} />
                );
            })}

            </div>
            <img className='default-img' src={'/pokemon' + getFullPokedexNumber(selectedPokemon) + '.png'} alt={'${name}-large-img'} />
            <div className='img-container'>
                {}
            </div>
        </div>
    )
}