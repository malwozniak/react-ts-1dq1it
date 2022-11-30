import React from 'react';
import Loader from 'react-loader-spinner';

import { Animation } from '../types/animation';

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
    document.addEventListener('scroll', this.trackScrolling);
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

          document.addEventListener('scroll', this.trackScrolling);

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
          <div className="my-4 p-0">
            <input
              onChange={this.handleSearch}
              value={this.state.searchTerm}
              className="form-control"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
          </div>

          {this.getAnimationDataList().map((item, index) => {
            return (
              <div
                onClick={(e) => this.handleItemClick(item, e)}
                className="col-sm-4 text-center text-capitalize card mb-4 list-item"
                key={item.name}
              >
                <h2>{item.name}</h2>
                <div>
                  <img src={item.sprites.animation_base} />
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

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementsByClassName('container')[0];
    if (this.isBottom(wrappedElement) && this.props.scrollable === true) {
      document.removeEventListener('scroll', this.trackScrolling);
      this.fetchAnimationListData();
    }
  };
}

export default AnimationList;
