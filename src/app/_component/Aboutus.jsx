import React from 'react'
import Wrapper from './Wrapper'
import Image from 'next/image'
import Link from 'next/link'

export default function Aboutus({ activepage = "product" }) {
    return (
        <>
            <Wrapper>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <section>
                        <h1 className='text-4xl md:text-5xl pb-4'>About Us</h1>
                        <p>Welcome to MechX, a trusted leader in the road construction machinery industry. With a passion for innovation and a commitment to excellence, we specialize in delivering top-quality machinery that empowers the construction sector to build the roads of tomorrow.Founded with a vision to revolutionize the road construction sector, [Your Company Name] has grown into a leading provider of innovative machinery solutions. From humble beginnings, we’ve expanded our operations to serve clients across the globe. Our journey is driven by a passion for excellence and a commitment to supporting the construction industry with reliable, efficient, and sustainable equipment.<br />
                            At MechX, we bring decades of experience to the road construction machinery market. Our team is dedicated to understanding the unique needs of contractors, engineers, and construction companies, ensuring we provide cutting-edge solutions that enhance productivity, efficiency, and sustainability.</p>
                        {activepage === "home" && (<button className='mt-8'><Link href="/about" className=' py-3 px-8 text-white bg-[#f0b827] rounded-lg' >View More</Link></button>)}

                    </section>
                    <section className='relative'>
                        <Image alt='about image' height={400} width={600} src='/cm.png' />
                        <div className='p-8 absolute bg-[#f0b827] rounded-lg text-white text-xl left-2 bottom-[-80px] flex lg:flex md:hidden lg:bottom-2 lg:left-[-80px]'>
                            15+ Years <br />Experience
                        </div>
                    </section>
                </div>

            </Wrapper>
        </>
    )
}
