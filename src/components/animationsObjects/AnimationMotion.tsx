import React, { useState, useEffect } from 'react';
import './AnimationMotion.css';
import { generateRandomAnimation, RandomImage } from '../../functions';
import './move/RandomMove';
import RandomMove from './move/RandomMove';

export default function AnimationMotion() {
  const [items, setItems] = useState([
    <div className="card ball-bouncing" key="ball-up">
      <RandomImage num={generateRandomAnimation(1, 16)} />
      <div className="ball"></div>
    </div>,
    <RandomMove key="ball-random" />,
    <div className="card ball-bouncing-down" key="ball-down">
      <RandomImage num={generateRandomAnimation(1, 16)} />
      <div className="ball"></div>
    </div>,
    <div className="card ball-bouncing-left" key="ball-left">
      <RandomImage num={generateRandomAnimation(1, 16)} />
      <div className="ball"></div>
    </div>,
    <div className="card ball-bouncing-right" key="ball-right">
      <RandomImage num={generateRandomAnimation(1, 16)} />
      <div className="ball"></div>
    </div>,
  ]);
  const [animationNum, setAnimationNum] = useState(
    generateRandomAnimation(1, 16)
  );

  useEffect(() => {
    const newItems = items.map((item) => {
      return React.cloneElement(item, {
        children: [
          <RandomImage num={animationNum} />,
          <div className="ball"></div>,
        ],
      });
    });
    setItems(newItems);
  }, [animationNum]);

  return (
    <div className="card-container">
      {/* <div className="card square-card">
        <div className="down">
          <div className="up">
            <div className="squeeze">
              <div className="rotate-in">
                <div className="rotate-out">
                  <div className="square"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <RandomImage num={generateRandomAnimation(1, 15)} /> */}
      {items[Math.round(Math.random() * 2)]}
      {/* {items[Math.round(Math.random() * 1)]} */}
      {/* <div className="card counter"></div>

      <div className="card text-movement"></div> */}
    </div>
  );
}

/**W tym zaktualizowanym kodzie zmienna stanu animationNum jest używana do przechowywania losowego numeru animacji, a jest zawarta w tablicy zależności hooka useEffect. Hook mapuje tablicę items i klonuje każdy element z nowym animationNum jako właściwością dla komponentu RandomImage. To zapewnia, że hook useEffect zostanie uruchomiony tylko wtedy, gdy zmienna stanu animationNum zostanie zmieniona, zapobiegając nieskończonej pętli i rozwiązując błąd. */
