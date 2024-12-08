import { useState } from 'react'

export default function Header() {
    const toggleNav = () => {
        const nav = document.querySelector('nav')
        nav.classList.toggle('open')
    }

    return (
        <header>
            <button onClick={toggleNav} className="open-nav-button">
                <i className="fas fa-bars"></i>
            </button>
            <h1 className="mobile-title">Pokedex</h1>
        </header>
    )
}