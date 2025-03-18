'use client';

import React, { useCallback, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';
import Wrapper from './Wrapper';
import Image from 'next/image';
import { FaPhoneAlt, FaSearch } from 'react-icons/fa';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { searchProducts } from '@/Api';
import { useCustomDebounce } from '@/hooks/useCustomDebounce';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const searchInputRef = useRef(null);
    const searchResultsRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();

    const debouncedSearchQuery = useCustomDebounce(searchQuery, 300);

    const handleClick = useCallback(() => {
        setIsMenuOpen(prev => !prev);
        if (showMobileSearch) setShowMobileSearch(false);
    }, [showMobileSearch]);

    const menuClick = useCallback((path) => {
        router.push(path);
        setIsMenuOpen(false);
        setShowMobileSearch(false);
    }, [router]);

    const toggleMobileSearch = useCallback(() => {
        setShowMobileSearch(prev => !prev);
        if (isMenuOpen) setIsMenuOpen(false);

        if (!showMobileSearch) {
            setTimeout(() => {
                const mobileSearchInput = document.getElementById('mobileSearchInput');
                if (mobileSearchInput) mobileSearchInput.focus();
            }, 100);
        }
    }, [isMenuOpen, showMobileSearch]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value.trim() !== '') {
            setShowSearchResults(true);
        } else {
            setShowSearchResults(false);
            setSearchResults([]);
        }
    };

    const handleSearchResultClick = (slug) => {
        if (isNavigating || isLoading) return;

        setIsLoading(true);
        setIsNavigating(true);
        console.log('Starting navigation to product:', slug);

        // Clear UI state
        setSearchQuery('');
        setShowSearchResults(false);
        setSearchResults([]);
        setShowMobileSearch(false);

        try {
            // Force a hard navigation instead
            window.location.href = `/product/${slug}`;
        } catch (error) {
            console.error('Navigation error:', error);
            // Ensure we reset states even on error
            setIsLoading(false);
            setIsNavigating(false);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setShowSearchResults(false);
        setSearchResults([]);
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (debouncedSearchQuery.trim() !== '') {
                try {
                    const results = await searchProducts(debouncedSearchQuery);
                    setSearchResults(results);
                    setShowSearchResults(true);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            } else {
                setSearchResults([]);
                setShowSearchResults(false);
            }
        };

        fetchSearchResults();
    }, [debouncedSearchQuery]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchInputRef.current &&
                !searchInputRef.current.contains(event.target) &&
                searchResultsRef.current &&
                !searchResultsRef.current.contains(event.target)
            ) {
                setShowSearchResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setShowSearchResults(false);
        setIsMenuOpen(false);
        setShowMobileSearch(false);
        setIsNavigating(false);
        setIsLoading(false);
    }, [pathname]);

    const SearchResults = ({ results, isMobile = false }) => {
        if (!showSearchResults || results.length === 0) return null;

        return (
            <div
                className={`absolute top-full left-0 right-0 bg-white mt-1 rounded-md shadow-lg z-50 ${isMobile ? 'max-h-64' : 'max-h-96'} overflow-y-auto`}
                ref={searchResultsRef}
            >
                <ul className="divide-y divide-gray-100">
                    {results.map((result, index) => (
                        <li
                            key={index}
                            onClick={() => handleSearchResultClick(result.slug)}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer active:bg-gray-100"
                        >
                            {result.image && (
                                <div className={`${isMobile ? 'h-10 w-10' : 'h-12 w-12'} flex-shrink-0`}>
                                    <Image
                                        src={result.image}
                                        alt={result.title}
                                        width={isMobile ? 40 : 48}
                                        height={isMobile ? 40 : 48}
                                        className="h-full w-full object-cover rounded"
                                    />
                                </div>
                            )}
                            <div>
                                <h4 className={`font-medium text-gray-900 ${isMobile ? 'text-sm' : ''}`}>{result.title}</h4>
                                {result.category && (
                                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500`}>{result.category}</p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
      <>
        <header className="w-full bg-white sticky top-0 left-0 right-0 z-50 shadow-sm">
          <section className="md:max-w-screen-xl max-w-screen-lg mx-auto py-2 lg:px-0 px-4">
            <div className="flex justify-between items-center">
              <Link href="/" onClick={() => menuClick("/")}>
                <div className="h-14 md:h-16">
                  <Image
                    src="/logo.jpg"
                    width={200}
                    height={60}
                    alt="logo"
                    className="h-full w-auto object-contain"
                    priority
                  />
                </div>
              </Link>

              <div
                className="relative md:w-96 w-0 hidden md:block"
                ref={searchInputRef}
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0b827]"
                />
                {searchQuery ? (
                  <button
                    onClick={clearSearch}
                    className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <RxCross2 size={18} />
                  </button>
                ) : null}
                <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                {showSearchResults && <SearchResults results={searchResults} />}
              </div>

              <div className="flex items-center space-x-4 md:space-x-6">
                <div className="hidden md:flex items-center space-x-2">
                  <FaPhoneAlt className="text-[#f0b827]" />
                  <a
                    href="tel:9090939321"
                    className="hover:underline text-black font-medium"
                  >
                    +91 9090939321
                  </a>
                </div>
                <Link href="/contact" onClick={() => menuClick("/contact")}>
                  <button className="hover:bg-[#f0b827] text-white px-3 py-2 rounded-full flex items-center space-x-2 bg-[#1785c1] transition">
                    <IoChatbubbleOutline />
                    <span className="hidden sm:inline">Get Quote</span>
                  </button>
                </Link>
                <button
                  onClick={toggleMobileSearch}
                  className="md:hidden text-[#f0b827] hover:text-[#e0a818]"
                >
                  {showMobileSearch ? (
                    <RxCross2 size={25} />
                  ) : (
                    <FaSearch size={20} />
                  )}
                </button>
                <button
                  onClick={handleClick}
                  className="md:hidden text-[#f0b827] hover:text-[#e0a818]"
                >
                  {isMenuOpen ? (
                    <RxCross2 size={25} />
                  ) : (
                    <RxHamburgerMenu size={25} />
                  )}
                </button>
              </div>
            </div>

            {showMobileSearch && (
              <div className="mt-3 pb-3 md:hidden relative">
                <div className="relative">
                  <input
                    id="mobileSearchInput"
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0b827]"
                  />
                  {searchQuery ? (
                    <button
                      onClick={clearSearch}
                      className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <RxCross2 size={18} />
                    </button>
                  ) : null}
                  <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <SearchResults results={searchResults} isMobile={true} />
              </div>
            )}
          </section>

          {isMenuOpen && (
            <div className="absolute w-full bg-white shadow-md z-50">
              <Wrapper className="py-4">
                <ul className="flex flex-col text-lg gap-5">
                  <li
                    onClick={() => menuClick("/")}
                    className="hover:underline hover:text-[#1785c1]"
                  >
                    Home
                  </li>
                  <li
                    onClick={() => menuClick("/about")}
                    className="hover:underline  hover:text-[#1785c1]"
                  >
                    About
                  </li>
                  <li
                    onClick={() => menuClick("/product")}
                    className="hover:underline hover:text-[#1785c1]"
                  >
                    Product
                  </li>
                  <li
                    onClick={() => menuClick("/contact")}
                    className="hover:underline hover:text-[#1785c1]"
                  >
                    Contact
                  </li>
                  <li>
                    <a
                      href="tel:9090939321"
                      className="hover:underline hover:text-[#1785c1] flex items-center gap-2"
                    >
                      <FaPhoneAlt size={14} />
                      +91 9090939321
                    </a>
                  </li>
                </ul>
              </Wrapper>
            </div>
          )}

          <div className="w-full bg-[#f0b827] md:py-2">
            <section className="md:max-w-screen-xl max-w-screen-lg mx-auto lg:px-0 px-2">
              <nav className="md:flex hidden justify-center">
                <ul className="flex items-center justify-evenly text-lg font-semibold gap-8 lg:gap-16">
                  <Link
                    href="/"
                    className="text-white hover:underline hover:text-[#1785c1]"
                  >
                    <li>Home</li>
                  </Link>
                  <Link
                    href="/about"
                    className="text-white hover:underline hover:text-[#1785c1]"
                  >
                    <li>About</li>
                  </Link>
                  <Link
                    href="/product"
                    className="text-white hover:underline hover:text-[#1785c1]"
                  >
                    <li>Product</li>
                  </Link>
                  <Link
                    href="/contact"
                    className="text-white hover:underline hover:text-[#1785c1]"
                  >
                    <li>Contact</li>
                  </Link>
                </ul>
              </nav>
            </section>
          </div>
        </header>

        {/* Overlay when loading */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#f0b827] mx-auto"></div>
              <p className="mt-2 text-sm text-gray-700">Loading product...</p>
            </div>
          </div>
        )}
      </>
    );
}