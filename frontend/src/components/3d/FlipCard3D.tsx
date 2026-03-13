import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface FlipCard3DProps {
  frontContent: ReactNode
  backContent: ReactNode
  className?: string
}

export default function FlipCard3D({ frontContent, backContent, className = '' }: FlipCard3DProps) {
  return (
    <div className={`flip-card perspective-1000 w-full h-64 ${className}`}>
      <motion.div
        className="flip-card-inner relative w-full h-full"
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.8 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flip-card-front absolute w-full h-full backface-hidden">
          <div className="w-full h-full glass rounded-2xl flex items-center justify-center">
            {frontContent}
          </div>
        </div>
        <div className="flip-card-back absolute w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full glass-dark rounded-2xl flex items-center justify-center">
            {backContent}
          </div>
        </div>
      </motion.div>
    </div>
  )
}