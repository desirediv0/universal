"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { PiPhoneThin } from "react-icons/pi";
import Wrapper from "@/app/_component/Wrapper";
import { submitContactForm } from "@/Api";

const contactMethods = [
  {
    icon: PiPhoneThin,
    title: "Phone",
    info: "+91-9870175083",
    link: "tel:+919870175083",
  },
  {
    icon: IoMailOutline,
    title: "Mail",
    info: "hello@domain.com",
    link: "mailto:hello@domain.com",
  },
  {
    icon: IoLocationOutline,
    title: "Address",
    info: "641, Satya the Hive",
    link: "https://goo.gl/maps/yourAddress",
  },
];

const Alert = ({ type, message }) => (
  <div
    className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white`}
    style={{
      animation: "slideIn 0.5s ease-out forwards",
    }}
  >
    {message}
  </div>
);

function ContactForm() {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") || "NoSubject";
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ show: false, type: "", message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.target);
      const formValues = Object.fromEntries(formData.entries());

      await submitContactForm({
        ...formValues,
        subject,
      });

      setAlert({
        show: true,
        type: "success",
        message: "Message sent successfully!",
      });
      event.target.reset();
    } catch (error) {
      console.error(error);
      setAlert({
        show: true,
        type: "error",
        message: error.message || "Error submitting form. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses =
    "border rounded-lg border-gray-200 py-2 px-3 focus:outline-none focus:border-[#f0b827] transition-colors";
  const labelClasses = "text-xl font-medium text-gray-700";

  return (
    <div className="relative">
      {alert.show && <Alert type={alert.type} message={alert.message} />}
      <form
        className="bg-white border rounded-lg border-gray-200 py-8 md:px-16 px-8 shadow-sm hover:shadow-md transition-shadow duration-300"
        onSubmit={handleSubmit}
      >
        {[
          { id: "name", type: "text", label: "Name" },
          { id: "email", type: "email", label: "Email" },
          { id: "phone", type: "tel", label: "Phone" },
        ].map((field) => (
          <div key={field.id} className="flex flex-col pb-4 gap-2">
            <label htmlFor={field.id} className={labelClasses}>
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              required
              className={inputClasses}
            />
          </div>
        ))}
        <div className="flex flex-col pb-4 gap-2">
          <label htmlFor="message" className={labelClasses}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            className={`${inputClasses} resize-none`}
            rows={6}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-[#f0b827] text-white text-xl py-2 px-4 rounded-lg transition-all
            ${isLoading
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-[#e5ae20] active:transform active:scale-98"
            }`}
        >
          {isLoading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

function ContactMethod({ icon: Icon, title, info, link }) {
  return (
    <div className="flex gap-4 group hover:transform hover:translate-x-2 transition-transform">
      <span className="p-4 rounded-full bg-[#faf3e3] group-hover:bg-[#f7ecd3] transition-colors">
        <Icon color="#f0b827" size={30} />
      </span>
      <span className="flex flex-col">
        <h2 className="text-xl font-semibold">{title}</h2>
        <a
          href={link}
          className="text-gray-600 hover:text-[#f0b827] transition-colors"
        >
          {info}
        </a>
      </span>
    </div>
  );
}

export default function Contact() {
  return (
    <Wrapper className="mb-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Get in Touch</h1>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
        <section className="flex-col space-y-10">
          <div className="space-y-10">
            {contactMethods.map((method, index) => (
              <ContactMethod key={index} {...method} />
            ))}
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.288074788611!2d76.96075877528283!3d28.470869875753362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d17957da3b1e7%3A0xe31b6d39c72cc555!2sDesire%20Div%20-%20Website%20Designing%20Company%20in%20Gurgaon!5e0!3m2!1sen!2sin!4v1731919600012!5m2!1sen!2sin"
            width="100%"
            height="310"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-md hover:shadow-lg transition-shadow"
            title="Office Location"
          />
        </section>
        <section>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f0b827]"></div>
              </div>
            }
          >
            <ContactForm />
          </Suspense>
        </section>
      </div>
    </Wrapper>
  );
}