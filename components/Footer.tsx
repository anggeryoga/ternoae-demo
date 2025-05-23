
import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, TERNOAE_YELLOW, COMPANY_EMAIL, COMPANY_PHONE_DISPLAY, TERNOAE_WHATSAPP_NUMBER } from '../constants';
import { WhatsAppIcon, MailIcon, PhoneIcon } from './icons/AppIcons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ternoae-green text-soft-cream py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-3xl font-extrabold text-ternoae-yellow">
              Terno<span className="text-soft-cream">AE</span>
            </h3>
            <p className="mt-2 text-sm text-gray-300">Ojek online lokal Jepara, solusi transportasi hemat dan terpercaya.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-soft-cream mb-4">Navigasi Cepat</h4>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0,4).map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-ternoae-yellow transition-colors duration-200 text-sm font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-soft-cream mb-4">Informasi</h4>
             <ul className="space-y-2">
              {NAV_LINKS.slice(4).map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-ternoae-yellow transition-colors duration-200 text-sm font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-soft-cream mb-4">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <WhatsAppIcon className="w-5 h-5 mr-3 text-ternoae-yellow flex-shrink-0" /> 
                <a href={`https://wa.me/${TERNOAE_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-ternoae-yellow transition-colors duration-200 font-medium">
                  WhatsApp Kami
                </a>
              </li>
              <li className="flex items-center">
                <MailIcon className="w-5 h-5 mr-3 text-ternoae-yellow flex-shrink-0" /> 
                <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-ternoae-yellow transition-colors duration-200 font-medium">
                  {COMPANY_EMAIL}
                </a>
              </li>
               <li className="flex items-center">
                <PhoneIcon className="w-5 h-5 mr-3 text-ternoae-yellow flex-shrink-0" /> 
                <span className="font-medium">{COMPANY_PHONE_DISPLAY}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-ternoae-green-light/50 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} TernoAE Jepara. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;