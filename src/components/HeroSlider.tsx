"use client"
import { Swiper, SwiperSlide } from 'swiper/react'

import hero01 from '@/public/assets/images/hero-01.jpg'
import hero02 from '@/public/assets/images/hero-02.jpg'
import hero03 from '@/public/assets/images/hero-03.jpg'
import hero04 from '@/public/assets/images/hero-04.jpg'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/scrollbar'

// import required modules
import { Scrollbar } from 'swiper/modules'
import { Button } from './ui/button'
import Image from 'next/image'

const heroes = [
  {
    title: 'Corte Family',
    description: 'Comfort and versatility sneakers collection.',
    image: hero01,
  },
  {
    title: 'Mezzala',
    description: 'The Tempo Controller in the Middle of the Field.',
    image: hero02,
  },
  {
    title: 'Borneo',
    description:
      'Step confidently, blending rugged style with comfort for your urban adventures',
    image: hero03,
  },
  {
    title: 'Cundamani',
    description:
      'Step confidently, blending rugged style with comfort for your urban adventures',
    image: hero04,
  },
]

const HeroSlider = () => {
  return (
    <>
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        <div className="text-center">
          {heroes.map((hero, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={hero.image.src}
                alt="Hero"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto brightness-75"
              />
              <div className="text-center w-full mt-56 absolute top-0 left-0 ">
                <div className="w-3/6 m-auto">
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    {hero.title}
                  </h1>
                  <p className="mt-5 text-lg leading-8 text-gray-200">
                    {hero.description}
                  </p>
                  <Button className="mt-5">Find Me</Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </>
  )
}

export default HeroSlider
