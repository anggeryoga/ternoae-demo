
import React, { useState, useEffect } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { NAV_LINKS, TERNOAE_YELLOW, TERNOAE_GREEN } from '../constants'; // Adjusted imports
import { MenuIcon, CloseIcon } from './icons/AppIcons';
import type { NavItem } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinkClasses = `px-4 py-2 rounded-lg text-sm font-semibold border-2 border-transparent transition-all duration-200`;
  const activeNavLinkClasses = `bg-ternoae-yellow text-ternoae-green border-ternoae-green shadow-neo-sm`;
  const inactiveNavLinkClassesScrolled = `text-text-main hover:text-ternoae-green hover:border-ternoae-green hover:bg-ternoae-yellow/50`;
  const inactiveNavLinkClassesTop = `text-text-main md:text-soft-cream hover:text-ternoae-green hover:border-ternoae-green hover:bg-ternoae-yellow/80`;


  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ease-in-out 
      ${isScrolled ? 'bg-soft-cream border-b-2 border-ternoae-green shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className={`text-3xl font-extrabold tracking-tight ${isScrolled ? 'text-ternoae-green' : 'text-ternoae-green md:text-soft-cream'}`}>
              Terno<span className={`text-ternoae-yellow ${isScrolled ? 'drop-shadow-[2px_2px_0px_#0C4A1F]' : 'drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)] md:drop-shadow-[2px_2px_0px_#0C4A1F]'}`}>AE</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {NAV_LINKS.map((item: NavItem) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) => 
                    `${navLinkClasses} ${isActive ? activeNavLinkClasses : (isScrolled ? inactiveNavLinkClassesScrolled : inactiveNavLinkClassesTop)}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-lg border-2 
              ${isScrolled ? 'text-ternoae-green border-ternoae-green hover:bg-ternoae-yellow/50' : 'text-ternoae-green md:text-soft-cream border-ternoae-green md:border-soft-cream hover:bg-ternoae-yellow/80 hover:text-ternoae-green hover:border-ternoae-green'} 
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ternoae-yellow transition-all`}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-soft-cream border-t-2 border-ternoae-green shadow-lg` } id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {NAV_LINKS.map((item: NavItem) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-lg text-base font-semibold border-2 border-transparent
                ${isActive ? `bg-ternoae-yellow text-ternoae-green border-ternoae-green shadow-neo-sm` : `text-text-main hover:text-ternoae-green hover:bg-ternoae-yellow/50 hover:border-ternoae-green`}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;