
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA, TESTIMONIALS_DATA, HOW_IT_WORKS_STEPS, WHATSAPP_BASE_URL, TERNOAE_WHATSAPP_NUMBER, DEFAULT_WHATSAPP_MESSAGE, CheckCircleIcon } from '../constants';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '../components/icons/AppIcons'; 
import type { Service, Testimonial } from '../types';

const HeroSection: React.FC = () => {
  const whatsappLink = `${WHATSAPP_BASE_URL}${TERNOAE_WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`;
  return (
    <div className="relative bg-soft-cream text-text-main py-24 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230C4A1F' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}>
      </div>
      <div className="relative z-10 container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-ternoae-green leading-tight">
          Ojol murah? <span className="text-ternoae-yellow drop-shadow-[3px_3px_0px_#0C4A1F]">TernoAE</span> ajah~
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-700">
          Solusi transportasi andalan di Jepara. Cepat, aman, dan ramah di kantong!
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-ternoae-yellow text-ternoae-green font-bold px-10 py-4 rounded-lg text-lg border-2 border-ternoae-green 
                     shadow-[4px_4px_0px_#0C4A1F] hover:shadow-[6px_6px_0px_#0C4A1F] active:shadow-[2px_2px_0px_#0C4A1F]
                     hover:bg-yellow-400 active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150"
        >
          Pesan Sekarang
        </a>
      </div>
    </div>
  );
};

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? TESTIMONIALS_DATA.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  },[currentIndex]);

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === TESTIMONIALS_DATA.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  },[currentIndex]);
  
  useEffect(() => {
    const timer = setTimeout(nextSlide, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, nextSlide]);


  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-xl border-2 border-ternoae-green shadow-[4px_4px_0px_#0C4A1F]">
        <div 
          className="flex transition-transform duration-500 ease-in-out bg-white" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {TESTIMONIALS_DATA.map((testimonial: Testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 p-4 md:p-0"> {/* Adjusted padding for card */}
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
      <button 
        onClick={prevSlide} 
        className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 bg-ternoae-green text-ternoae-yellow p-2 rounded-full border-2 border-ternoae-yellow 
                   shadow-[2px_2px_0px_#FFD700] hover:shadow-[3px_3px_0px_#FFD700] active:shadow-[1px_1px_0px_#FFD700]
                   hover:bg-ternoae-green-light active:translate-x-[1px] active:translate-y-[1px] transition-all duration-150 z-10"
        aria-label="Previous testimonial"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 bg-ternoae-green text-ternoae-yellow p-2 rounded-full border-2 border-ternoae-yellow 
                   shadow-[2px_2px_0px_#FFD700] hover:shadow-[3px_3px_0px_#FFD700] active:shadow-[1px_1px_0px_#FFD700]
                   hover:bg-ternoae-green-light active:translate-x-[1px] active:translate-y-[1px] transition-all duration-150 z-10"
        aria-label="Next testimonial"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
      <div className="flex justify-center mt-6 space-x-2">
        {TESTIMONIALS_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full border-2 border-ternoae-green transition-colors duration-150
                        ${currentIndex === index ? 'bg-ternoae-green' : 'bg-soft-cream hover:bg-ternoae-yellow/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};


const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "TernoAE - Ojek Online Murah dan Cepat di Jepara";
  }, []);

  return (
    <div className="bg-soft-cream">
      <HeroSection />

      <section className="py-16 sm:py-20 bg-white border-y-2 border-ternoae-green">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-ternoae-green mb-4">Layanan Kami</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            TernoAE menyediakan berbagai layanan untuk kemudahan aktivitasmu di Jepara.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES_DATA.map((service: Service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-soft-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-ternoae-green text-center mb-12">Kenapa Pilih TernoAE?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { title: "Harga Termurah", description: "Nikmati layanan ojek online dengan tarif paling bersahabat di Jepara. Hemat tanpa kompromi kualitas!", icon: StarIcon },
              { title: "Pemesanan via WA", description: "Pesan layanan TernoAE makin mudah dan cepat langsung dari aplikasi WhatsApp Anda. Praktis!", icon: CheckCircleIcon },
              { title: "Driver Ramah", description: "Driver kami tidak hanya profesional tapi juga ramah dan sopan. Perjalanan jadi lebih nyaman.", icon: StarIcon }
            ].map(feature => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="p-6 bg-white rounded-xl border-2 border-ternoae-green shadow-[4px_4px_0px_#0C4A1F]">
                  <div className="inline-block p-3 bg-ternoae-yellow rounded-full border-2 border-ternoae-green mb-4">
                    <Icon className="w-8 h-8 text-ternoae-green" />
                  </div>
                  <h3 className="text-xl font-bold text-ternoae-green mb-2">{feature.title}</h3>
                  <p className="text-text-main text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white border-y-2 border-ternoae-green">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-ternoae-green mb-4">Kata Mereka Tentang TernoAE</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            Kepuasan pelanggan adalah prioritas kami. Lihat apa kata mereka yang sudah menggunakan layanan TernoAE.
          </p>
          <TestimonialCarousel />
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-soft-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-ternoae-green mb-12">Cara Pesan TernoAE</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="bg-ternoae-yellow p-4 rounded-full border-2 border-ternoae-green text-ternoae-green shadow-[3px_3px_0px_#0C4A1F]">
                      <Icon className="w-10 h-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-ternoae-green text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-ternoae-green mb-1">{step.title}</h3>
                  <p className="text-text-main text-sm">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-ternoae-yellow border-y-2 border-ternoae-green">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-ternoae-green mb-6">Siap Menjelajah Jepara Bersama TernoAE?</h2>
          <p className="text-lg text-ternoae-green opacity-90 mb-8 max-w-xl mx-auto">
            Jangan tunda lagi, pesan layanan TernoAE sekarang dan nikmati kemudahan transportasi di ujung jari Anda!
          </p>
          <a
            href={`${WHATSAPP_BASE_URL}${TERNOAE_WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-ternoae-green text-ternoae-yellow font-bold px-10 py-4 rounded-lg text-lg border-2 border-ternoae-green 
                       shadow-[4px_4px_0px_#0A3B19] hover:shadow-[6px_6px_0px_#0A3B19] active:shadow-[2px_2px_0px_#0A3B19]
                       hover:bg-ternoae-green-light active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150"
            // Using a slightly darker green for shadow on yellow bg: #0A3B19
          >
            Pesan via WhatsApp Sekarang
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;