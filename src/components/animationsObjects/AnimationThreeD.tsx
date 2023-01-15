import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
let acceleration = 0.5;
let bounce_distance = 2;
let bottom_position_y = 0;
let time_step = 0.03;
// time_counter  jest obliczany jako czas, w którym kulka osiągnęła górną pozycję
// to jest po prostu obliczane za pomocą wzoru s = (1/2)gt*t, co ma miejsce w przypadku upuszczenia piłki z górnej pozycji
//od góry do dołu
let time_counter = Math.sqrt((-bounce_distance * 2) / -acceleration);

//od dołu do góry
// let time_counter = Math.sqrt((bounce_distance * 2) / acceleration);
let initial_speed = acceleration * time_counter;
function Box(props) {
  const mesh = useRef();
  const { scene } = useThree();
  function generateRandomAnimation(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  var num = generateRandomAnimation(1, 15);
  let img =
    `https://raw.githubusercontent.com/malwozniak/react-ts-1dq1it/main/textures/img` +
    num +
    `.jpg`;

  const texture = useLoader(THREE.TextureLoader, img);

  scene.background = texture;
  useFrame(() => {
    if (num % 2) {
      if (mesh.current.position.x < bottom_position_y) {
        time_counter = 0;
      }
      // console.log(mesh.current.position.y);
      mesh.current.position.x =
        bottom_position_y +
        initial_speed * time_counter -
        0.5 * acceleration * time_counter * time_counter;
      // advance time
      time_counter += time_step;
    } else {
      if (mesh.current.position.y < bottom_position_y) {
        time_counter = 0;
      }
      // console.log(mesh.current.position.y);
      mesh.current.position.y =
        bottom_position_y +
        initial_speed * time_counter -
        0.5 * acceleration * time_counter * time_counter;
      // advance time
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
