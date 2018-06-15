import React, { Component } from 'react';
import FigCard from '../Components/FigCard';
import Navbar from '../Components/Navbar/Navbar';
import Wrapper from '../Components/Wrapper';
import Title from '../Components/Title';
import Container from './Container';
import Column from './Column';
import minifigs from '../minifigs.json';
import Row from './Row';
import './App.css';

function shuffleFigs(array) {
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
    topScore: 0,
    rightWrong: '',
    clicked:[],
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
      currentScore: newScore,
      rightWrong: '',
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore});
  } else if (newScore === 18) {
    this.setState({rightWrong: "YOU WIN!"});
  }
  this.handleShuffle();
};

handleReset = () => {
  this.setState({
    currentScore: 0,
    topScore:this.state.topScore,
    rightWrong: 'OOPS, TRY AGAIN!',
    clicked:[],
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
      <Navbar
      title='CLICKY FIGS THE GAME'
      rightWrong={this.state.rightWrong}
      score={this.state.currentScore}
      topScore={this.state.topScore}
      
      />

      <Title>
        Don't click on the same minifig twice, good luck!
      </Title>

      <Container>
        <Row>
          {this.state.minifigs.map(minifigs => (
            <Column size="md-2 sm-8">
              <FigCard
                key={minifigs.id}
                handleClick={this.handleClick}
                handleIncrement={this.handleIncrement}
                handleReset={this.handleReset}
                handleShuffle={this.handleShuffle}
                id={minifigs.id}
                image={minifigs.image}
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
