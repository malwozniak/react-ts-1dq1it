import { Point } from '../../../types/animation';
const ballr = document.querySelector('.ballr') as HTMLElement;

function animateBall(): void {
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

  ballr.animate(keyframes, options);
}

function getRandomNumber(min: number, max: number): number {
  const num: number = Math.floor(Math.random() * (max - min + 1) + min);
  console.log(num);
  return num;
}

function getDistance(p1: Point, p2: Point): number {
  const dx: number = p2.x - p1.x;
  const dy: number = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export default animateBall();
