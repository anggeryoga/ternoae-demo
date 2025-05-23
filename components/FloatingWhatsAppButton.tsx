
import React from 'react';
import { TERNOAE_WHATSAPP_NUMBER, DEFAULT_WHATSAPP_MESSAGE, WHATSAPP_BASE_URL } from '../constants';
import { WhatsAppIcon } from './icons/AppIcons';

const FloatingWhatsAppButton: React.FC = () => {
  const encodedMessage = encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE);
  const whatsappLink = `${WHATSAPP_BASE_URL}${TERNOAE_WHATSAPP_NUMBER}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-ternoae-yellow text-ternoae-green p-3 rounded-full border-2 border-ternoae-green 
                 shadow-[3px_3px_0px_#0C4A1F] hover:shadow-[4px_4px_0px_#0C4A1F] active:shadow-[1px_1px_0px_#0C4A1F] 
                 hover:scale-105 active:scale-95 active:translate-x-[1px] active:translate-y-[1px]
                 transition-all duration-150 ease-in-out z-40 flex items-center group"
      aria-label="Chat di WhatsApp"
    >
      <WhatsAppIcon className="w-7 h-7" />
      <span 
        className="ml-0 max-w-0 opacity-0 group-hover:ml-2 group-hover:max-w-xs group-hover:opacity-100 
                   transition-all duration-300 ease-in-out font-semibold text-sm"
      >
        Pesan Sekarang
      </span>
    </a>
  );
};

export default FloatingWhatsAppButton;