import React, { ReactNode, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  glare?: boolean
}

export default function TiltCard({ children, className = '', glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      const width = rect.width
      const height = rect.height
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const xPercent = mouseX / width - 0.5
      const yPercent = mouseY / height - 0.5
      x.set(xPercent)
      y.set(yPercent)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glare && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2), transparent 70%)',
            opacity: useTransform(x, [-0.5, 0.5], [0.3, 0.7]),
          }}
        />
      )}
    </motion.div>
  )
}