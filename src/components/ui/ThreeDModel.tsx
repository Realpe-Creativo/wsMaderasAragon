// components/ThreeDModel.tsx
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/models/blue_whale.glb'); // Ruta del modelo 3D
  return <primitive object={scene} scale={1} />;
}

const ThreeDModel: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }} // Alejamos la cámara
        style={{ height: '100%', width: '100%' }}
      >
        <ambientLight intensity={1} color={"#ffffff"} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, 10]} intensity={1.2} />
        <pointLight position={[0, 5, -5]} intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color={"#ffffff"} castShadow />
        <directionalLight position={[-5, -5, 5]} intensity={0.8} color={"#ddddff"} castShadow />

        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default ThreeDModel;
