import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Box(props) {
  const mesh = useRef();
  useFrame(
    () => (
      (mesh.current.rotation.y = mesh.current.rotation.x += 0.02),
      (mesh.current.position.y += 0.003),
      (mesh.current.position.y -= 0.004)
    )
  );
  return (
    <mesh {...props} ref={mesh}>
      <sphereBufferGeometry args={[2, 20, 20]} />
      <meshStandardMaterial color={'#fff'} />
    </mesh>
  );
}
export default Box;
