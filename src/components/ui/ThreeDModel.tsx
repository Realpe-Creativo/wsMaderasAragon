// src/components/ThreeDModel.tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

interface ThreeDModelProps {
  modelPath: string;
  scale?: number;
  cameraPosition?: [number, number, number];
  fov?: number;
}

const ThreeDModel: React.FC<ThreeDModelProps> = ({
  modelPath,
  scale = 1,
  cameraPosition = [0, 0, 10],
  fov = 45,
}) => {
  // Definimos el sub-componente Model que carga la ruta desde props
  function Model() {
    const { scene } = useGLTF(modelPath);
    return <primitive object={scene} scale={scale} />;
  }

  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: cameraPosition, fov }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1} color="#ffffff" />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, 10]} intensity={1.2} />
        <pointLight position={[0, 5, -5]} intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" castShadow />
        <directionalLight position={[-5, -5, 5]} intensity={0.8} color="#ddddff" castShadow />

        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default ThreeDModel;
