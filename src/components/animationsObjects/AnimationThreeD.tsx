import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { generateRandomAnimation } from '../../functions';

function SphereMove(props) {
  const mesh = useRef();
  const { scene, gl } = useThree();
  const [isContextLost, setContextLost] = useState(false);

  const acceleration = 0.05;
  const bounce_distance = 2;
  const bottom_position_y = 0;
  const time_step = 0.1;
  let time_counter = Math.sqrt((-bounce_distance * 2) / -acceleration);
  const initial_speed = acceleration * time_counter;

  const num = useMemo(() => Math.floor(Math.random() * 16) + 1, []);
  const img = useMemo(
    () =>
      'https://raw.githubusercontent.com/malwozniak/react-ts-1dq1it/main/textures/img' +
      num +
      '.jpg',
    [num]
  );

  const texturesCache = useRef({});

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

  useEffect(() => {
    if (isContextLost) {
      return;
    }

    if (texturesCache.current[img]) {
      scene.background = texturesCache.current[img];
    } else {
      const loader = new THREE.TextureLoader();
      loader.load(img, (texture) => {
        texturesCache.current[img] = texture;
        scene.background = texture;
      });
    }
  }, [img, isContextLost, scene]);

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

export default SphereMove;
