import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board'
// import data from './sampleData'
import Home from './components/pages/Home'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PageNotFound from './components/pages/PageNotFound'
import { boardsRef } from './firebase'


class App extends React.Component {
  state = {
    // boardTitle: 'house ideas'
    boards: []
  }

  componentDidMount() {
    // this.setState( { boards : data.boards });
    // boardsRef.add({ name: 'hello' })
    this.getBoards();
  }

  getBoards = async userId => {
    try {
        this.setState({ boards: [] })
        const boards = await boardsRef.get()
        boards.forEach(board => {
          // console.log(board.data().board);
          const data = board.data().board
          const boardObj = {
            id: board.id,
            ...data
          }
          this.setState({ boards: [...this.state.boards, boardObj] })
        })
    } catch (error){
      console.log('Error getting boards', error)
    }

  }
  // updateState = () => {
  //   this.setState( { boards : data.boards });
  //   // this.state.boards = "some value";
  // }

  createNewBoard = async board => {
      try {    
      const newBoard = await boardsRef.add({ board })
      const boardObj = {
        id: newBoard.id,
        ...board
      }
      this.setState({boards:[...this.state.boards, boardObj]})
    } catch (error) {
      console.error('Error creating new board: ', error);
    }
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
                    getBoards={this.getBoards}
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
