<<<<<<< HEAD
import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function FloatingSphere({ position, color, speed, distort }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(clock.getElapsedTime() * speed) * 0.002
      meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <Sphere ref={meshRef} position={position} args={[1, 64, 64]} scale={2}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={speed}
        roughness={0.2}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </Sphere>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 50
      const y = (Math.random() - 0.5) * 50
      const z = (Math.random() - 0.5) * 50
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [])

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0001
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#8b5cf6"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        
        <FloatingSphere position={[-4, 0, -5]} color="#3b82f6" speed={0.5} distort={0.4} />
        <FloatingSphere position={[4, -2, -8]} color="#8b5cf6" speed={0.8} distort={0.6} />
        <FloatingSphere position={[0, 3, -10]} color="#ec4899" speed={0.3} distort={0.5} />
        
        <ParticleField />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.1}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
=======
import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function FloatingSphere({ position, color, speed, distort }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(clock.getElapsedTime() * speed) * 0.002
      meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <Sphere ref={meshRef} position={position} args={[1, 64, 64]} scale={2}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={speed}
        roughness={0.2}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </Sphere>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 50
      const y = (Math.random() - 0.5) * 50
      const z = (Math.random() - 0.5) * 50
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [])

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0001
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#8b5cf6"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        
        <FloatingSphere position={[-4, 0, -5]} color="#3b82f6" speed={0.5} distort={0.4} />
        <FloatingSphere position={[4, -2, -8]} color="#8b5cf6" speed={0.8} distort={0.6} />
        <FloatingSphere position={[0, 3, -10]} color="#ec4899" speed={0.3} distort={0.5} />
        
        <ParticleField />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.1}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
>>>>>>> 04152c3a04bf1be989cc79a4773d290ba1b79e95
}