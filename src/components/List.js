import React from 'react'
import Card from './Card'
import { render } from '@testing-library/react'
import PropTypes from 'prop-types'
import { cardsRef, listsRef } from '../firebase'
import {AuthConsumer} from './AuthContext'

class List extends React.Component {
    state = {
        currentCards: []
    }

    componentDidMount(){
        this.fetchCards(this.props.list.id)
    }

    // deleteList = async () => {
    //     try {
    //         const listId = this.props.list.id
    //         const cards = await cardsRef
    //             .where('card.listId', '==' , listId)
    //             .get()
    //             if( cards.docs.length !== 0){
    //                 cards.forEach(card => {
    //                     card.ref.delete()
    //                 })
    //             }
    //         const list = await listsRef.doc(listId)
    //         list.delete()
    //     } catch (error){
    //         console.error('Error deleting list: ', error)
    //     }
    // }

    fetchCards = async listId => {
        try{
            await cardsRef
                .where('card.listId','==', listId) 
                .orderBy('card.createdAt')
                .onSnapshot(snapshot => {
                    snapshot.docChanges()
                    .forEach( change => {
                        const doc = change.doc
                        const card = {
                            id: doc.id,
                            text: doc.data().card.text,
                            labels: doc.data().card.labels
                        }

                        if(change.type === 'added'){
                            this.setState({ currentCards: [...this.state.currentCards, card]});
                        }

                        if(change.type === 'removed'){
                            this.setState({ currentCards: [
                                ...this.state.currentCards.filter(card => {
                                    return card.id !== change.doc.id
                                })
                            ]});
                        }

                        if(change.type === "modified"){
                            const index = this.state.currentCards.findIndex( item => {
                                return item.id === change.doc.id
                            })
                            const cards = [...this.state.currentCards]
                            cards[index] = card
                            this.setState({ currentCards: cards})
                        }

                    })
                })
                
        }
        catch (error){
            console.error('Error fetching cards', error)
        }
    }
    nameInput = React.createRef();
    createNewCard = async (e, userId) => {
        try{                    
            e.preventDefault();
            const card = {
                text: this.nameInput.current.value,
                listId: this.props.list.id,
                labels: [],
                createdAt: new Date(),
                user: userId
            }

            if( card.text && card.listId ){
                await cardsRef.add({ card })
            }
            this.nameInput.current.value = ''
            console.log('new card added '+ card.text)
        } catch(error){
            console.error(' error creating new card: ', error);
        }
        
    }

    deleteList = () => {
        const listId = this.props.list.id
        this.props.deleteList(listId)
    }

    updateList = async e => {
        try {
            const listId = this.props.list.id
            const newTitle = e.currentTarget.value
            const list = await listsRef.doc(listId)
            list.update({ 'list.title': newTitle })

        } catch(error) {
            console.error('Error updating list: ', error )
        }
    }

    render(){
        return (
            <AuthConsumer>
                {({user}) => (
                    <div className="list" >
                        <div className="list-header">
                            {/* <p>{this.props.list.title}</p> */}
                            <input 
                            type="text"
                            name="listTitle"
                            onChange={this.updateList}
                            defaultValue={this.props.list.title}
                            />
                            <span onClick={this.deleteList}>&times;</span>
                        </div>
                        {Object.keys(this.state.currentCards).map(key => (
                        <Card
                            key={key}
                            data={this.state.currentCards[key]}
                        />  
                        ))}
                        <form 
                            onSubmit={ (e) => this.createNewCard(e, user.id)} 
                            className="new-card-wrapper" >
                            <input 
                                type="text"
                                ref={this.nameInput}
                                name="name"
                                placeholder=" + New card"
                            />
                        </form>
                    </div>
                )}
            
            
            </AuthConsumer>
           
        )
    }
}


List.protoTypes = {
    list: PropTypes.object.isRequired,
    deleteList: PropTypes.func.isRequired
}

export default List