'use client'
import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import Wrapper from './Wrapper';
import Image from 'next/image';
import { LuMail, LuPhone } from 'react-icons/lu';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleClick = useCallback(() => setIsMenuOpen(prev => !prev), [])
    const menuClick = useCallback(() => {
        setIsMenuOpen(false)
    }, [])

    return (
        <>
        {/* Top Header with Email and Phone */ }
        < div className = "w-full bg-yellow-600 py-2" >
            <section className='md:max-w-screen-xl max-w-screen-lg mx-auto lg:px-0 px-2'>
                <div className='flex justify-between items-center text-white text-medium'>
                    <div className='flex gap-4'>
                        <LuMail size={22} />
                        <a href='mailto:mail@umsc.in' className='hover:underline'>mail@umsc.in</a>
                    </div>
                    <div className='flex gap-4'>
                        <LuPhone size={22} />
                        <a href='tel:9090939321' className='hover:underline'>+91 9090939321</a>
                    </div>
                </div>
            </section>
    </div >

        <header className='w-full bg-[#f0b827] py-2  sticky top-0 left-0 right-0 z-50 '>
            <section className='md:max-w-screen-xl max-w-screen-lg  mx-auto py-2 lg:px-0 px-2'>
                <div className='flex justify-between items-center'>
                    <Link href='/'>
                        {/* <h1 className='text-2xl'>Universal<span className=' text-[var(--maincolor)]'>X</span></h1> */}
                        <Image
                            src="/logo.jpg"
                            width={250}
                            height={100}
                            alt="logo"
                            className='text-2xl'
                        />
                    </Link>
                    <nav className='md:flex hidden '>
                        <ul className='flex items-center justify-evenly text-lg font-semibold gap-16'>
                            <Link href="/" className='text-white hover:underline' ><li>Home </li></Link>
                            <Link href="/about" className='text-white hover:underline' ><li>About </li></Link>
                            <Link href="/product" className='text-white hover:underline' ><li>Product </li></Link>
                            <Link href="/contact" className='text-white hover:underline' ><li>Contact </li></Link>
                        </ul>
                    </nav>

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
        </header>
        </>

    )
}