import React from 'react'

class CreateBoardForm extends React.Component {
    state = {
        title: '',
        background: '#80ccff'
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const board = {
            title: this.state.title,
            background: this.state.background,
            createAt: new Date(),
            user: 'abc1234'
        }

        if(board.title && board.background){
            // this.props.createNewBoard(board)
            console.log(board);
            this.props.createNewBoard(board);
        }
    }

    render () {
        return (
           <form className="create-board-wrapper"
                onSubmit={this.handleSubmit}
                >
               <input 
                    type="text"
                    name="name"
                    placeholder="Board name"
                    onChange={ (e) => this.setState({title: e.target.value})}
               />
               <select name="background"
                onChange={ (e) => this.setState({background: e.target.value})}
               >
                    <option value="#80ccff">Blue</option>
                    <option value="#80ffaa">Green</option>
                    <option value="#f94a1e">Red</option>
                    <option value="#ffb3ff">Pink</option>
                    <option value="#bf00ff">Purple</option>
                    <option value="#ffad33">Orange</option>
               </select>
               <button type="submit" >Create new board</button>
           </form>
        )
    }
}

export default CreateBoardForm