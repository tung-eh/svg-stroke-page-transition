'use client'
import { useRef, useEffect } from 'react'
import { TransitionRouter } from 'next-transition-router'
import gsap from 'gsap'

const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll('path')
    paths.forEach((path) => {
      const length = path.getTotalLength()
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      })
    })
  }, [])

  return (
    <TransitionRouter
      auto
      leave={(next) => {
        if (!svgRef.current) return

        const paths = svgRef.current.querySelectorAll('path')
        const tl = gsap.timeline({ onComplete: next })

        tl.to(paths, {
          strokeDashoffset: 0,
          attr: { 'stroke-width': 75 },
          duration: 1,
          ease: 'power1.inOut',
          stagger: 0.1,
        })

        return () => tl.kill()
      }}
      enter={(next) => {
        if (!svgRef.current) return

        const paths = svgRef.current.querySelectorAll('path')
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(paths, {
              strokeDashoffset: (_, target) =>
                (target as SVGPathElement).getTotalLength(),
            })
            next()
          },
        })

        tl.to(paths, {
          strokeDashoffset: (_, target) =>
            -(target as SVGPathElement).getTotalLength(),
          attr: { 'stroke-width': 25 },
          duration: 1,
          ease: 'power1.inOut',
          stagger: 0.1,
        })

        return () => tl.kill()
      }}
    >
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 w-full h-full pointer-events-none z-100">
        <svg
          ref={svgRef}
          viewBox="0 0 270 270"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M16.1041 202.094C16.1041 202.094 46.1041 265.594 63.6041 238.594C81.1041 211.594 -17.8959 121.594 22.1041 112.094C62.1041 102.594 87.1041 254.899 147.604 238.594C208.104 222.289 12.6041 44.5941 82.6041 15.0941C152.604 -14.4058 166.604 217.594 235.104 209.094C303.604 200.594 177.604 35.4203 201.604 23.5942C225.604 11.7682 242.104 47.0942 242.104 47.0942"
            stroke="#fe5e41"
            strokeWidth="25"
            strokeLinecap="round"
            style={{ opacity: 0 }}
          />
          <path
            d="M184.04 248.474C184.04 248.474 240.04 234.474 232.54 208.474C225.04 182.474 86.0399 294.474 57.5399 236.974C29.0399 179.474 270.097 188.474 242.04 110.474C213.982 32.474 48.0395 232.474 17.5397 152.974C-12.9601 73.474 249.04 82.974 203.04 27.474C157.04 -28.0259 35.5397 89.974 17.5397 69.9739C-0.460262 49.9739 35.5397 27.474 35.5397 27.474"
            stroke="#6e44ff"
            strokeWidth="25"
            strokeLinecap="round"
            style={{ opacity: 0 }}
          />
        </svg>
      </div>
      {children}
    </TransitionRouter>
  )
}

export default TransitionProvider
