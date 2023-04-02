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
import AnimationMotion from './animationsObjects/AnimationMotion';
import { setIntervalX } from '../functions';

type AnimationListProps = {
  onItemClick: (item: any) => void;
};

type AnimationListState = {
  AnimationData: Animation[];
  nextUrl: string;
  loading: boolean;
  showCards: boolean;
  timeElapsed: number; // add a variable to track the time elapsed
};

class AnimationList extends React.Component<
  AnimationListProps,
  AnimationListState
> {
  interval: any;
  components: JSX.Element[];
  constructor(props) {
    super(props);
    this.components = [
      <Canvas camera={{ position: [0, 0, 5] }} key="objectThree">
        <color attach="background" args={['#888888']} />
        <ambientLight intensity={1} />
        <pointLight position={[40, 40, 40]} />

        <Box castShadow position={[0, 0, 0]} />
      </Canvas>,
      // <div className="ball-bouncing">
      //   <div className="ball"></div>
      // </div>,
      <AnimationMotion key="objectTwo" />,
    ];
    this.state = {
      AnimationData: [],
      nextUrl:
        'https://raw.githubusercontent.com/malwozniak/react-ts-1dq1it/main/animation.json',
      loading: false,
      refresh: false,
      showCards: false,
      timeElapsed: 0, // add a variable to track the time elapsed
    };
  }

  getAnimationDataList() {
    return this.state.AnimationData;
  }

  componentDidMount() {
    // set up an interval to update the state every 10 seconds
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timeElapsed: prevState.timeElapsed + 1,
        showCards: prevState.timeElapsed % 2 === 0, // show cards every other interval
      }));
      this.fetchAnimationListData();
      if (this.state.timeElapsed >= 6) {
        // stop after 60 seconds (6 intervals)
        clearInterval(this.interval);
      }
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval); // clear the interval when the component is unmounted
  }

  fetchAnimationListData() {
    this.setState((state, props) => {
      return {
        loading: true,
        refresh: false,
      };
    });
    let newArr = [];

    fetch(this.state.nextUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState((state, props) => {
          return {
            nextUrl: data.next,
          };
        });
        data.results.map((item) => {
          fetch(item.url)
            .then((response) => {
              console.log('Response', response); // add this line to log the response
              return response.json();
            })
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
    const { showCards } = this.state;
    const cardsToShow = showCards ? this.getAnimationDataList() : [];

    return (
      <AnimationListContainer>
        <AnimationListRow>
          {cardsToShow.map((item, index) => {
            return (
              <AnimationListBox
                onClick={(e) => this.handleItemClick(item, e)}
                key={item.name}
              >
                <CardContainer>
                  <div className="card">
                    {/* {console.log('COMP', this.components)} */}
                    {/* <RandomImage className="card" num={item.order} /> */}
                    {this.components[Math.round(Math.random() * 1)]}
                  </div>
                  {/* <div className="card"> */}

                  {/* </div> */}
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
