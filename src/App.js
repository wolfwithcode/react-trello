import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board'
import data from './sampleData'

class App extends React.Component {
  state = {
    // boardTitle: 'house ideas'
    boards: []
  }

  componentDidMount() {
    this.setState( { boards : data.boards });
  }

  // updateState = () => {
  //   this.setState( { boards : data.boards });
  //   // this.state.boards = "some value";
  // }

  render(){
    // this.setState( { boards : data.boards });
    // console.log(this.state.boards);
    return (
      <div>        
        {this.state.boards.map(board => (
          <div key={board.id}>
            <span>{board.id}</span>
            <h3>{board.title}</h3>
            <p>{board.background}</p>
          </div>
        ))}      
      </div>
    );
  }
}

export default App;
