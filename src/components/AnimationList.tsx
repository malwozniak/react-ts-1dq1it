/**
 * Utworzenie komponentu z  macierzą wyświtlającą obiekty z animacjami
 */

import React from 'react';
import { Animation } from '../types/animation';
import styled from 'styled-components';
// import './animationsObjects/AnimationMotion.css';

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
              <AnimationListBox className="card"
                onClick={(e) => this.handleItemClick(item, e)}
                key={item.name}
              >
                <AnimationListImage className=" ball-bouncing">
                  <div className="ball"></div>
                </AnimationListImage>
              </AnimationListBox>
            );
          })}
        </AnimationListRow>
      </AnimationListContainer>
    );
  }

  handleItemClick(item, event) {
    this.props.onItemClick(item);
  }

  isBottom(el) {
    return el.getBoundisngClientRect().bottom - 10 <= window.innerHeight;
  }
}

const AnimationListRow = styled.div`
     display: grid;
     grid-gap: 10px;
     grid-template-columns: repeat(3, 1fr);
     grid-template-rows: repeat(3, 1fr);
     justify-items: center;
 `;
const AnimationListContainer = styled.div`
    
 `;

const AnimationListBox = styled.div`
    
  align-items: center;
  border-radius: 0.25rem;
  box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  background-color: var(--gray-card);
  height: 10rem;
  justify-content: center;
  position: relative;
  width: 100%;

 `;
const AnimationListImage = styled.div`
 
.ball {
  background-color: var(--white);
  border-radius: 50%;
  height: 3rem;
  position: absolute;
  width: 3rem;
}

/* Ball bouncing */
  animation: shadowBouncing 1.2s ease-in infinite;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  bottom: 2rem;
  content: '';
  height: 0.15rem;
  position: absolute;
  width: 2rem;


.ball-bouncing .ball {
  animation: ballBouncing 1.2s ease-in infinite;
  bottom: 2.1rem;
  transform-origin: bottom;
}

@keyframes ballBouncing {
  0%,
  100% {
    transform: scale(1.5, 0.5);
  }
  20% {
    transform: scaleY(1.2);
  }
  40%,
  80% {
    transform: translateY(-14rem);
  }
  70% {
    transform: translateY(-15rem);
  }
  90% {
    transform: translateY(0);
  }
}

@keyframes shadowBouncing {
  0%,
  100% {
    transform: scale(2, 0.8);
  }
  20% {
    transform: scale(1.2, 0.8);
  }
  40%,
  80% {
    transform: scale(0.5, 0.2);
  }
  70% {
    transform: scale(0.5, 0.15);
  }
  90% {
    transform: scale(1.5, 0.6);
  }
}
/* End ball bouncing */
 `;
export default AnimationList;
