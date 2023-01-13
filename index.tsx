/**
 * Pobranie danych
 */

import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom/client';
import AnimationList from './src/components/AnimationList';
import Modal from './src/components/Modal';
import AnimationCard from './src/components/AnimationCard';

interface AppProps {}
interface AppState {
  modalVisible: boolean;
  modalContent: any;
  randomAnimation: object;
}
const num = [];
// const animaTionArray = [9, 4, 2, 1];
class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      modalContent: '',
      randomAnimation: {},
    };

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  apiBasePath =
    'https://raw.githubusercontent.com/malwozniak/react-ts-1dq1it/main/animation/';

  async fetchRandomAnimation() {
    const apiCall = await fetch(this.apiBasePath + num + '.json');
    const data = await apiCall.json();
    fetch(data).then((res) => res.json());

    this.setState((state, props) => {
      return {
        modalContent: <AnimationCard animation={data} />,
        modalVisible: false,
      };
    });
  }

  componentDidMount() {
    // setInterval(() => {
    this.fetchRandomAnimation();
    console.log(this.fetchRandomAnimation());
    // }, 5000);
  }

  handleItemClick(item: any) {
    this.setState((state, props) => {
      return {
        modalContent: <AnimationCard animation={item} />,
        modalVisible: true,
      };
    });
  }

  handleModalClose() {
    this.setState((state, props) => {
      return {
        modalContent: '',
        modalVisible: false,
      };
    });
  }

  render() {
    return (
      <div>
        {this.state.modalVisible && (
          <Modal
            content={this.state.modalContent}
            onModalClose={this.handleModalClose}
          />
        )}
        <AnimationList onItemClick={this.handleItemClick} num={num} />
      </div>
    );
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
