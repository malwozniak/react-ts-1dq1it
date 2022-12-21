/**
 * Utworzenie komponentu z  macierzą wyświtlającą obiekty z animacjami
 */

import React from 'react';
import { Animation } from '../types/animation';
import styled from 'styled-components';
import './animationsObjects/AnimationMotion.css';
import { Canvas } from '@react-three/fiber';
import Box from './animationsObjects/AnimationThreeD'

type AnimationListProps = {
  onItemClick: (item: any) => void;
  scrollable: boolean;
};

const animationArray = [9, 4, 2, 1];
type AnimationListState = {
  AnimationData: Animation[];
  nextUrl: string;
  loading: boolean;
  searchTerm: string;
};

class AnimationList extends React.Component<
  AnimationListProps,
  AnimationListState
> {
  constructor(props) {
    super(props);
    this.state = {
      AnimationData: [],
      nextUrl:
        'https://raw.githubusercontent.com/malwozniak/react-ts-1dq1it/main/animation.json',

      searchTerm: '',
    };
  }

  getAnimationDataList() {
    if (this.state.searchTerm != '') {
      return this.state.AnimationData.filter((animation) => {
        return (
          animation.name
            .toLowerCase()
            .indexOf(this.state.searchTerm.toLowerCase()) !== -1
        );
      });
    }

    return this.state.AnimationData;
  }

  componentDidMount() {
    this.fetchAnimationListData();
  }
  generateRandomAnimation(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  getRandomData(data) {
    // console.log(data.results.length);
    var x = this.generateRandomAnimation(1, data.results.length);
    return x;
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  fetchAnimationListData() {
    this.setState((state, props) => {
      return {
        loading: true,
      };
    });

    const newArray = [];
    setTimeout(() => {
      fetch(this.state.nextUrl)
        .then((response) => response.json())
        .then((data) => {
          // console.log(this.getRandomData(data));
          this.setState((state, props) => {
            return {
              nextUrl: data.next,
            };
          });
          const numberAnimation =
            animationArray[this.generateRandomAnimation(0, 3)];

          data.results.map((item) => {
            fetch(item.url)
              .then((response) => response.json())
              .then((data) => {
                this.setState((state, props) => {
                  const AnimationData = [...this.state.AnimationData, data];

                  return {
                    AnimationData,
                    loading: false,
                  };
                });
              });

            newArray.push(data.results[this.generateRandomAnimation(0, 15)].id);

            // console.log(data.results[this.generateRandomAnimation(0,15)]);
            // console.log(data)
            //
          });
          newArray.map((e, i, a) => (a.indexOf(e) === i ? e : false));

          console.log(newArray);
          // data.results.length = numberAnimation;
        });
    }, 1000);
  }

  render() {
    return (
      <AnimationListContainer>
        <AnimationListRow>
          {this.getAnimationDataList().map((item, index) => {
            return (
              <AnimationListBox
                onClick={(e) => this.handleItemClick(item, e)}
                key={item.name}
              >
                <div className="card-container">
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
                
                  <div className="card text-movement"></div>

                  <Canvas camera={{ position: [0, 0, 5] }}>
                  <color attach="background" args={['#beb8b8']} />
        <ambientLight intensity={1} />
        <pointLight position={[40, 40, 40]} />
        <Box castShadow position={[0, 0, 0]} />
      </Canvas>
                </div>
                
                
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
     
 `;
const AnimationListContainer = styled.div`
    
 `;

const AnimationListBox = styled.div`
    
 `;
const AnimationListImage = styled.div`
 
 `;
export default AnimationList;
