import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Box(props) {
  const mesh = useRef();
  useFrame(
    () => (
 
      (mesh.current.position.y += 0.01),
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
