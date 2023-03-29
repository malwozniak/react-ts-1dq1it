/**
 * Utworzenie komponentu z  macierzą wyświtlającą obiekty z animacjami
 */

import React, { useState } from 'react';
import { Animation } from '../types/animation';
import styled from 'styled-components';
import './animationsObjects/AnimationMotion.css';
import { Canvas } from '@react-three/fiber';
import Box from './animationsObjects/AnimationThreeD';
import arrayShuffle from 'array-shuffle';

/** Function generate Random Images */
function RandomImage(props) {
  const style = {
    width: `${100}%`,
    height: `${100}%`,
    display: 'inline-block',
    backgroundImage: `url(https://raw.githubusercontent.com/malwozniak/react-ts-1dq1it/main/textures/img${props.num}.jpg)`,
    transition: 'background-image 1s ease-in-out',
    backgroundSize: `${100}%`,
  };
  // console.log(props.num);

  return <img style={style} alt="" />;
}
0;

/** Function generate Random Number of Cards  */
function generateRandomAnimation(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setIntervalX(callback, delay, repetitions) {
  var x = 0;
  var intervalID = window.setInterval(function () {
    callback();

    if (++x === repetitions) {
      window.clearInterval(intervalID);
    }
  }, delay);
}

type AnimationListProps = {
  onItemClick: (item: any) => void;
};

type AnimationListState = {
  AnimationData: Animation[];
  nextUrl: string;
  loading: boolean;
};

class AnimationList extends React.Component<
  AnimationListProps,
  AnimationListState
> {
  interval: any;
  constructor(props) {
    super(props);
    this.state = {
      AnimationData: [],
      nextUrl:
        'https://raw.githubusercontent.com/malwozniak/react-ts-1dq1it/main/animation.json',
      loading: true,
      refresh: false,
    };
  }

  getAnimationDataList() {
    return this.state.AnimationData;
  }

  componentDidMount() {
    const timerId = setTimeout(() => {
      console.log('First timeout executed');
      this.fetchAnimationListData();

      setTimeout(() => {
        console.log('Second timeout executed');
        this.fetchAnimationListData();

        setTimeout(() => {
          console.log('Third timeout executed');
          this.fetchAnimationListData();
        }, 10000);
      }, 10000);
    }, 10000);
    this.setState({ timerId });
    //  5000);
  }
  componentWillUnmount() {
    clearTimeout(this.state.timerId);
  }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  fetchAnimationListData() {
    this.setState((state, props) => {
      return {
        loading: true,
        refresh: false,
      };
    });
    let newArr = [];

    const ListOfCards = fetch(this.state.nextUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState((state, props) => {
          return {
            nextUrl: data.next,
          };
        });
        data.results.map((item) => {
          fetch(item.url)
            .then((response) => response.json())
            .then((data) => {
              this.setState((state, props) => {
                //  console.log( this.state.AnimationData);

                newArr.push(data);
                let uniqueChars = this.state.AnimationData.filter(
                  (element, index) => {
                    return (
                      this.state.AnimationData.indexOf(element + 1) === index
                    );
                  }
                );
                const AnimationDataa = [...uniqueChars, ...newArr];
                /** Miszanie obiektów tablicy z objektami animacji */
                if (AnimationDataa.length == 16) {
                  // setIntervalX(
                  //   () => {
                  // console.log(AnimationDataa);

                  const AnimationData = arrayShuffle(AnimationDataa);
                  /** Usunięcie pozostałych elementów z tablicy */

                  AnimationData.splice(9, 15);
                  // AnimationData.push(al);
                  // return{ AnimationData}
                  //   },
                  //   1000,
                  //   3
                  // );

                  console.log('Anima', AnimationData);
                  // console.log(AnimationData);

                  return {
                    AnimationData,
                    loading: false,
                    refresh: true,
                  };
                } else {
                  // console.log('AN', AnimationDataa);

                  return {
                    AnimationDataa,
                    loading: false,
                  };
                }
              });
            });
        });
      });
  }

  render() {
    return (
      <AnimationListContainer>
        <AnimationListRow>
          {this.getAnimationDataList().map((item) => {
            // console.log(item.moves[0] ? item.moves[0] : 'ball-movement');

            return (
              <AnimationListBox
                onClick={(e) => this.handleItemClick(item, e)}
                key={item.name}
              >
                <CardContainer>
                  <div className="card">
                    {/* <RandomImage className="card" num={item.order} /> */}
                    <Canvas camera={{ position: [0, 0, 5] }}>
                      <color attach="background" args={['#beb8b8']} />
                      <ambientLight intensity={1} />
                      <pointLight position={[40, 40, 40]} />

                      <Box castShadow position={[0, 0, 0]} />
                    </Canvas>
                  </div>
                  <div className="card">
                    {/* <RandomImage num={item.order} /> */}
                    <div className={true ? 'ball-bouncing' : 'ball-movement'}>
                      <div className="ball"></div>
                    </div>
                  </div>
                  {/*   <Canvas camera={{ position: [0, 0, 5] }}>
                      <color attach="background" args={['#beb8b8']} />
                      <ambientLight intensity={1} />
                      <pointLight position={[40, 40, 40]} />
                      <Box castShadow position={[0, 0, 0]} />
                    </Canvas> */}
                </CardContainer>
              </AnimationListBox>
            );
          })}
        </AnimationListRow>
      </AnimationListContainer>
    );
  }
  //   <div className="card ball-bouncing">
  //   <div className="ball"></div>
  // </div>
  // <div className="card ball-movement">
  //   <div className="ball"></div>
  // </div>

  handleItemClick(item, event) {
    this.props.onItemClick(item);
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom - 10 <= window.innerHeight;
  }
}
const AnimationListRow = styled.div`
  display: grid;
  grid-gap: 3.5rem;
  grid-template-columns: repeat(3, 1fr);
  padding: 4rem;
  text-align: -webkit-center;
   `;
const CardContainer = styled.div`
  
   `;
const AnimationListContainer = styled.div`
  
   `;

const AnimationListBox = styled.div`
      
   `;
export default AnimationList;
