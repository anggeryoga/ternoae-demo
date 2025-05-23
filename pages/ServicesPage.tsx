
import React, { useEffect } from 'react';
import { SERVICES_DATA, WHATSAPP_BASE_URL, TERNOAE_WHATSAPP_NUMBER, DEFAULT_WHATSAPP_MESSAGE } from '../constants';
import type { Service } from '../types';

const ServicesPage: React.FC = () => {
  useEffect(() => {
    document.title = "Layanan Kami - TernoAE Jepara";
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, []);

  const whatsappLink = `${WHATSAPP_BASE_URL}${TERNOAE_WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`;

  return (
    <div className="bg-soft-cream min-h-screen">
      <div className="bg-ternoae-green py-20 text-soft-cream text-center border-b-2 border-ternoae-yellow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Layanan Unggulan TernoAE</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Kami hadir untuk memenuhi berbagai kebutuhan transportasi dan pengiriman Anda di Jepara dengan layanan terbaik.
          </p>
        </div>
      </div>

      <div className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {SERVICES_DATA.map((service: Service, index: number) => {
            const IconComponent = service.icon;
            return (
              <section 
                id={service.id} 
                key={service.id} 
                className={`mb-16 p-6 md:p-8 rounded-xl shadow-[4px_4px_0px_#0C4A1F] hover:shadow-[6px_6px_0px_#0C4A1F] 
                           bg-white border-2 border-ternoae-green transition-all duration-300 
                           flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}
              >
                <div className="lg:w-2/5">
                  <img 
                    src={service.image || `https://picsum.photos/seed/${service.id}/600/400`} 
                    alt={service.name} 
                    className="rounded-lg border-2 border-ternoae-green shadow-[3px_3px_0px_#0C4A1F] w-full h-auto object-cover max-h-96"
                    loading="lazy"
                  />
                </div>
                <div className="lg:w-3/5">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-ternoae-yellow rounded-full mr-4 border-2 border-ternoae-green shadow-neo-sm">
                      <IconComponent className="w-8 h-8 text-ternoae-green" />
                    </div>
                    <h2 className="text-3xl font-bold text-ternoae-green">{service.name}</h2>
                  </div>
                  <p className="text-text-main leading-relaxed mb-6">{service.longDescription}</p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-ternoae-yellow text-ternoae-green font-bold px-8 py-3 rounded-lg text-md border-2 border-ternoae-green 
                               shadow-[3px_3px_0px_#0C4A1F] hover:shadow-[4px_4px_0px_#0C4A1F] active:shadow-[1px_1px_0px_#0C4A1F]
                               hover:bg-yellow-400 active:translate-x-[1px] active:translate-y-[1px] transition-all duration-150"
                  >
                    Pesan {service.name}
                  </a>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <section className="py-16 sm:py-20 bg-ternoae-yellow border-y-2 border-ternoae-green">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-ternoae-green mb-6">Butuh Bantuan Cepat?</h2>
          <p className="text-lg text-ternoae-green opacity-90 mb-8 max-w-xl mx-auto">
            Apapun kebutuhanmu, TernoAE siap melayani. Pesan sekarang juga!
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-ternoae-green text-ternoae-yellow font-bold px-10 py-4 rounded-lg text-lg border-2 border-ternoae-green 
                       shadow-[4px_4px_0px_#0A3B19] hover:shadow-[6px_6px_0px_#0A3B19] active:shadow-[2px_2px_0px_#0A3B19]
                       hover:bg-ternoae-green-light active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150"
            // Using a slightly darker green for shadow on yellow bg: #0A3B19
          >
            Hubungi Kami via WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;