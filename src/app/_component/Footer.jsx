import React from "react";
import Wrapper from "./Wrapper";
import { IoLocationOutline } from "react-icons/io5";
import { LuPhone, LuMail } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {

  const locationUrl = "https://www.google.com/maps?q=635,Satya+The+Hive,Sector-102+Gurugram+122006";
  return (
    <div className="w-full bg-[#fdf7e7]">
      <Wrapper className="pb-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-2 ">
          <section className="flex flex-col gap-2">
            <Link href="/">
              <Image
                className="w-[200px] object-cover transition-transform duration-500 group-hover:scale-110"
                alt="logo"
                width={300}
                height={500}
                src={"/logo.jpg"}
              />
            </Link>
            <h2>Your Path to Quality Infrastructure</h2>
          </section>
          <section className="flex flex-col gap-2">
            <h1 className="text-2xl pb-2 font-medium ">Useful Links</h1>
            <Link href="/" className="hover:text-[#f0b827]">
              Home
            </Link>
            <Link href="/about" className="hover:text-[#f0b827]">
              About
            </Link>
            <Link href="/product" className="hover:text-[#f0b827]">
              Product
            </Link>
            <Link href="/contact" className="hover:text-[#f0b827]">
              Contact
            </Link>
          </section>
          <section className="flex flex-col gap-2">
            <h1 className="text-2xl pb-2 font-medium ">Products</h1>
            <Link href="/product/roadmac-cr-500">
            <span className="flex items-center gap-2 hover:text-[#f0b827]">
              <IoIosArrowForward color="text-[#f0b827]" size={15} />{" "}
              Roadmac CR 500
            </span>
            </Link>
            <Link href="/product/power-curber-5700-d">
            <span className="flex items-center gap-2 hover:text-[#f0b827]">
              <IoIosArrowForward color="text-[#f0b827]" size={15} />{" "}
              Power Curber 5700 D
            </span>
            </Link>
            <Link href="/product/roadmac-cr-600">
            <span className="flex items-center gap-2 hover:text-[#f0b827]">
              <IoIosArrowForward color="text-[#f0b827]" size={15} />{" "}
              Roadmac CR 600
            </span>
            </Link>
            <Link href="/product/roadmac-sr-2300">
            <span className="flex items-center gap-2 hover:text-[#f0b827]">
              <IoIosArrowForward color="text-[#f0b827]" size={15} />{" "}
              Roadmac SR 2300
            </span>
            </Link>
          </section>
          <section className="flex flex-col gap-4">
            <h1 className="text-2xl pb-2 font-medium ">Get in Touch</h1>
            <Link href={locationUrl} passHref>
              <h2 className="flex gap-3 items-center hover:text-[#f0b827] cursor-pointer">
                <IoLocationOutline size={22} />
                635, Satya The Hive,
                <br />
                Sector-102 Gurugram 122006
              </h2>
            </Link>
            <h2 className="flex gap-3 items-center hover:text-[#f0b827]">
              <LuPhone size={22} />
              <a href='tel:9090939321' className='hover:underline'>+91 9090939321</a>
            </h2>
            <h2 className="flex gap-3 items-center hover:text-[#f0b827]">
              <LuMail size={22} />
              <a href='mailto:mail@umsc.in' className='hover:underline'>mail@umsc.in</a>
            </h2>
          </section>
        </div>
        <div className="w-full mt-4 text-lg py-4 border-t border-black flex items-center justify-center">
          <p className="">Copyright &copy;  | All Rights Reserved | Design By
            <Link href={"https://xcelb2b.com"} className="text-yellow-500"> Xcel B2B</Link></p>
        </div>
      </Wrapper>
    </div>
  );
}
