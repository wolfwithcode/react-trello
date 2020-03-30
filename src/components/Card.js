import React from 'react'
import PropTypes from 'prop-types'
import {cardsRef} from '../firebase'
import EditCardModal from './EditCardModal'


class Card extends React.Component  {
    
    state = {
        modalOpen: false
    }

    toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen  })
    }

    deleteCard = async e => {
        try{
            e.preventDefault()
            const cardId = this.props.data.id
            const card = await cardsRef.doc(cardId)
            card.delete()
        }catch(error){
            console.error('Error deleting card:', error)
        }
    }

    render(){
        return (
            <React.Fragment>            
                <div 
                    className="card"
                    // style={{ display: this.props.modalOpen ? 'block' : 'none' }}
                >
                    <div className="card-body">
                        <p onClick={this.toggleModal} >{this.props.data.text}</p>
                        <span onClick={this.deleteCard}>&times;</span>
                    </div>
                </div>
                <EditCardModal 
                    modalOpen={this.state.modalOpen} 
                    toggleModal={this.toggleModal} />
            </React.Fragment>
        )
    }
}

Card.propTypes = {
    data: PropTypes.object.isRequired
}

export default Card