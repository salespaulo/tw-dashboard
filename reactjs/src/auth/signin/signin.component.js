
import React from 'react'

import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signin } from '../'

import Errors from '../../error/errors.component'
import Input from '../../shared/form/input/input.component'

import {
    Card,
    CardHeader,
    CardHeaderIcon,
    CardHeaderTitle,
    CardImage,
    CardContent,
    CardFooter,
    Heading,
    Container,
    Content,
    Image,
    Icon,
    Button
} from 'bloomer'

import './signin.component.css'

const data = {
    username: { value: '', error: null },
    password: { value: '', error: null },
    isInvalid: true,
    errors: []
}

class Signin extends Component {
    constructor(props) {
        super(props)
        this.state = data
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.addError = this.addError.bind(this)
        this.clearErrors = this.clearErrors.bind(this)
        this.onSubimit = this.onSubimit.bind(this)
    }

    changeUsername(newValue, error) {
        this.setState({ username: { value: newValue, error: error } })
    }

    changePassword (newValue, error) {
        this.setState({ password: {value: newValue, error: error } })
    }

    clearErrors(e) {
        this.setState({ errors: [] })
    }

    addError(error) {
        const errors = [error].concat(this.state.errors)
        this.setState({ errors: errors })
    }

    onSubimit(e) {
        e.preventDefault()
        this.clearErrors()
        signin(this.state)
            .then(user => this.props.history.push('/home'))
            .catch(err => this.addError(err))
    }

    isInvalid() {
        const { username, password } = this.state
        return !username.value 
                || username.error
                || !password.value 
                || password.error
    }

    render() {
        return (
            <Card className="card-login">
                <CardHeader>
                <CardHeaderTitle className="card-header-login">
                    <Heading>Login</Heading>
                </CardHeaderTitle>
                <CardHeaderIcon>
                    <Icon className="fas fa-sign-in-alt" />
                </CardHeaderIcon>
                </CardHeader>
                <CardImage>
                    <Image className="card-image-logo" />
                </CardImage>
                <CardContent>
                    <Content>
                        <Input
                            iconClass="fas fa-user" 
                            placeholder="Email" 
                            onChange={ this.changeUsername }
                            className="card-input-field"
                            email="Email inválido"
                            />

                        <Input
                            type="password"
                            iconClass="fas fa-key" 
                            placeholder="Senha"
                            onChange={ this.changePassword }
                            min="4"
                            max="10"
                            maxMsg="Máximo de %{count} caracteres"
                            minMsg="Mínimo de %{count} caracteres"
                            />
                    </Content>
                </CardContent>
                <CardFooter>
                    <Button 
                        className="card-footer-button" 
                        isColor='primary' 
                        disabled={ this.isInvalid() }
                        onClick={ this.onSubimit }>Entrar</Button>
                </CardFooter>
                <Container isFluid>
                    <Errors errors={ this.state.errors } onDelete={ this.clearErrors } />
                </Container>
            </Card>
        )
    }
}

export default withRouter(Signin)