'use client'
import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import Wrapper from './Wrapper';
import Image from 'next/image';
import { LuMail, LuPhone } from 'react-icons/lu';
import { FaPhoneAlt, FaSearch } from 'react-icons/fa';
import { IoChatbubbleOutline } from 'react-icons/io5';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleClick = useCallback(() => setIsMenuOpen(prev => !prev), [])
    const menuClick = useCallback(() => {
        setIsMenuOpen(false)
    }, [])

    return (
        <>
            <header className='w-full bg-[#fff] sticky top-0 left-0 right-0 z-50 '>
                <section className='md:max-w-screen-xl max-w-screen-lg  mx-auto py-2 lg:px-0 px-2'>
                    <div className='flex justify-between items-center'>
                        <Link href='/'>
                            {/* <h1 className='text-2xl'>Universal<span className=' text-[var(--maincolor)]'>X</span></h1> */}
                            <Image
                                src="/logo.jpg"
                                width={350}
                                height={100}
                                alt="logo"
                                className='text-2xl'
                            />
                        </Link>
                        {/* Search Bar */}
                        <div className="relative w-96 hidden md:block">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>

                        {/* Contact & Quote Button */}
                        <div className="flex items-center space-x-6">

                            {/* Call Icon with Number */}
                            <div className="flex items-center space-x-2">
                                <FaPhoneAlt className="text-gray-700" />
                                <a href='tel:9090939321' className='hover:underline text-black font-medium'>+91 9090939321</a>
                            </div>
                        </div>
                        {/* Get Quote Button */}
                        <Link href="/quote">
                            <button className="bg-yellow-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-yellow-600 transition">
                                <IoChatbubbleOutline />
                                <span>Get Quote</span>
                            </button>
                        </Link>
                        {/* Mobile navbar */}
                        <nav className='md:hidden'>
                            <button onClick={handleClick}>{isMenuOpen ? <RxCross2 size={35} /> : <RxHamburgerMenu size={35} />}</button>
                        </nav>
                    </div>
                </section>
                {isMenuOpen && (
                    <div className='absolute w-full bg-white  '>
                        <Wrapper className='py-4'>
                            <ul className='flex flex-col text-lg gap-5'>
                                <Link className='hover:underline hover:text-[var(--maincolor)]' onClick={menuClick} href="/" ><li>Home </li></Link>
                                <Link className='hover:underline hover:text-[var(--maincolor)]' onClick={menuClick} href="/about" ><li>About </li></Link>
                                <Link className='hover:underline hover:text-[var(--maincolor)]' onClick={menuClick} href="/product" ><li>Product </li></Link>
                                <Link className='hover:underline hover:text-[var(--maincolor)]' onClick={menuClick} href="/contact" ><li>Contact </li></Link>
                            </ul>
                        </Wrapper>
                    </div>
                )
                }
                {/* Header with Email and Phone */}
                < div className="w-full bg-[#f0b827] py-2 " >
                    <section className='md:max-w-screen-xl max-w-screen-lg mx-auto lg:px-0 px-2'>
                        <nav className='md:flex hidden flex justify-center'>
                            <ul className='flex items-center justify-evenly text-lg font-semibold gap-16'>
                                <Link href="/" className='text-white hover:underline' ><li>Home </li></Link>
                                <Link href="/about" className='text-white hover:underline' ><li>About </li></Link>
                                <Link href="/product" className='text-white hover:underline' ><li>Product </li></Link>
                                <Link href="/contact" className='text-white hover:underline' ><li>Contact </li></Link>
                            </ul>
                        </nav>
                    </section>
                </div >
            </header>
        </>

    )
}