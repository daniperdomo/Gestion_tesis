import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white shadow m-0 w-full dark:bg-[#00003EE8] bottom-0 left-0">
            <div className="w-full mx-auto max-w-screen-xl p-3 md:flex md:items-center md:justify-between">
                <span className="text-xs text-white sm:text-center dark:text-white">© 2025 <a href="https://www.ucab.edu.ve/" className="hover:underline">UCAB</a>. All Rights Reserved.</span>
                <ul className="flex flex-wrap items-center mt-2 text-xs font-medium text-white dark:text-white sm:mt-0">
                    <li>
                        <a href="https://github.com/jesusarl" className="hover:underline mr-4 md:mr-6">Jesús</a>
                    </li>
                    <li>
                        <a href="https://github.com/daniperdomo" className="hover:underline mr-4 md:mr-6">Daniel</a>
                    </li>
                    <li>
                        <a href="https://github.com/santiagoriverao" className="hover:underline mr-4 md:mr-6">Santiago</a>
                    </li>
                    <li>
                        <a href="https://github.com/emiliofalconi" className="hover:underline mr-4 md:mr-6">Emilio</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
