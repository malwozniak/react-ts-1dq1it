import * as React from 'react';
const imgQty = 18

function RandomImage(props) {
     const style = {
        width: 150,
        height: 200,
        backgroundColor: 'dodgerblue',
        display: 'inline-block',
        margin: 2,
        border: '5px solid #333',
        borderBottom: '5px solid #222',
        borderLeft: '5px solid #222',
        borderRadius: 4,
        boxSizing: 'border-box',
        backgroundImage: `url(https://unsplash.it/150/200?image=${props.num})`,
        transition: 'background-image 1s ease-in-out'
    }

    return (
      <a href="#" style={style} />
        )
}

const RandomImageNumber = ({
  
  getInitialState() {
    return {
      numbers: Array(imgQty).fill({}).map((_, i) => i + 1) 
    }
  },
  
  componentDidMount(){
     setInterval(() => {
      this.setState({
        numbers: _.shuffle(this.state.numbers)
      })
    }, 5000)
  },
    
  render(){
    return(
     <div>
        {this.state.numbers.map((num) => {
          return <RandomImage num={num} randomNumber={this.genNumber}/>
        })}
      </div>
    )
  }
})

export default RandomImageNumber;


