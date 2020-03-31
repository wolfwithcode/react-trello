import React from 'react'
import { AuthConsumer } from './AuthContext'

class UserForm extends React.Component {
    emailInput = React.createRef()
    passwordInput = React.createRef()

    render() {
        return (
            <AuthConsumer>
                {({ signUp }) => (
                    <React.Fragment>
                    <div className="sign-up-wrapper">
                        <h2>Sign in or create account</h2>
                        <form className="sign-up-form">
                            <div>
                                <input 
                                    ref={this.emailInput}
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                />
                            </div>
                            <div>
                                <input 
                                    ref={this.passwordInput}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                />
                            </div>
                            <div>
                                <button
                                onClick={(e) => signUp(
                                    this.emailInput.current.value,
                                    this.passwordInput.current.value,
                                    e
                                )}>
                                    Sign Up
                                </button>
                            </div>                        
                        </form>                    
                    </div>
                    </React.Fragment>
                ) }
            </AuthConsumer>
            
        )
    }
}

export default UserForm