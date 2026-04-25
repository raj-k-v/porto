import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const mouseGlobal = new THREE.Vector2(0, 0);
const targetGlobal = new THREE.Vector2(0, 0);

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    targetGlobal.x = (e.clientX / window.innerWidth) * 2 - 1;
    targetGlobal.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

const GridShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#cba6f7') },
    uMouse: { value: new THREE.Vector2(0, 0) },
  },
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    varying float vDist;
    
    void main() {
      vec3 pos = position;
      
      // Calculate mouse target in world space (approximated)
      vec2 mousePos = uMouse * vec2(18.0, 10.0) - vec2(0.0, 5.0);
      float dist = distance(pos.xz, mousePos);
      vDist = dist;

      float ripple = 0.0;
      if (dist < 5.0) {
        ripple = sin(dist * 2.0 - uTime * 6.0) * 0.8 * max(0.0, 1.0 - dist / 5.0);
      }
      
      pos.y += ripple;
      pos.y += sin(pos.x * 0.4 + uTime) * 0.3;
      pos.y += cos(pos.z * 0.4 + uTime * 0.7) * 0.3;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = 0.12 * (300.0 / -mvPosition.z); // Increased size for glow
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying float vDist;
    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5));
      if (dist > 0.5) discard;
      
      // Multi-layer glow effect
      float core = smoothstep(0.5, 0.4, dist);
      float glow = pow(1.0 - dist * 2.0, 2.0);
      
      float alpha = (core + glow * 0.4) * 0.8 * max(0.0, 1.0 - vDist / 18.0);
      gl_FragColor = vec4(uColor, alpha); 
    }
  `
};

function InteractiveGrid({ color }: { color: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<any>(null);

  const [positions] = useMemo(() => {
    const size = 45; 
    const spacing = 0.6;
    const pos = new Float32Array(size * size * 3);
    
    let i = 0;
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        pos[i * 3] = (x - size / 2) * spacing;
        pos[i * 3 + 1] = -3; 
        pos[i * 3 + 2] = (z - size / 2) * spacing - 5;
        i++;
      }
    }
    return [pos];
  }, []);

  useFrame((state) => {
    if (!materialRef.current) return;
    mouseGlobal.lerp(targetGlobal, 0.1);
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value.copy(mouseGlobal);
    materialRef.current.uniforms.uColor.value.set(color);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial 
        ref={materialRef}
        args={[GridShaderMaterial]}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingAtmosphere() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40; 
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40; 
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5; 
    }
    return [pos];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.z += delta * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function WebGLScene({ 
  accentColor = '#cba6f7',
  showParticles = true,
  showGrid = true
}: { 
  accentColor?: string;
  showParticles?: boolean;
  showGrid?: boolean;
}) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      <Canvas 
        camera={{ position: [0, 2, 8], fov: 60, rotation: [-0.15, 0, 0] }}
        dpr={1} // Cap DPR to 1 for maximum performance
        performance={{ min: 0.5 }}
      >
        <fog attach="fog" args={['#000', 5, 25]} />
        {showGrid && <InteractiveGrid color={accentColor} />}
        {showParticles && <FloatingAtmosphere />}
      </Canvas>
    </div>
  );
}
