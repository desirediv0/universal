"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { PiPhoneThin } from "react-icons/pi";
import Wrapper from "@/app/_component/Wrapper";

const contactMethods = [
  {
    icon: PiPhoneThin,
    title: "Phone",
    info: "+91-9870175083",
  },
  {
    icon: IoMailOutline,
    title: "Mail",
    info: "hello@domain.com",
  },
  {
    icon: IoLocationOutline,
    title: "Address",
    info: "641, Satya the Hive",
  },
];

function ContactForm() {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") || "NoSubject";

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const formValues = Object.fromEntries(formData.entries());
      console.log("Form data:", formValues);
      console.log(subject);
      event.target.reset();
      alert("Form Submitted Successfully");
    } catch (error) {
      console.error(error);
      alert("Error Please try Again Later");
    }
  };

  return (
    <form
      className="bg-white border rounded-lg border-gray-200 py-8 md:px-16 px-8"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col pb-4 gap-2">
        <label htmlFor="name" className="text-xl">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="border rounded-lg border-gray-200 py-2 px-3"
        />
      </div>
      <div className="flex flex-col pb-4 gap-2">
        <label htmlFor="email" className="text-xl">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border rounded-lg border-gray-200 py-2 px-3"
        />
      </div>
      <div className="flex flex-col pb-4 gap-2">
        <label htmlFor="phone" className="text-xl">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="border rounded-lg border-gray-200 py-2 px-3"
        />
      </div>
      <div className="flex flex-col pb-4 gap-2">
        <label htmlFor="message" className="text-xl">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="border rounded-lg border-gray-200 p-3"
          rows={6}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#f0b827] text-white text-xl py-2 px-4 rounded-lg transition-colors"
      >
        Submit
      </button>
    </form>
  );
}

export default function Component() {
  return (
    <Wrapper className="mb-6">
      <span className="w-full text-center "><h1 className="mb-12 text-4xl md:text-5xl ">Get in Touch</h1></span>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 ">
        <section className="flex-col  md:flex space-y-10">
          {contactMethods.map((items, index) => (
            <div key={index} className="flex gap-4">
              <span className="p-4 rounded-full bg-[#faf3e3]">
                <items.icon color="#f0b827" size={30} />
              </span>
              <span className="flex flex-col">
                <h1 className="text-xl">{items.title}</h1>
                <p>{items.info}</p>
              </span>
            </div>

          ))}
          <section>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.288074788611!2d76.96075877528283!3d28.470869875753362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d17957da3b1e7%3A0xe31b6d39c72cc555!2sDesire%20Div%20-%20Website%20Designing%20Company%20in%20Gurgaon!5e0!3m2!1sen!2sin!4v1731919600012!5m2!1sen!2sin"
              width="100%"
              height="310"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </section>
        </section>
        <section>
          <Suspense fallback={<div>Loading...</div>}>
            <ContactForm />
          </Suspense>
        </section>
      </div>
    </Wrapper>
  );
}
