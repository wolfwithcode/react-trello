import React from 'react'
import { firebaseAuth } from '../firebase';

const AuthContext = React.createContext()

class AuthProvider extends React.Component {
    
    state = {
        user: {
            name: 'Chris'
        }
    }

    signUp = async (email, password, e) => {
        try {
            e.preventDefault();
            await firebaseAuth.createUserWithEmailAndPassword(
                email,
                password
            )
        } catch(error) {

        }
    }

    render() {
        return (
            <AuthContext.Provider
                value={{ 
                    user: this.state.user,
                    signUp: this.signUp 
                }}>
                    
                {this.props.children}

            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }