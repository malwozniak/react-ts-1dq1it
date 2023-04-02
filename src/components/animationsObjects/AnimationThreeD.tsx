import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { generateRandomAnimation } from '../../functions';

let acceleration = 0.05;
let bounce_distance = 2;
let bottom_position_y = 0;
let time_step = 0.1;
let time_counter = Math.sqrt((-bounce_distance * 2) / -acceleration);
let initial_speed = acceleration * time_counter;

function Box(props) {
  const mesh = useRef();
  const { scene, gl } = useThree();
  const [isContextLost, setContextLost] = useState(false);

  var num = Math.floor(Math.random() * 16) + 1;
  let img =
    'https://raw.githubusercontent.com/malwozniak/react-ts-1dq1it/main/textures/img' +
    num +
    '.jpg';

  const texture = useLoader(THREE.TextureLoader, img);

  useEffect(() => {
    const onContextLost = (event) => {
      event.preventDefault();
      setContextLost(true);
    };

    const onContextRestored = () => {
      setContextLost(false);
    };

    gl.domElement.addEventListener('webglcontextlost', onContextLost, false);
    gl.domElement.addEventListener(
      'webglcontextrestored',
      onContextRestored,
      false
    );

    return () => {
      gl.domElement.removeEventListener(
        'webglcontextlost',
        onContextLost,
        false
      );
      gl.domElement.removeEventListener(
        'webglcontextrestored',
        onContextRestored,
        false
      );
    };
  }, [gl]);

  if (isContextLost) {
    return null; // Return null when context is lost
  }

  scene.background = texture;

  useFrame(() => {
    if (num % 2) {
      if (mesh.current.position.x < bottom_position_y) {
        time_counter = 0;
      }
      mesh.current.position.x =
        bottom_position_y +
        initial_speed * time_counter -
        0.5 * acceleration * time_counter * time_counter;
      time_counter += time_step;
    } else {
      if (mesh.current.position.y < bottom_position_y) {
        time_counter = 0;
      }
      mesh.current.position.y =
        bottom_position_y +
        initial_speed * time_counter -
        0.5 * acceleration * time_counter * time_counter;
      time_counter += time_step;
    }
  });

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
