
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = "404 Halaman Tidak Ditemukan - TernoAE";
  }, []);

  return (
    <div className="min-h-screen bg-soft-cream flex flex-col justify-center items-center text-center px-4 py-10">
      <img 
        src="https://picsum.photos/seed/404errorAE/400/300" 
        alt="Visual representing a lost page or error" 
        className="w-64 sm:w-80 h-auto mb-8 rounded-xl border-2 border-ternoae-green shadow-[6px_6px_0px_#0C4A1F]" 
      />
      <h1 className="text-6xl sm:text-7xl font-extrabold text-ternoae-green mb-4 drop-shadow-[3px_3px_0px_#FFD700]">404</h1>
      <h2 className="text-3xl font-bold text-text-main mb-6">Oops! Halaman Tidak Ditemukan.</h2>
      <p className="text-gray-700 mb-8 max-w-md text-lg">
        Maaf, halaman yang Anda cari sepertinya tidak ada atau mungkin sudah dipindahkan.
        Jangan khawatir, Anda bisa kembali ke beranda.
      </p>
      <Link
        to="/"
        className="inline-block bg-ternoae-yellow text-ternoae-green font-bold px-8 py-3 rounded-lg text-lg border-2 border-ternoae-green 
                   shadow-[4px_4px_0px_#0C4A1F] hover:shadow-[6px_6px_0px_#0C4A1F] active:shadow-[2px_2px_0px_#0C4A1F]
                   hover:bg-yellow-400 active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFoundPage;