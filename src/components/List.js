import React from 'react'
import Card from './Card'
import { render } from '@testing-library/react'
import PropTypes from 'prop-types'

class List extends React.Component {
    render(){
        return (
            <div className="list" >
                <div className="list-header">
                    <p>{this.props.list.title}</p>
                </div>
                
                {Object.keys(this.props.list.cards).map( key => (
                    <Card 
                        key={key} 
                        data={this.props.list.cards[key]}/>
                ))}     
                           
            </div>
           
        )
    }
}


List.protoTypes = {
    list: PropTypes.object.isRequired
}

export default List