/**
 * Utworzenie komponentu z informacją o profilu animacji
 */

import React from 'react';
import styled from 'styled-components';
import { device } from '../device';
import AnimationTypes from './AnimationTypes';
import { Animation } from '../types/animation';

type AnimationProfileProps = {
  animation: Animation;
  description: string;
};

function AnimationProfile({ animation, description }: AnimationProfileProps) {
  return (
    <Profile>s
      <img width="200" src={animation.sprites.animation_base} />
      <p>{animation.order}</p>
      <Attrs>
        <div>Time: {animation.time} s</div>
      </Attrs>
    </Profile>
  );
}

const Profile = styled.div`
  width: 40%;
`;

const Attrs = styled.div`
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;

  @media ${device.laptop} { 
    text-align: left;
     margin-bottom: 0;
  }
`;

export default AnimationProfile;
