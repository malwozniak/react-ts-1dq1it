/**
 * Utworzenie komponentu pokazującego informacje o danej animacji
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AnimationProfile from './AnimationProfile';
import AnimationTypes from './AnimationTypes';
import { device } from '../device';
import { Animation } from '../types/animation';

type AnimationCardProps = {
  animation: Animation;
};

function AnimationCard({ animation }: AnimationCardProps) {
  const [animationDescription, setAnimationDescription] = useState<string>('');
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const fetchAnimationSpecies = async () => {
      const result = await fetch(animation.species.url);
      return await result.json();
    };

    fetchAnimationSpecies().then((data) => {
      const description = data.text_animation
        .filter((item) => {
          return item.language.name === 'en';
        })[0]
        .text_entry.replace(/[^a-zA-Z é . , ']/g, ' ');
      setAnimationDescription(description);
      setIsReady(true);
    });
  }, []);

  return (
    <AnimationCardContainer>
      {isReady && (
        <div>
          <AnimationCardTitle>{animation.name}</AnimationCardTitle>
          <AnimationTypes types={animation.types} />
          <DoubleColumnCard>
            <AnimationProfile
              animation={animation}
              description={animationDescription}
            />
          </DoubleColumnCard>
          <AnimationDescription>{animationDescription}</AnimationDescription>
        </div>
      )}
    </AnimationCardContainer>
  );
}

const AnimationCardContainer = styled.div`
  font-size: 1.5em;
  border-radius: 4px;
`;

const AnimationCardTitle = styled.h3`
  text-transform: capitalize;
  text-align: center;
`;

const DoubleColumnCard = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;

  @media ${device.laptop} { 
   flex-direction: row; 
  }
`;

const AnimationDescription = styled.div`
  font-size: 16px;
  text-align: left;
  margin-top: 20px;
`;

export default AnimationCard;
