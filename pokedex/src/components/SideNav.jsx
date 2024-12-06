import { first151Pokemon, getFullPokedexNumber } from "../utils"

export default function SideNav() {
    return (
        <nav>
            <div className={"header"}>
                <h1 className="text-gradient">Pokedex</h1>
                <input />
            </div>
            {first151Pokemon.map((pokemon, pokemonIndex) => {
                return (
                <button ket={pokemon} className={'nav-card '}>
                    <p>{getFullPokedexNumber(pokemonIndex)}</p>
                    <p>{pokemon}</p>
                </button>
                )
            })}
        </nav>
    )
}