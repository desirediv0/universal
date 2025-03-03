import React from 'react'
import Wrapper from './Wrapper'
import Image from 'next/image'
import Link from 'next/link'

export default function Aboutus({ activepage = "product" }) {
    return (
      <>
        <Wrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <h1 className="text-4xl md:text-5xl pb-4">About Us</h1>
              <p>
                At Universal Machines, we are dedicated to revolutionizing the
                construction and road maintenance industry by providing
                state-of-the-art soil stabilization and road reclamation
                solutions. Our commitment to innovation, durability, and
                efficiency drives us to engineer high-performance machinery that
                meets the evolving demands of infrastructure development.
                <br />
                With years of expertise in the field, we have developed
                cutting-edge solutions tailored to ensure maximum productivity,
                reliability, and cost-effectiveness. Our flagship product, is
                designed to handle small to medium-sized projects with ease,
                making road construction, stabilization,and rehabilitation
                faster and more efficient. Built with robust engineering and
                advanced technology, our machines guarantee superior
                performance, even in the toughest environments.
              </p>
              {activepage === "home" && (
                <button className="mt-8">
                  <Link
                    href="/about"
                    className=" py-3 px-8 text-white bg-[#f0b827]  rounded-lg"
                  >
                    View More
                  </Link>
                </button>
              )}
            </section>
            <section className="relative">
              <Image alt="about image" height={400} width={600} src="/cm.png" />
              <div className="p-8 absolute bg-[#f0b827] rounded-lg text-white text-xl left-2 bottom-[-80px] flex lg:flex md:hidden lg:bottom-2 lg:left-[-80px]">
                Explore Our  <br />
                Journey
              </div>
            </section>
          </div>
        </Wrapper>
      </>
    );
}
