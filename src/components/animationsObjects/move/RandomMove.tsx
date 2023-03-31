import { useState, useEffect } from 'react';
import { Point } from '../../../types/animation';
import {
  generateRandomAnimation,
  getDistance,
  getRandomNumber,
  RandomImage,
} from '../../../functions';
import React = require('react');
import './RandomMove.css';
import '../AnimationMotion.css';

function RandomMove(): JSX.Element {
  const [style, setStyle] = useState({ transform: 'translate(0, 0)' });

  useEffect(() => {
    const ballr = document.querySelector('.ballr') as HTMLElement;

    function moveBall(): void {
      const startPoint: Point = { x: 0, y: 0 };
      const endPoint: Point = {
        x: getRandomNumber(-3, 3),
        y: getRandomNumber(-3, 3),
      };
      const distance: number = getDistance(startPoint, endPoint);
      const speed: number = 0.33; // in pixels per second
      const duration: number = (distance / speed) * 1000;
      const keyframes: Keyframe[] = [];

      for (let i: number = 0; i < 50; i++) {
        const x: number = getRandomNumber(-3, 3);
        const y: number = getRandomNumber(-3, 3);

        keyframes.push({ transform: `translate(${x}rem, ${y}rem)` });
      }

      keyframes.unshift({ transform: 'translate(0, 0)' });
      keyframes.push({ transform: 'translate(0, 0)' });
      const options: KeyframeAnimationOptions = {
        duration,
        easing: 'linear',
        iterations: Infinity,
      };

      const animation = ballr.animate(keyframes, options);

      // Update state with the latest animation styles
      animation.addEventListener('finish', () => {
        const computedStyles = (animation.effect as any).getCurrentStyle();
        setStyle({ ...style, ...computedStyles.transform });
      });
    }

    moveBall();
  }, []); // Run once on mount

  return (
    <div className="card ball-movement">
      <RandomImage num={generateRandomAnimation(1, 16)} />
      <div className="ballr" style={style}></div>
    </div>
  );
}

export default RandomMove;
