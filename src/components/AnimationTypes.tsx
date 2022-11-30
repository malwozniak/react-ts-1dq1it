/**
 * Utworzenie komponentu z informacją o typie animacji
 */

import React from 'react';
import styled from 'styled-components';
import { AnimationTypeItem } from '../types/animation';

type AnimationTypesProps = {
  types: AnimationTypeItem[];
};

function AnimationTypes({ types }: AnimationTypesProps) {
  return (
    <TypeWrapper>
      <TypeLable>Type:</TypeLable>
      {types.map((item, index) => {
        return <Type key={index}>{item.type.name}</Type>;
      })}
    </TypeWrapper>
  );
}

const TypeWrapper = styled.div`
  margin: 10px 0;
  font-size: 16px;
  text-align: left;
  display: flex;
  align-items: baseline;
  justify-content: center;
`;

const TypeLable = styled.div`
  text-transform: capitalize;
  margin-right: 10px;
`;

const Type = styled.div`
  margin-right: 10px;
  text-transform: capitalize;
  border: solid 1px #CCC;
  padding: 3px 5px;
  border-radius: 4px;
`;

export default AnimationTypes;
