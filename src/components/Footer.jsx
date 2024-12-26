import React from 'react';

const Footer = () => {
    return (
        

        <footer className="bg-white shadow m-0 w-full dark:bg-[#00003EE8]">
            <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span class="text-sm text-white sm:text-center dark:text-white">© 2024 <a href="https://www.ucab.edu.ve/" class="hover:underline">UCAB</a>. All Rights Reserved.
            </span>
            <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-white sm:mt-0">
                <li>
                    <a href="https://github.com/jesusarl" class="hover:underline me-4 md:me-6">Jesús</a>
                </li>
                <li>
                    <a href="https://github.com/daniperdomo" class="hover:underline me-4 md:me-6">Daniel</a>
                </li>
                <li>
                    <a href="https://github.com/santiagoriverao" class="hover:underline me-4 md:me-6">Santigo</a>
                </li>
                <li>
                    <a href="https://github.com/emiliofalconi" class="hover:underline me-4 md:me-6">Emilio</a>
                </li>
            </ul>
            </div>
        </footer>

    );
};

export default Footer;