import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

interface ThreeDModelProps {
  modelPath: string;
  scale?: number;
  cameraPosition?: [number, number, number];
  fov?: number;
  lookAt?: [number, number, number];
}

const ThreeDModel: React.FC<ThreeDModelProps> = ({
  modelPath,
  scale = 1,
  cameraPosition = [0, 0, 10],
  fov = 45,
  lookAt = [0, 0, 0],
}) => {
  function Model() {
    const { scene } = useGLTF(modelPath);
    return <primitive object={scene} scale={scale} />;
  }

  // Subcomponente para inicializar cámara y controles
  const CameraInitializer: React.FC<{ lookAt: [number, number, number]; controlsRef: any }> = ({
    lookAt,
    controlsRef,
  }) => {
    const { camera } = useThree();

    useEffect(() => {
      camera.position.set(...cameraPosition);
      camera.lookAt(...lookAt);
      camera.updateProjectionMatrix();

      if (controlsRef.current) {
        controlsRef.current.target.set(...lookAt);
        controlsRef.current.update();
      }
    }, [camera, controlsRef, lookAt]);

    return null;
  };

  const controlsRef = useRef<any>(null);

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

        <OrbitControls ref={controlsRef} enableZoom={true} />
        <CameraInitializer lookAt={lookAt} controlsRef={controlsRef} />
      </Canvas>
    </div>
  );
};

export default ThreeDModel;
