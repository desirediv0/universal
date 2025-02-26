import React from "react";
import Wrapper from "./Wrapper";
import { IoLocationOutline } from "react-icons/io5";
import { LuPhone, LuMail } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
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
            <h2>Home</h2>
          </Link>
          <Link href="/about" className="hover:text-[#f0b827]">
            <h2>About</h2>
          </Link>
          <Link href="/product" className="hover:text-[#f0b827]">
            <h2>Products</h2>
          </Link>
          <Link href="/contact" className="hover:text-[#f0b827]">
            <h2>Contact</h2>
          </Link>
        </section>
        <section className="flex flex-col gap-2">
          <h1 className="text-2xl pb-2 font-medium ">Products</h1>
          <span className="flex items-center gap-2 hover:text-[#f0b827]">
            <IoIosArrowForward color="text-[#f0b827]" size={15} />{" "}
            <h2>Motor Grader</h2>
          </span>
          <span className="flex items-center gap-2 hover:text-[#f0b827]">
            <IoIosArrowForward color="text-[#f0b827]" size={15} />{" "}
            <h2>Road Roller</h2>
          </span>
          <span className="flex items-center gap-2 hover:text-[#f0b827]">
            <IoIosArrowForward color="text-[#f0b827]" size={15} />{" "}
            <h2>Truck Crane</h2>
          </span>
          <span className="flex items-center gap-2 hover:text-[#f0b827]">
            <IoIosArrowForward color="text-[#f0b827]" size={15} />{" "}
            <h2>Dump Truck</h2>
          </span>
          <span className="flex items-center gap-2 hover:text-[#f0b827]">
            <IoIosArrowForward color="text-[#f0b827]" size={15} />{" "}
            <h2>Concrete Mixer</h2>
          </span>
          <span className="flex items-center gap-2 hover:text-[#f0b827]">
            <IoIosArrowForward color="text-[#f0b827]" size={15} />{" "}
            <h2>Forklift Truck</h2>
          </span>
        </section>
        <section className="flex flex-col gap-4">
          <h1 className="text-2xl pb-2 font-medium ">Get in Touch</h1>
          <h2 className="flex gap-3 items-center hover:text-[#f0b827]">
            <IoLocationOutline size={25} /> 641, Satya The Hive
          </h2>
          <h2 className="flex gap-3 items-center hover:text-[#f0b827]">
            <LuPhone size={22} /> +91 9870175083
          </h2>
          <h2 className="flex gap-3 items-center hover:text-[#f0b827]">
            <LuMail size={22} /> hello@domain.com
          </h2>
        </section>
      </div>
      <div className="w-full mt-4 text-lg py-4 border-t border-black flex items-center justify-center">
        <p className="">Copyright &copy; | All Rights Reserved | Design By  
        <Link href={"/"} className="text-yellow-500"> Xcel B2B</Link></p>
      </div>
    </Wrapper>
  </div>
  );
}
