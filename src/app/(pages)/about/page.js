import Aboutus from '@/app/_component/Aboutus'
import Testimonials from '@/app/_component/Testinomials'
import Whychoose from '@/app/_component/Whychoose'
import React from 'react'

export default function page() {
  return (
    <>
    <Aboutus/>
    <Whychoose/>
    <Testimonials/>
    <div className='py-6'></div>
    </>
  )
}
