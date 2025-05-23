
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS_DATA } from '../constants';
import type { BlogPost } from '../types';
import { RssIcon, SearchIcon, ChevronLeftIcon, ChevronRightIcon } from '../components/icons/AppIcons';

const ITEMS_PER_PAGE = 6;

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = "Blog - TernoAE Jepara";
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS_DATA.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  const paginationButtonClass = (isActive = false, isDisabled = false) =>
    `px-4 py-2 rounded-lg border-2 border-ternoae-green font-semibold text-sm transition-all duration-150
     ${isDisabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300' 
                 : isActive ? 'bg-ternoae-green text-ternoae-yellow shadow-[2px_2px_0px_#FFD700]' 
                            : 'bg-white text-ternoae-green hover:bg-ternoae-yellow/50 active:bg-ternoae-yellow/70 shadow-neo-sm hover:shadow-neo-md'}`;


  return (
    <div className="bg-soft-cream min-h-screen">
      <div className="bg-ternoae-green py-20 text-soft-cream text-center border-b-2 border-ternoae-yellow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <RssIcon className="w-16 h-16 text-ternoae-yellow mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Blog TernoAE</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Informasi terkini, tips, dan cerita menarik seputar layanan TernoAE dan Jepara.
          </p>
        </div>
      </div>

      <div className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari artikel berdasarkan judul, isi, atau penulis..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-5 py-3 pr-12 border-2 border-ternoae-green rounded-lg shadow-sm 
                           focus:ring-2 focus:ring-ternoae-yellow focus:border-ternoae-green transition-colors
                           bg-white text-text-main placeholder-gray-400"
              />
              <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-ternoae-green" />
            </div>
          </div>

          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post: BlogPost) => (
                <Link 
                    key={post.id} 
                    to={`/blog/${post.slug}`} // This link will currently lead to 404 as individual post pages are not implemented
                    className="block bg-white rounded-xl border-2 border-ternoae-green 
                               shadow-[4px_4px_0px_#0C4A1F] hover:shadow-[6px_6px_0px_#0C4A1F] 
                               transition-all duration-200 group overflow-hidden hover:-translate-y-1"
                >
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-56 object-cover border-b-2 border-ternoae-green transition-transform duration-300 group-hover:scale-105" 
                    loading="lazy"
                  />
                  <div className="p-6">
                    <p className="text-xs text-gray-500 mb-1 uppercase font-semibold tracking-wider">{post.date} - oleh {post.author}</p>
                    <h3 className="text-xl font-bold text-ternoae-green mb-2 group-hover:text-ternoae-green-light transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-text-main text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <span className="inline-block bg-ternoae-yellow text-ternoae-green font-bold px-4 py-2 rounded-md text-sm border border-ternoae-green group-hover:bg-yellow-400 transition-colors">
                        Baca Selengkapnya &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 py-10 bg-white border-2 border-ternoae-green rounded-xl shadow-neo">
                <RssIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl font-semibold">Tidak ada artikel ditemukan.</p>
                <p className="text-sm">Coba kata kunci lain atau lihat semua artikel.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center space-x-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={paginationButtonClass(false, currentPage === 1)}
                aria-label="Halaman sebelumnya"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                 (pageNumber === 1 || pageNumber === totalPages || Math.abs(pageNumber - currentPage) < 2 || (currentPage < 3 && pageNumber < 4) || (currentPage > totalPages - 2 && pageNumber > totalPages - 3)) ? (
                    <button
                        key={pageNumber}
                        onClick={() => goToPage(pageNumber)}
                        className={paginationButtonClass(currentPage === pageNumber)}
                        aria-current={currentPage === pageNumber ? "page" : undefined}
                        aria-label={`Ke halaman ${pageNumber}`}
                    >
                        {pageNumber}
                    </button>
                 ) : (pageNumber === 2 && currentPage > 3 && totalPages > 4) || (pageNumber === totalPages - 1 && currentPage < totalPages - 2 && totalPages > 4) ? (
                    <span key={pageNumber} className="px-2 py-2 text-gray-500 font-semibold">...</span>
                 ) : null
              ))}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={paginationButtonClass(false, currentPage === totalPages)}
                aria-label="Halaman berikutnya"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
