import React from 'react'
import PcImg from '../img/pc_hero.png'

const Hero = () => {
  return (
    <section className=' bg-pink-200 h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24'>
      <div className='container mx-auto flex justify-around h-full'>
        {/* text */}
        <div className='flex flex-col justify-center'>
          <div className='font-semibold flex items-center uppercase'>
            <div className=' font-light'>Find the most miserable things </div>
          </div>
          <h1 className='text-[70px] leading-[1.1] font-extralight mb-4'>Special Discount <br/>
          <span className=' font-bold'>Bela Beli</span>
          </h1>
        </div>
        {/* image */}
        <div className='hidden lg:block'>
          <img src={PcImg} alt='' />
        </div>
        </div>
    </section>
  )
}

export default Hero