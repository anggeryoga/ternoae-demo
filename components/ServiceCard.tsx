
import React from 'react';
import { Link } from 'react-router-dom';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = service.icon;
  return (
    <div className="bg-white p-6 rounded-xl border-2 border-ternoae-green 
                   shadow-[4px_4px_0px_#0C4A1F] hover:shadow-[6px_6px_0px_#0C4A1F] 
                   transition-all duration-200 flex flex-col items-center text-center h-full">
      <div className="p-4 bg-ternoae-yellow rounded-full mb-4 border-2 border-ternoae-green">
        <IconComponent className="w-10 h-10 text-ternoae-green" />
      </div>
      <h3 className="text-xl font-bold text-ternoae-green mb-2">{service.name}</h3>
      <p className="text-text-main text-sm mb-4 flex-grow">{service.description}</p>
      <Link 
        to={`/layanan#${service.id}`}
        className="mt-auto inline-block bg-ternoae-green text-ternoae-yellow font-semibold px-6 py-2 rounded-lg border-2 border-ternoae-green
                   shadow-[2px_2px_0px_#FFD700] hover:shadow-[3px_3px_0px_#FFD700] active:shadow-[1px_1px_0px_#FFD700]
                   hover:bg-ternoae-green-light active:translate-x-[1px] active:translate-y-[1px] transition-all duration-150"
      >
        Selengkapnya
      </Link>
    </div>
  );
};

export default ServiceCard;