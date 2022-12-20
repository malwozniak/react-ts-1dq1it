import * as React from 'react';
import './AnimationMotion.css';

export default function AnimationMotion() {
  return (
    <main className="card-container">
      <div className="card square-card">
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
      </div>
      <div className="card ball-bouncing">
        <div className="ball"></div>
      </div>
      <div className="card ball-movement">
        <div className="ball"></div>
      </div>
      <div className="card counter"></div>

      <div className="card text-movement"></div>
    </main>
  );
}
