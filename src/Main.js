import React, { Component } from 'react';
import './Main.css';
import Lorem from './Lorem';
import fetchJsonp from 'fetch-jsonp'

class GetMachines extends Component{
    constructor(){
        super()
        this.state = {
            data: null
        }
    }

    componentDidMount(){
        var location = new Headers({
            'Location': '16'
        });

        fetch(
            'http://cors-anywhere.herokuapp.com/mobile.wgls.laundryrestart.com/api/checkout/start-session',{
                headers: {'Location': '16'}
            }
        ).then(
            response => {
                console.log(response)
                console.log(typeof(response))
            }
        ).then(
            whoopy => {
                console.log(whoopy)
            }
        ).catch(err => console.log('There was an error:' + err))
    }

    render() {return this.state.data}
}

class Machine extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: null,
            name: null,
            statusName: null,
            secLeft: null,
            lastUpdate: null,
        }
    }
}

class Calendar extends Component{
}

class Day extends Component{
}

class Main extends Component {
  render() {
    return (
        <div className="flex-grid">
            <div className="col"> <Lorem /> </div>
            <div className="col"><Lorem /></div>
            <div className="col"><Lorem /></div>
            <GetMachines />
        </div>
    );
  }
}

export default Main;
