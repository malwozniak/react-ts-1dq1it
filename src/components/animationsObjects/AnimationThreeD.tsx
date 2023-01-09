import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

function Box(props) {
  const mesh = useRef();
  const { scene } = useThree();

  //const texture = useLoader(THREE.TextureLoader, "textures/skybox.jpg");

  //scene.background = texture;
  useFrame(
    () => (
      (mesh.current.position.y += 0.01),
      // translateX(1.0);

      (mesh.current.position.y -= 0.004)
    )
  );
  return (
    <mesh {...props} ref={mesh}>
      <sphereGeometry attach="geometry" args={[2, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}
export default Box;
