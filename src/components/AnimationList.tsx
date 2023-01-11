/**
 * Utworzenie komponentu z  macierzą wyświtlającą obiekty z animacjami
 */

import React from 'react';
import { Animation } from '../types/animation';
import styled from 'styled-components';
import './animationsObjects/AnimationMotion.css';
import { Canvas } from '@react-three/fiber';
import Box from './animationsObjects/AnimationThreeD';
import arrayShuffle from 'array-shuffle';
const imgQty = 9;

function RandomImage(props) {
  const style = {
    width: `${100}%`,
    height: `${100}%`,
    display: 'inline-block',
    backgroundImage: `url(https://raw.githubusercontent.com/malwozniak/react-ts-1dq1it/main/textures/img${props.num}.jpg)`,
    transition: 'background-image 1s ease-in-out',
    backgroundSize: `${100}%`,
  };

  return <a href="#" style={style} />;
}
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
  s;
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
    // setInterval(() => {
    fetch(this.state.nextUrl)
      .then((response) => response.json())
      .then((data) => {
        // console.log(this.getRandomData(data));
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
                const AnimationData = [...this.state.AnimationData, data];

                return {
                  AnimationData,
                  loading: false,
                  numbers: arrayShuffle(newArray),
                };
              });
            });

          newArray.push(data.results[this.generateRandomAnimation(0, 15)].id);

          // console.log(data.results[this.generateRandomAnimation(0,15)]);
          // console.log(data)
          //
        });
        newArray.map((e, i, a) => (a.indexOf(e) === i ? e : false));

        // data.results.length = numberAnimation;
      });
    // }, 10000);
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
                <CardContainer>
                  <div className="card ball-movement">
                    <RandomImage className="card" num={item.order} />
                    <div className="ball"></div>
                  </div>
                  <div></div>
                  {/* <div className="card ball-bouncing">
        <div className="ball"></div>
      </div>
                  <Canvas camera={{ position: [0, 0, 5] }}>
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
grid-gap: 2rem;
grid-template-columns: repeat(3, 1fr);
padding: 2rem;
 `;
const CardContainer = styled.div`

 `;
const AnimationListContainer = styled.div`

 `;

const AnimationListBox = styled.div`
    
 `;
export default AnimationList;
