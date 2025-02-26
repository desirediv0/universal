import React from 'react'
import { Banner } from './_component/Banner'
import Product from './_component/Product';
import Aboutus from './_component/Aboutus';
import Whychoose from './_component/Whychoose';
import Cta from './_component/Cta';
import Testimonials from './_component/Testinomials';
import Icon from './_component/Icon';

const items = [
  {
    image: "/Rslider.webp",
    heading: "Your Path to Quality Infrastructure",
    shortdesc:
      "Expert in crafting durable, efficient, and sustainable roads, we bring unmatched expertise to every project. ",
  },
  {
    image: "/Rslider2.webp",
    heading: "Your Path to Quality Infrastructure",
    shortdesc:
      "Expert in crafting durable, efficient, and sustainable roads, we bring unmatched expertise to every project. ",
  },
];


export default function page() {
  return (
   <>
   <Banner items={items}/>
   <div className='py-3'></div>
   <Aboutus activepage ="home" />
   <Product activepage='homepage' />
   <Whychoose/>
   <Cta/>
   <div className='py-6'></div>
   <Testimonials/>
   <div className='py-6'></div>
   <Icon/>
   </>
  )
}
