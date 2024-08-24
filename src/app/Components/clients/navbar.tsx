import React from 'react'
import BurgerMenu from './burgerMenu'


export default async function Navbar(): Promise<JSX.Element> {

    return (
        <header className="w-full h-14 fixed border-b shadow bg-sky-800 top-0 left-0">
            <BurgerMenu/>
        </header>
    )
}
