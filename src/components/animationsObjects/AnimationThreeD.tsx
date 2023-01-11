import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
let acceleration = 0.1;
let bounce_distance = 0.3;
let bottom_position_y = 0;
let time_step = 0.03;
// time_counter is calculated to be the time the ball just reached the top position
// this is simply calculated with the s = (1/2)gt*t formula, which is the case when ball is dropped from the top position
let time_counter = Math.sqrt(bounce_distance * 2 / acceleration);
let initial_speed = acceleration * time_counter;
function Box(props) {
  const mesh = useRef();
  const { scene } = useThree();
  const texture = useLoader(THREE.TextureLoader, "https://raw.githubusercontent.com/malwozniak/react-ts-1dq1it/main/textures/img3.jpg");

  scene.background = texture;
  useFrame(
    () => {
      if (mesh.current.position.y < bottom_position_y) {
        time_counter = 0;
      }
        mesh.current.position.y = bottom_position_y + initial_speed * time_counter - 0.5 * acceleration * time_counter * time_counter;
        // advance time
        time_counter += time_step;
  
      
    }
  );
  return (
    <mesh {...props} ref={mesh}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="gray"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}
export default Box;
