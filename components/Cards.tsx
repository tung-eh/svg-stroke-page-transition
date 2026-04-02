'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

const items = [
  {
    imgSrc: '/img_01.png',
    strokeColor: '#e67339',
    title: 'Synthe Silhouelette',
  },
  {
    imgSrc: '/img_02.jpg',
    strokeColor: '#a66363',
    title: 'Red Form Study',
  },
  {
    imgSrc: '/img_03.png',
    strokeColor: '#eb3828',
    title: 'Material Pause',
  },
  {
    imgSrc: '/img_04.jpg',
    strokeColor: '#a6a09d',
    title: 'Obscured Profile',
  },
  {
    imgSrc: '/img_05.jpg',
    strokeColor: '#99938a',
    title: 'Muted Present',
  },
  {
    imgSrc: '/img_06.png',
    strokeColor: '#5f7c98',
    title: 'Spatial Balance',
  },
]

const CardItem = ({ imgSrc, strokeColor, title }: (typeof items)[number]) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const paths = container.querySelectorAll('path')

    paths.forEach((path) => {
      const length = path.getTotalLength()
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      })
    })

    let tl: gsap.core.Timeline

    const handleMouseEnter = () => {
      if (tl) tl.kill()
      tl = gsap.timeline()

      tl.to(
        paths,
        {
          strokeDashoffset: 0,
          attr: { 'stroke-width': 75 },
          duration: 1.5,
          easer: 'power2.out',
        },
        0
      )
    }

    const handleMouseLeave = () => {
      if (tl) tl.kill()
      tl = gsap.timeline()

      tl.to(
        paths,
        {
          strokeDashoffset: (_, target) =>
            (target as SVGPathElement).getTotalLength(),
          attr: { 'stroke-width': 25 },
          duration: 1,
          easer: 'power2.out',
        },
        0
      )
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square rounded-2xl overflow-hidden"
    >
      <Image
        src={imgSrc}
        alt="collection image"
        fill
        className="object-cover"
      />
      <svg
        viewBox="0 0 270 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 w-full h-full pointer-events-none"
      >
        <path
          d="M16.1041 202.094C16.1041 202.094 46.1041 265.594 63.6041 238.594C81.1041 211.594 -17.8959 121.594 22.1041 112.094C62.1041 102.594 87.1041 254.899 147.604 238.594C208.104 222.289 12.6041 44.5941 82.6041 15.0941C152.604 -14.4058 166.604 217.594 235.104 209.094C303.604 200.594 177.604 35.4203 201.604 23.5942C225.604 11.7682 242.104 47.0942 242.104 47.0942"
          stroke={strokeColor}
          strokeWidth="25"
          strokeLinecap="round"
          className="opacity-0"
        />
        <path
          d="M184.04 248.474C184.04 248.474 240.04 234.474 232.54 208.474C225.04 182.474 86.0399 294.474 57.5399 236.974C29.0399 179.474 270.097 188.474 242.04 110.474C213.982 32.474 48.0395 232.474 17.5397 152.974C-12.9601 73.474 249.04 82.974 203.04 27.474C157.04 -28.0259 35.5397 89.974 17.5397 69.9739C-0.460262 49.9739 35.5397 27.474 35.5397 27.474"
          stroke="#e0e0e0"
          strokeWidth="25"
          strokeLinecap="round"
          className="opacity-0"
        />
      </svg>
      <h3 className="absolute bottom-8 left-8 font-medium text-3xl">{title}</h3>
    </div>
  )
}

const Cards = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 px-8">
      {items.map((item, index) => (
        <CardItem key={index} {...item} />
      ))}
    </div>
  )
}

export default Cards
