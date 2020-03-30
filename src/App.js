import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board'
// import data from './sampleData'
import Home from './components/pages/Home'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PageNotFound from './components/pages/PageNotFound'
import { boardsRef, listsRef , cardsRef} from './firebase'


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
    deleteList = async (listId) => {
        try {
            // const listId = this.props.list.id
            const cards = await cardsRef
                .where('card.listId', '==' , listId)
                .get()
                if( cards.docs.length !== 0){
                    cards.forEach(card => {
                        card.ref.delete()
                    })
                }
            const list = await listsRef.doc(listId)
            list.delete()
        } catch (error){
            console.error('Error deleting list: ', error)
        }
    }

  deleteBoard = async boardId => {
    try {
      // alert(boardId)
      const lists = await listsRef
          .where('list.board', '==', boardId)
          .get()
      if( lists.docs.length !== 0) {
        lists.forEach( list => {
          this.deleteList(list.ref.id)
        })
      }

      const board = await boardsRef.doc(boardId)
      this.setState({
        boards: [
          ...this.state.boards.filter( board => {
            return board.id !== boardId
          })
        ]
      })
      board.delete()
    } catch (error) {
      console.error('Error deleting board: ', error)
    }
  }

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
                  deleteBoard={this.deleteBoard}
                  deleteList={this.deleteList}
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
