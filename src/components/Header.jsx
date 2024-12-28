import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header>
            <nav className="bg-white px-4 lg:px-6 py-2.5 dark:bg-[#00003EE8]">
                <div className="flex flex-wrap items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img src="src/assets/images/ucab.webp" className="mr-3 h-6 sm:h-9" alt="Logo" />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <button 
                            onClick={toggleMenu}
                            type="button" 
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                            aria-controls="mobile-menu-2" 
                            aria-expanded={isOpen}>
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ml-auto" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <Link to="/" className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link to="/register" className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu-2"> 
                    <ul className="flex flex-col mt-4 font-medium">
                        <li>
                            <Link to="/" className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to="/register" className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white">Register</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;