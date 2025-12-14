// @ts-nocheck
"use client"

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { Star } from 'lucide-react'
import { AnimatePresence, motion } from "framer-motion"
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber"
import * as THREE from "three"
import { ShaderMaterial as ThreeShaderMaterial } from "three"

// Extend R3F with the Three classes
extend({ ThreeShaderMaterial })

// --- UTILITY FUNCTION ---
export function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

// ============================================
// BACKGROUND GRADIENT ANIMATION COMPONENTS
// ============================================

const InteractiveRef = React.forwardRef(({ interactive }: any, ref: any) => {
    const curX = useRef(0)
    const curY = useRef(0)
    const tgX = useRef(0)
    const tgY = useRef(0)

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect()
                tgX.current = event.clientX - rect.left
                tgY.current = event.clientY - rect.top
            }
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [ref])

    useEffect(() => {
        if (!interactive) return
        let animationFrameId: number
        function move() {
            if (!ref.current) {
                animationFrameId = requestAnimationFrame(move)
                return
            }
            curX.current = curX.current + (tgX.current - curX.current) / 20
            curY.current = curY.current + (tgY.current - curY.current) / 20
            ref.current.style.transform = `translate(${Math.round(curX.current)}px, ${Math.round(curY.current)}px)`
            animationFrameId = requestAnimationFrame(move)
        }
        animationFrameId = requestAnimationFrame(move)
        return () => cancelAnimationFrame(animationFrameId)
    }, [interactive, ref])

    if (!interactive) return null;

    return (
        <div 
            ref={ref} 
            className={cn(`absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`, `opacity-70`)}
        />
    );
});
InteractiveRef.displayName = "InteractiveRef";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(34, 76, 120)",
  gradientBackgroundEnd = "rgb(207, 159, 67)",
  firstColor = "34, 76, 120",
  secondColor = "207, 159, 67",
  thirdColor = "34, 76, 120",
  fourthColor = "207, 159, 67",
  fifthColor = "34, 76, 120",
  pointerColor = "207, 159, 67",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: any) => {
  const interactiveRef = useRef(null)
  const containerRef = useRef(null)

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
  }, [gradientBackgroundStart, gradientBackgroundEnd, firstColor, secondColor, thirdColor, fourthColor, fifthColor, pointerColor, size, blendingValue])

  const [isSafari, setIsSafari] = useState(false)
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName,
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("relative z-10", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container absolute inset-0 h-full w-full blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]",
        )}
      >
        <div className={cn(`absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),1)_0,_rgba(var(--first-color),0)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`, `[transform-origin:center_center]`, `animate-first`, `opacity-100`)}></div>
        <div className={cn(`absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`, `[transform-origin:calc(50%-400px)]`, `animate-second`, `opacity-100`)}></div>
        <div className={cn(`absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%+400px)]`, `animate-third`, `opacity-100`)}></div>
        <div className={cn(`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-200px)]`, `animate-fourth`, `opacity-70`)}></div>
        <div className={cn(`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`, `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-800px)_calc(50%+800px)]`, `animate-fifth`, `opacity-100`)}></div>
        <InteractiveRef ref={interactiveRef} interactive={interactive} />
      </div>
    </div>
  )
}

// ============================================
// CANVAS REVEAL EFFECT COMPONENTS
// ============================================

export const ShaderMaterial = ({ source, uniforms, maxFps = 60 }: any) => {
  const { size } = useThree()
  const ref = useRef<THREE.Mesh>(null)
  const lastFrameTime = useRef(0)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const timestamp = clock.getElapsedTime()
    if (timestamp - lastFrameTime.current < 1 / maxFps) return
    lastFrameTime.current = timestamp
    const material = ref.current.material as ThreeShaderMaterial
    if (material.uniforms.u_time) material.uniforms.u_time.value = timestamp
  })

  const getUniforms = useCallback(() => {
    const preparedUniforms: Record<string, { value: unknown; type?: string }> = {}
    for (const uniformName in uniforms) {
      const uniform = uniforms[uniformName]
      switch (uniform.type) {
        case "uniform1f": preparedUniforms[uniformName] = { value: uniform.value, type: "1f" }; break
        case "uniform3f": preparedUniforms[uniformName] = { value: new THREE.Vector3().fromArray(uniform.value as number[]), type: "3f" }; break
        case "uniform1fv": preparedUniforms[uniformName] = { value: uniform.value, type: "1fv" }; break
        case "uniform3fv": preparedUniforms[uniformName] = { value: (uniform.value as number[][]).map((v: number[]) => new THREE.Vector3().fromArray(v)), type: "3fv" }; break
        case "uniform2f": preparedUniforms[uniformName] = { value: new THREE.Vector2().fromArray(uniform.value as number[]), type: "2f" }; break
      }
    }
    preparedUniforms["u_time"] = { value: 0, type: "1f" }
    preparedUniforms["u_resolution"] = { value: new THREE.Vector2(size.width * 2, size.height * 2) }
    return preparedUniforms
  }, [uniforms, size.width, size.height])

  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2]} />
      <primitive object={new ThreeShaderMaterial({ fragmentShader: source, uniforms: getUniforms() })} attach="material" />
    </mesh>
  )
}

export const Shader = ({ source, uniforms, maxFps = 60 }: any) => {
  return (
    <Canvas className="absolute inset-0 h-full w-full">
      <ShaderMaterial source={source} uniforms={uniforms} maxFps={maxFps} />
    </Canvas>
  )
}

export const DotMatrix = ({ colors = [[0, 0, 0]], opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14], totalSize = 4, dotSize = 2, shader = "", center = ["x", "y"] }: any) => {
  const uniforms = useMemo(() => {
    let colorsArray = [colors[0], colors[0], colors[0], colors[0], colors[0], colors[0]]
    if (colors.length === 2) colorsArray = [colors[0], colors[0], colors[0], colors[1], colors[1], colors[1]]
    else if (colors.length === 3) colorsArray = [colors[0], colors[0], colors[1], colors[1], colors[2], colors[2]]

    return {
      u_colors: { value: colorsArray.map((color: any) => [color[0] / 255, color[1] / 255, color[2] / 255]), type: "uniform3fv" },
      u_opacities: { value: opacities, type: "uniform1fv" },
      u_total_size: { value: totalSize, type: "uniform1f" },
      u_dot_size: { value: dotSize, type: "uniform1f" },
    }
  }, [colors, opacities, totalSize, dotSize])

  return (
    <Shader
      source={`
        precision mediump float;
        in vec2 fragCoord;
        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        out vec4 fragColor;
        float PHI = 1.61803398874989484820459;
        float random(vec2 xy) { return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x); }
        void main() {
            vec2 st = fragCoord.xy;
            ${center.includes("x") ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));" : ""}
            ${center.includes("y") ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));" : ""}
            float opacity = step(0.0, st.x);
            opacity *= step(0.0, st.y);
            vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));
            float frequency = 5.0;
            float show_offset = random(st2);
            float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);
            opacity *= u_opacities[int(rand * 10.0)];
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));
            vec3 color = u_colors[int(show_offset * 6.0)];
            ${shader}
            fragColor = vec4(color, opacity);
            fragColor.rgb *= fragColor.a;
        }`}
      uniforms={uniforms}
      maxFps={60}
    />
  )
}

export const CanvasRevealEffect = ({ animationSpeed = 0.4, opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1], colors = [[0, 255, 255]], containerClassName, dotSize, showGradient = true }: any) => {
  return (
    <div className={cn("h-full relative bg-white w-full", containerClassName)}>
      <div className="h-full w-full">
        <DotMatrix
          colors={colors ?? [[0, 255, 255]]}
          dotSize={dotSize ?? 3}
          opacities={opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]}
          shader={`
              float animation_speed_factor = ${animationSpeed.toFixed(1)};
              float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
              opacity *= step(intro_offset, u_time * animation_speed_factor);
              opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            `}
          center={["x", "y"]}
        />
      </div>
      {showGradient && <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />}
    </div>
  )
}

const testimonials = [
  {
    quote: "Absolutely stunning apartment. The view of the Burj Khalifa was breathtaking and the service was impeccable.",
    name: "Sarah Jenkins",
    location: "United Kingdom",
    rating: 5,
    backgroundImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    canvasColors: [[201, 169, 98], [26, 58, 92]],
    canvasBgColor: "bg-[#1a3a5c]",
  },
  {
    quote: "MAPSTONE managed my stay perfectly. Privacy, luxury and comfort. Highly recommended for families.",
    name: "Mohammed Al-Fayed",
    location: "Saudi Arabia",
    rating: 5,
    backgroundImage: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    canvasColors: [[201, 169, 98]],
    canvasBgColor: "bg-black",
  },
  {
    quote: "The best holiday home experience in Dubai. The interior design was beautiful and the location was central.",
    name: "Elena Volkov",
    location: "Russia",
    rating: 5,
    backgroundImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    canvasColors: [[201, 169, 98], [249, 247, 244]],
    canvasBgColor: "bg-[#1a3a5c]",
  },
]

function StarRating({ rating }: any) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[#c9a962] text-[#c9a962]" />
      ))}
    </div>
  )
}

const TestimonialCard = ({ testimonial }: any) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-lg overflow-hidden h-[420px] w-full group/card cursor-pointer"
    >
      <div className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover/card:scale-110" style={{ backgroundImage: `url(${testimonial.backgroundImage})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 z-10" />
      <AnimatePresence>
        {hovered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full absolute inset-0 z-20">
            <CanvasRevealEffect animationSpeed={3} containerClassName={testimonial.canvasBgColor} colors={testimonial.canvasColors} dotSize={2} />
            <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-30 h-full flex flex-col justify-end p-6">
        <div className="transform transition-transform duration-300 group-hover/card:-translate-y-2"><StarRating rating={testimonial.rating} /></div>
        <div className="mt-4 mb-4 transform transition-transform duration-300 group-hover/card:-translate-y-2"><p className="font-serif italic text-white leading-relaxed text-lg">"{testimonial.quote}"</p></div>
        <div className="transform transition-transform duration-300 group-hover/card:-translate-y-2">
          <div className="border-t border-[#c9a962] w-8 mb-3" />
          <p className="text-white font-semibold tracking-wide uppercase text-sm">{testimonial.name}</p>
          <p className="text-white/70 text-xs uppercase tracking-wider mt-1">{testimonial.location}</p>
        </div>
      </div>
    </div>
  )
}

export default function GuestExperiences({ lang }: any) {
  return (
    <main>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(34, 76, 120)"
        gradientBackgroundEnd="rgb(207, 159, 67)"
        firstColor="34, 76, 120"
        secondColor="207, 159, 67"
        thirdColor="34, 76, 120"
        fourthColor="207, 159, 67"
        fifthColor="34, 76, 120"
        pointerColor="207, 159, 67"
        // UPDATED: Added centering classes here
        containerClassName="py-20 px-4 min-h-screen flex flex-col items-center justify-center"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-14">
            <p className="text-[#cf9f43] text-sm tracking-widest uppercase mb-3">Testimonials</p>
            <h2 className="font-serif text-white text-4xl md:text-5xl italic">Guest Experiences</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </BackgroundGradientAnimation>
    </main>
  )
}