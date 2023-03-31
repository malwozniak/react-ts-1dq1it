import React, { useState, useEffect } from 'react';
import './AnimationMotion.css';
import { generateRandomAnimation, RandomImage } from '../../functions';

export default function AnimationMotion() {
  const [items, setItems] = useState([
    <div className="card ball-bouncing">
      <RandomImage num={generateRandomAnimation(0, 15)} />
      <div className="ball"></div>
    </div>,
    <div className="card ball-movement">
      <RandomImage num={generateRandomAnimation(0, 15)} />
      <div className="ball"></div>
    </div>,
  ]);
  const [animationNum, setAnimationNum] = useState(
    generateRandomAnimation(0, 15)
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
      {items[Math.round(Math.random() * 1)]}
      {/* {items[Math.round(Math.random() * 1)]} */}
      {/* <div className="card counter"></div>

      <div className="card text-movement"></div> */}
    </div>
  );
}
