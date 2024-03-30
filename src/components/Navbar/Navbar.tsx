// Navbar.tsx
import React, { useState } from 'react';
import SuggestionBox from './SuggestionBox';
import reactLogo from '../../assets/react.svg';

interface Suggestion {
    name: string;
    logoUrl: string;
}

const suggestions: Suggestion[] = [
    { name: 'Toyota', logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/Toyota-Symbol.png' },
    { name: 'Honda', logoUrl: 'https://logos-world.net/wp-content/uploads/2021/03/Honda-Emblem.png' },
    { name: 'BMW', logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png' },
];

const navItems = ['MyDashboard', 'Membership', 'Login'];



const Navbar: React.FC = () => {
    const [navDisplay, setNavDisplay] = useState<'hidden' | 'block'>('hidden');

    const toggleNavDisplay = () => {
        setNavDisplay(navDisplay === 'hidden' ? 'block' : 'hidden');
    };

    const closeNav = () => {
        setNavDisplay('hidden');
    };

    return (
        <div className="flex h-16 bg-slate-800 justify-between">
            <div className='mt-1 ml-4 flex'>
                <img src={reactLogo} alt="Logo" width={40} />
                <p className='mt-2.5 font-semibold text-2xl px-3 text-white'>4Wheeler</p>
            </div>
            <div className=" hidden md:flex mt-1 py-2 text-sm md:w-fit md:px-4 justify-center">
                <SuggestionBox suggestions={suggestions} />
            </div>
            <ul className='md:flex hidden mt-2 py-3 px-6 text-white font-medium gap-12 mr-6'>
                {navItems.map((item) => <li key={item}>{item.toUpperCase()}</li>)}
            </ul>

            {/* Mobile Nav */}

            <div className='md:hidden flex justify-end ml-4 text-gray-100 flex-row py-2 px-6 font-semibold' onClick={toggleNavDisplay}> <div className='text-xl pt-1 mt-1'>Menu</div>
                <div className='rotate-90 text-xl ml-2'>||| </div>
            </div>
            <div className={`${navDisplay} fixed top-16 left-0 bg-slate-300 opacity-2 p-0 m-0 w-full h-48 z-10`} onClick={closeNav}>
                <div className="flex flex-col justify-center text-md h-full">
                    {navItems.map((item) =>
                        <button className="text-black font-600 text-xl py-3 px-3" key={item}>
                            {item.toUpperCase()}
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Navbar;
