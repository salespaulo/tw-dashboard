
import React from  'react'
import { Component } from  'react'

import { validate, isFunction } from 'validate.js'

import {
    Field,
    Control,
    Input as BloomerInput,
    Icon,
    Help
} from 'bloomer'

import './input.component.css'

const data = {
    value: '',
    error: ''
}

class Input extends Component {

    constructor(props) {
        super(props)
        this.state = data
        this.onChangeInput = this.onChangeInput.bind(this)
    }

    onChangeInput(e) {
        const newValue = e.target.value

        this.setState((prev, props) => {
            const error = this.validate(newValue, props)
            props.onChange && props.onChange(newValue, error)
            return { value: newValue, error: error}
        })
    }

    validate = (value, props) => {
        const { required, email, max, min, maxMsg, minMsg } = props
        let error = { }
        let length = null

        if (props.onChange && !isFunction(props.onChange)) {
            throw Error('InputText props onChange should be a function!')
        }

        if (required) {
            error.presence = { message:  required }
        }

        if (email) {
            error.email = { message:  email }
        }

        if (max) {
            length = Object.assign({}, length)
            length.maximum = Number(max)
            length.tooLong = maxMsg
        }

        if (min) {
            length = Object.assign({}, length)
            length.minimum = Number(min)
            length.tooShort = minMsg
        }

        if (length) error.length = length

        const constraints = {
            value: error
        }

        const isValidate = validate({ value }, constraints)
        return isValidate 
                && isValidate.value 
                && isValidate.value.length > 0 
                && isValidate.value[0].replace('Value', '')
    }

    showHelper = () => this.state.error &&
        <Help isColor='danger'>{ this.state.error }</Help>

    render = () => (
        <Field>
            <Control hasIcons>
                <BloomerInput 
                    type={ this.props.type || 'text' }
                    placeholder={ this.props.placeholder } 
                    value={ this.state.value } 
                    onChange={ this.onChangeInput } 
                    className={ this.props.className }
                    />

                <Icon isSize="small" isAlign="left">
                    <span className={ this.props.iconClass } aria-hidden="true"></span>
                </Icon>
                { this.showHelper() }
            </Control>
        </Field>
    )
}

export default Input