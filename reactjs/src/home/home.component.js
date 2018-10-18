
import React from 'react'
import { Component } from 'react'

import Input from '../shared/form/input/input.component'
import Errors from '../error/errors.component'

import { me } from '../auth'
import { account } from '../tw'

import './home.component.css'

import {
    Navbar,
    NavbarBrand,
    NavbarItem,
    NavbarBurger,
    NavbarStart,
    NavbarMenu,
    NavbarLink,
    NavbarDropdown,
    NavbarDivider,
    NavbarEnd,
    Card,
    CardHeader,
    CardHeaderTitle,
    CardImage,
    CardContent,
    CardFooter,
    Heading,
    Container,
    Content,
    Field,
    Control,
    Image,
    Icon,
    Button
} from 'bloomer'

const data = {
    teamWorkUrl: 'https://finchsolucoes.teamwork.com/',
    teamWorkKey: 'twp_MSF5j8nBdh9M8yHybpPwe3fV5p6L',
    response: {},
    errors: []
}

class Home extends Component {

    constructor(props) {
        super()
        this.state = data
        this.onChangeUrl = this.onChangeUrl.bind(this)
        this.onChangeKey = this.onChangeKey.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.clearErrors = this.clearErrors.bind(this)
    }

    componentWillMount() {
        me()
            .then(res => this.setState({email: res.id}))
            .catch(err => this.addError(err))
    }

    clearErrors(e) {
        this.setState({ errors: [] })
    }

    addError(error) {
        const errors = [error].concat(this.state.errors)
        this.setState({ errors: errors })
    }

    onChangeUrl(value) {
        this.setState({ teamWorkUrl: value })
    }

    onChangeKey(value) {
        this.setState({ teamWorkKey: value })
    }

    onSubmit(e) {
        e.preventDefault()
        account(this.state.teamWorkUrl, this.state.teamWorkKey)
            .then(res => this.setState({ response: res.account }))
            .catch(err => this.addError(err))
    }

    render() {
        return (
            <Content>
                <Navbar style={{ borderBottom: 'solid 1px #0F000F', margin: '0' }}>
                    <NavbarBrand>
                        <NavbarItem target="_blank" href="#">
                            <h1>tw-dashboard</h1>
                        </NavbarItem>
                        <NavbarItem isHidden='desktop'>
                            <Icon className='fab fa-github' />
                        </NavbarItem>
                        <NavbarItem isHidden='desktop'>
                            <Icon className='fab fa-twitter' style={{ color: '#55acee' }} />
                        </NavbarItem>
                        <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
                    </NavbarBrand>
                    <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
                        <NavbarStart>
                            <NavbarItem href='/home'>Home</NavbarItem>
                            <NavbarItem hasDropdown isHoverable>
                                <NavbarLink href='#/'>Documentation</NavbarLink>
                                <NavbarDropdown>
                                    <NavbarItem href='#/' onClick={this.onClickTestProtected}>One A</NavbarItem>
                                    <NavbarItem href='#/'>Two B</NavbarItem>
                                    <NavbarDivider />
                                    <NavbarItem href='#/'>Two A</NavbarItem>
                                </NavbarDropdown>
                            </NavbarItem>
                        </NavbarStart>
                        <NavbarEnd>
                            <NavbarItem href="https://github.com/" isHidden='touch'>
                                <Icon className='fab fa-github' />
                            </NavbarItem>
                            <NavbarItem href="https://twitter.com/" isHidden='touch'>
                                <Icon className='fab fa-twitter' style={{ color: '#55acee' }} />
                            </NavbarItem>
                            <NavbarItem>
                                <Field isGrouped>
                                    <Control>
                                        { this.state.email }
                                        <Button id="logout" href="/signout">
                                            <Icon className="fas fa-sign-out-alt" />
                                            <span>Sair</span>
                                        </Button>
                                    </Control>
                                </Field>
                            </NavbarItem>
                        </NavbarEnd>
                    </NavbarMenu>
                    <Errors errors={this.state.errors} onDelete={this.clearErrors}/>
                </Navbar>
                <Container>
                <Card>
                    <CardHeader>
                    <CardHeaderTitle>
                        <Heading>Conexão com o TeamWork</Heading>
                    </CardHeaderTitle>
                    </CardHeader>
                    <CardImage>
                        <Image />
                    </CardImage>
                    <CardContent>
                        <Content>
                            <Input
                                iconClass="fas fa-user" 
                                placeholder="TeamWork URL" 
                                onChange={ this.onChangeUrl }
                                url="URL inválida"
                                />

                            <Input
                                iconClass="fas fa-key" 
                                placeholder="TeamWork API KEY"
                                onChange={ this.onChangeKey }
                                max="32"
                                maxMsg="No máximo %{count} caracteres"
                                min="30"
                                minMsg="No mínimo %{count} caracteres"
                                />
                        </Content>
                    </CardContent>
                    <CardFooter>
                        <Button 
                            isColor='primary' 
                            onClick={ this.onSubmit }>Conectar</Button>
                    </CardFooter>
                    <Content>
                        <Errors errors={ this.state.errors } onDelete={ this.clearErrors } />
                    </Content>
                </Card>
            </Container>
            { JSON.stringify(this.state.response) }
        </Content>
        )
    }
}

export default Home
