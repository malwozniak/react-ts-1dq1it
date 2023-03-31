import React, { useState } from 'react';
import './AnimationMotion.css';
import { generateRandomAnimation } from '../../functions';

const items = [
  <div className="card ball-bouncing">
    <div className="ball"></div>
  </div>,
  <div className="card ball-movement">
    <div className="ball"></div>
  </div>,
];


export default function AnimationMotion() {
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
      <RandomImage num={generateRandomAnimation(1, 15)} />
      {items[Math.round(Math.random() * 1)]}
      {/* <div className="card counter"></div>

      <div className="card text-movement"></div> */}
    </div>
  );
}
