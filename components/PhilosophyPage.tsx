"use client"
import React, { useEffect, useRef, useState } from "react"
// FIX 1: We use "framer-motion" (Correct library)
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion"

// FIX 2: This line disables the strict red errors for the animation box
const MotionDiv = motion.div as any;

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}

const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string
  gradientBackgroundEnd?: string
  firstColor?: string
  secondColor?: string
  thirdColor?: string
  fourthColor?: string
  fifthColor?: string
  pointerColor?: string
  size?: string
  blendingValue?: string
  children?: React.ReactNode
  className?: string
  interactive?: boolean
  containerClassName?: string
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null)

  const [curX, setCurX] = useState(0)
  const [curY, setCurY] = useState(0)
  const [tgX, setTgX] = useState(0)
  const [tgY, setTgY] = useState(0)

  useEffect(() => {
    document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart)
    document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd)
    document.body.style.setProperty("--first-color", firstColor)
    document.body.style.setProperty("--second-color", secondColor)
    document.body.style.setProperty("--third-color", thirdColor)
    document.body.style.setProperty("--fourth-color", fourthColor)
    document.body.style.setProperty("--fifth-color", fifthColor)
    document.body.style.setProperty("--pointer-color", pointerColor)
    document.body.style.setProperty("--size", size)
    document.body.style.setProperty("--blending-value", blendingValue)
  }, [])

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) {
        return
      }
      setCurX(curX + (tgX - curX) / 20)
      setCurY(curY + (tgY - curY) / 20)
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
    }
    move()
  }, [tgX, tgY, curX, curY])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect()
      setTgX(event.clientX - rect.left)
      setTgY(event.clientY - rect.top)
    }
  }

  const [isSafari, setIsSafari] = useState(false)
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
  }, [])

  return (
    <div className={cn("h-screen w-screen relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]", containerClassName)}>
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("", className)}>{children}</div>
      <div className={cn("gradients-container h-full w-full blur-lg", isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]")}>
        <div className={cn(`absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`, `[transform-origin:center_center]`, `animate-first`, `opacity-100`)}></div>
        <div className={cn(`absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`, `[transform-origin:calc(50%-400px)]`, `animate-second`, `opacity-100`)}></div>
        <div className={cn(`absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`, `[transform-origin:calc(50%+400px)]`, `animate-third`, `opacity-100`)}></div>
        <div className={cn(`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`, `[transform-origin:calc(50%-200px)]`, `animate-fourth`, `opacity-70`)}></div>
        <div className={cn(`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`, `[transform-origin:calc(50%-800px)_calc(50%+800px)]`, `animate-fifth`, `opacity-100`)}></div>
        {interactive && (
          <div ref={interactiveRef} onMouseMove={handleMouseMove} className={cn(`absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`, `opacity-70`)}></div>
        )}
      </div>
    </div>
  )
}

const CometCard = ({ rotateDepth = 17.5, translateDepth = 20, className, children }: { rotateDepth?: number; translateDepth?: number; className?: string; children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`-${rotateDepth}deg`, `${rotateDepth}deg`])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`${rotateDepth}deg`, `-${rotateDepth}deg`])
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [`-${translateDepth}px`, `${translateDepth}px`])
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [`${translateDepth}px`, `-${translateDepth}px`])
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100])
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const touch = e.touches[0]
    const width = rect.width
    const height = rect.height
    const touchX = touch.clientX - rect.left
    const touchY = touch.clientY - rect.top
    const xPct = touchX / width - 0.5
    const yPct = touchY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const handleTouchEnd = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className={cn("perspective-distant transform-3d", className)}>
      <MotionDiv
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ rotateX, rotateY, translateX, translateY, boxShadow: "rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px" }}
        initial={{ scale: 1, z: 0 }}
        whileHover={{ scale: 1.05, z: 50, transition: { duration: 0.2 } }}
        whileTap={{ scale: 1.02, transition: { duration: 0.1 } }}
        className="relative rounded-2xl"
      >
        {children}
        <MotionDiv className="pointer-events-none absolute inset-0 z-50 h-full w-full rounded-[16px] mix-blend-overlay" style={{ background: glareBackground, opacity: 0.6 }} transition={{ duration: 0.2 }} />
      </MotionDiv>
    </div>
  )
}

export default function PhilosophyPage() {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(30, 72, 116)"
      gradientBackgroundEnd="rgb(15, 36, 58)"
      firstColor="30, 72, 116"
      secondColor="204, 157, 66"
      thirdColor="30, 72, 116"
      fourthColor="204, 157, 66"
      fifthColor="30, 72, 116"
      pointerColor="204, 157, 66"
    >
      <div className="absolute z-50 inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8 pointer-events-none">
        <CometCard className="pointer-events-auto w-full max-w-2xl">
          <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border border-white/20">
            <div className="text-center space-y-4 sm:space-y-6">
              <p className="text-xs sm:text-sm uppercase tracking-widest text-[#cc9d42] font-light animate-in fade-in duration-1000 delay-200">Our Philosophy</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight animate-in fade-in duration-1000 delay-500">Luxury Living, Redefined</h1>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl mx-auto text-balance animate-in fade-in duration-1000 delay-700">MAPSTONE Holiday Homes offers a curated selection of furnished apartments in Dubai's prime districts. From the vibrant Downtown to the serene Palm Jumeirah, we provide a seamless hospitality experience.</p>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed text-balance animate-in fade-in duration-1000 delay-1000">Whether you are visiting for business or leisure, our properties blend hotel-grade amenities with the comfort and privacy of a home.</p>
              <div className="flex justify-center gap-8 sm:gap-12 pt-2 sm:pt-4 animate-in fade-in duration-1000 delay-1200">
                <div><p className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#cc9d42]">50+</p><p className="text-xs sm:text-sm text-white/60 uppercase tracking-wide">Premium Units</p></div>
                <div><p className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#cc9d42]">4.9</p><p className="text-xs sm:text-sm text-white/60 uppercase tracking-wide">Guest Rating</p></div>
              </div>
            </div>
          </div>
        </CometCard>
      </div>
    </BackgroundGradientAnimation>
  )
}