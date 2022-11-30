import React from 'react';
import { Animation } from '../types/animation';
import '../../style.css';
type AnimationListProps = {
  onItemClick: (item: any) => void;
  scrollable: boolean;
};

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

  fetchAnimationListData() {
    this.setState((state, props) => {
      return {
        loading: true,
      };
    });

    setTimeout(() => {
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
          });
        });
    }, 1000);
  }

  render() {
    return (
      <div className="container">
        <div className="row" id="grid-9">
          {this.getAnimationDataList().map((item, index) => {
            return (
              <div
                onClick={(e) => this.handleItemClick(item, e)}
                key={item.name}
              >
                <div>
                  <img src={item.sprites.animation_base} width="100" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  handleItemClick(item, event) {
    this.props.onItemClick(item);
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom - 10 <= window.innerHeight;
  }
}

export default AnimationList;
