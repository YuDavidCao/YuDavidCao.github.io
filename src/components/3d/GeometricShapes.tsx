import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Icosahedron, Torus, Octahedron, Float } from "@react-three/drei";
import type { Mesh } from "three";
import * as THREE from "three";

interface ShapeProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  rotationSpeed?: number;
}

function FloatingIcosahedron({ position, color, scale = 1, rotationSpeed = 0.3 }: ShapeProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002 * rotationSpeed;
      meshRef.current.rotation.y += 0.003 * rotationSpeed;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Icosahedron ref={meshRef} args={[1, 0]} position={position} scale={scale}>
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.6}
        />
      </Icosahedron>
    </Float>
  );
}

function FloatingTorus({ position, color, scale = 1, rotationSpeed = 0.2 }: ShapeProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003 * rotationSpeed;
      meshRef.current.rotation.z += 0.002 * rotationSpeed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <Torus ref={meshRef} args={[1, 0.3, 16, 32]} position={position} scale={scale}>
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.5}
        />
      </Torus>
    </Float>
  );
}

function FloatingOctahedron({ position, color, scale = 1, rotationSpeed = 0.25 }: ShapeProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.004 * rotationSpeed;
      meshRef.current.rotation.z += 0.002 * rotationSpeed;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.6}>
      <Octahedron ref={meshRef} args={[1, 0]} position={position} scale={scale}>
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.55}
        />
      </Octahedron>
    </Float>
  );
}

interface GeometricShapesProps {
  isDark: boolean;
  mouseX: number;
  mouseY: number;
}

export function GeometricShapes({ isDark, mouseX, mouseY }: GeometricShapesProps) {
  const groupRef = useRef<THREE.Group>(null);

  const colors = useMemo(() => ({
    primary: isDark ? "#818cf8" : "#6366f1",
    secondary: isDark ? "#a78bfa" : "#8b5cf6",
    tertiary: isDark ? "#c4b5fd" : "#a855f7",
  }), [isDark]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseX * 0.1,
        0.02
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseY * 0.05,
        0.02
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Primary shapes - front layer */}
      <FloatingIcosahedron
        position={[-3.5, 1.5, -2]}
        color={colors.primary}
        scale={0.8}
        rotationSpeed={0.4}
      />
      <FloatingTorus
        position={[3.5, -1, -3]}
        color={colors.secondary}
        scale={0.6}
        rotationSpeed={0.3}
      />
      <FloatingOctahedron
        position={[0, 2.5, -4]}
        color={colors.tertiary}
        scale={0.7}
        rotationSpeed={0.35}
      />

      {/* Secondary shapes - back layer */}
      <FloatingIcosahedron
        position={[4, 2, -6]}
        color={colors.tertiary}
        scale={0.5}
        rotationSpeed={0.2}
      />
      <FloatingTorus
        position={[-4, -2, -5]}
        color={colors.primary}
        scale={0.4}
        rotationSpeed={0.25}
      />
      <FloatingOctahedron
        position={[-2, -2.5, -7]}
        color={colors.secondary}
        scale={0.45}
        rotationSpeed={0.3}
      />

      {/* Accent shapes */}
      <FloatingIcosahedron
        position={[2, -2, -4]}
        color={colors.primary}
        scale={0.35}
        rotationSpeed={0.5}
      />
      <FloatingOctahedron
        position={[-1.5, 0.5, -8]}
        color={colors.tertiary}
        scale={0.6}
        rotationSpeed={0.15}
      />
    </group>
  );
}
