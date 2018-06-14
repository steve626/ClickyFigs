import React, { Component } from 'react';
// import logo from './logo.svg';
import FigCard from './components/FigCard';
import Nav from './components/Nav';
import Wrapper from './components/Wrapper';
import Title from './components/Title';
import Container from './Container';
import Column from './Column';
import minifigs from './minifigs.json';
import './App.css';

function ShuffleFigs(array) {
  for (let i = array.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  state = {
    minifigs,
    currentScore: 0,
    highScore: 0,
    rightWrong: '',
    clicked:[]
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1){
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id)});
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore:newScore,
      rightWrong: ''
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore :newScore});
  } else if (newScore === 12) {
    this.setState({rightWrong: "You Win!"});
  }
  this.handleShuffle();
};

handleReset = () => {
  this.setState({
    currentScore: 0,
    topScore:this.state.topScore,
    rightWrong: '',
    clicked:[]
  });
  this.handleShuffle();
};

handleShuffle = ()=> {
  let shuffledFigs = shuffleFigs(minifigs);
  this.setState({ minifigs: shuffledFigs});
};

render() {
  return (
    <Wrapper>
      <Nav
      title='Clicky Figs Game'
      score={this.state.currentScore}
      topScore={this.state.topScore}
      rightWrong={this.state.rightWrong}
      />

      <Title>
        Try to click on each Minifig once and only once. 
        </Title>

      <Container>
        <Row>
          {this.state.friends.map(minifigs => (
            <Column size="md-2 sm-8">
              <FigCard
                key={minifigs.id}
                handleClick={this.handleClick}
                handleIncrement={this.handleIncrement}
                handleReset={this.handleReset}
                handleShuffle={this.handleShuffle}
                id={minifig.id}
                image={minifig.image}
              />
            </Column>
          ))}
        </Row>
      </Container>
    </Wrapper>
  );
}
}

export default App;
