import Link from 'next/link';
import React from 'react'
import { FaWhatsappSquare } from "react-icons/fa";

export default function Icon() {
  return (
    <div className='fixed right-4 bottom-4'><Link href='#' ><FaWhatsappSquare size={60} color='#25D366'/></Link></div>
  )
}
