import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board'
import data from './sampleData'

class App extends React.Component {
  state = {
    // boardTitle: 'house ideas'
    board: []
  }

  componentDidMount(){
    this.setState( { boards : data.boards });
  }

  updateState = () => {
    this.setState( { boards : data.boards });
    // this.state.boards = "some value";
  }

  render(){
    return (
      <div>        
        <button onClick={this.updateState}></button>
        {console.table(this.state.boards)}
        <p>{this.state.boardTitle}</p>        
      </div>
    );
  }
}

export default App;
