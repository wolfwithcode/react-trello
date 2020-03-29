import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board'
import data from './sampleData'
import Home from './components/pages/Home'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PageNotFound from './components/pages/PageNotFound'


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

  createNewBoard = board => {
    this.setState({boards:[...this.state.boards, board]})
  }

  //   createNewBoard( board ){
  //   this.setState({ boards:[...this.state.boards, board] })
  // }

  render(){
    // this.setState( { boards : data.boards });
    // console.log(this.state.boards);
    return (
      <div>        
        <BrowserRouter>
        <Switch>        
            <Route             
              path="/:userId/boards" 
              exact 
              render = {(props) => (
                  <Home 
                    {...props}
                    boards={this.state.boards} 
                    createNewBoard={this.createNewBoard}/>
                )}           
              />

            <Route 
              path="/board/:boardId" 
              // component={Board} 
              render={props => (
                <Board 
                  {...props}
                />
              )}
            />
            <Route component={PageNotFound} />
            
            <Board />
          </Switch>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
