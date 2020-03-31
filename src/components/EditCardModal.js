import React from 'react'
import { cardsRef } from '../firebase'

class EditCardModal extends React.Component {
    state = {
        availableLabels: [
            "#80ccff",
            "#80ffaa",
            "#f94a1e",
            "#ffb3ff",
            "#bf00ff",
            "#ffad33"
        ],
        selectedLabels: []
    }

    componentDidMount(){
        this.setState({ selectedLabels: this.props.cardData.labels })
    }

    textInput = React.createRef()
    updateCard = async (e) => {
        try {
            e.preventDefault()
            const cardId = this.props.cardData.id
            const newText = this.textInput.current.value
            // const labels = this.state.selectedLabels
            console.log(newText)
            const card = await cardsRef.doc(cardId)
            card.update({
                'card.text': newText
                // 'card.lab'
            })
            this.props.toggleModal()

        } catch( error ) {
            console.error('Error updating cards: ', error)
        }
    }

    render(){
        return (
            <div className="modal-wrapper"
                style={{ display: this.props.modalOpen ? 'block' : 'none' }}
            >
                <div className="modal-body" >
                    <form onSubmit={this.updateCard}>
                        <div>
                            <span
                                className="modal-close"
                                onClick={this.props.toggleModal}>
                                &times;</span>
                            <p className="label-title" > add / remove labels </p>
                            {this.state.availableLabels.map(  label => {
                                    return <span
                                    className="label"
                                    style={{ background: label }} ></span>

                            })}
                            <hr />
                        </div>
                        <div className="edit-area">
                            <span className="edit-icon" >&#x270E;</span>
                            <input
                                className="textbox-edit"
                                defaultValue={this.props.cardData.text}
                                ref={this.textInput}></input>
                        </div>
                        <div>
                            <p className="label-title">labels:</p>
                            {this.state.selectedLabels.map((label) => {
                                return <span className="label" style={{ background: label}} key={label}></span>
                            })}
                        </div>
                        <button type="submit">Save changes </button>
                    </form>
                </div>
            </div>
        )
    }

}


export default EditCardModal
