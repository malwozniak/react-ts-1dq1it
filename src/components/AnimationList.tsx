import React from 'react';
import { Animation } from '../types/animation';

type AnimationListProps = {
  onItemClick: (item: any) => void;
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
        'https://react-ts-1dq1it.stackblitz.io/animation?limit=21&offset=0',
      loading: false,
      searchTerm: '',
    };

    this.handleSearch = this.handleSearch.bind(this);
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

  handleSearch(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.getAnimationDataList().map((item, index) => {
            return (
              <div
                onClick={(e) => this.handleItemClick(item, e)}
                className="col-sm-4 text-center text-capitalize card mb-4 list-item"
                key={item.name}
              >
                <h2>{item.name}</h2>
                <div>
                  <img src={item.sprites.front_default} />
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
