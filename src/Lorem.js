import React, { Component } from 'react';

class Lorem extends Component{
    constructor(){
        super()
        this.state = { text: "" };
        fetch('https://baconipsum.com/api/?type=meat-and-filler')
            .then(response => response.json())
            .then(data => {this.setState({text: data})})
    }
    render(){
        return this.state.text
    }
}
export default Lorem;