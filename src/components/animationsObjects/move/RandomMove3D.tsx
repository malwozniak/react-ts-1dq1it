import * as THREE from 'three';
import React, { useRef } from 'react';
import { useFrame, useLoader } from 'react-three-fiber';
import { generateRandomAnimation, RandomImage } from '../../../functions';

function RandomMove3D() {
  const mesh = useRef();

  //Zdefiniuj losową pozycję dla kuli
  const randomPosition = () => {
    return {
      x: Math.random() * 10 - 3, // Randomowwa wartość pomiędzy -3 a 3
      y: Math.random() * 10 - 3,
      z: Math.random() * 10 - 3,
    };
  };

  //Zdefiniuj losową prędkość dla kuli
  const randomSpeed = () => {
    return Math.random() * 0.1;
  };

  //Ustawienie początkowego położenia i prędkości kuli
  let position = randomPosition();
  let speed = randomSpeed();
  // Ładuję losowy obrazek
  const texture = useLoader(
    THREE.TextureLoader,
    `https://raw.githubusercontent.com/malwozniak/react-ts-1dq1it/main/textures/img${
      Math.floor(Math.random() * 16) + 1
    }.jpg`
  );
  // Użycie hook'a useFrame, aby aktualizować pozycję sfery co klatkę
  useFrame(() => {
    // Uaktualnienie pozycji kuli na podstawie jej aktualnej pozycji, prędkości i czasu, który upłynął od ostatniej klatki
    mesh.current.position.x += speed * (position.x - mesh.current.position.x);
    mesh.current.position.y += speed * (position.y - mesh.current.position.y);
    mesh.current.position.z += speed * (position.z - mesh.current.position.z);

    // Jeśli kula jest wystarczająco blisko pozycji docelowej, wybierz dla niej nową losową pozycję i prędkość
    if (mesh.current.position.distanceTo(position) < 0.1) {
      position = randomPosition();
      speed = randomSpeed();
    }
  });

  return (
    <mesh>
      <mesh>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial attach="material" map={texture} />
      </mesh>
      <mesh ref={mesh}>
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />

        <meshStandardMaterial
          attach="material"
          color="gray"
          transparent
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
    </mesh>
  );
}

export default RandomMove3D;
/**W tym przykładzie komponent Sphere tworzy kulę z losową pozycją początkową i prędkością, a następnie aktualizuje jej pozycję w każdej klatce, aby poruszać się w kierunku nowej losowej pozycji z losową prędkością. Do renderowania sceny używany jest komponent Canvas z react-three-fiber. */
