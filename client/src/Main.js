import React, { Component } from 'react';
import './Main.css';
import Lorem from './Lorem';

class MachinesList extends Component{
    constructor(){
        super()
        this.state = {
            list: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/api/start-session')
        .then(response => response.json())
        .then(data => {
            if (data.success === true){
                console.log(data.sessionId);
                let headers = {Session: data.sessionId}
                return fetch('http://localhost:5000/api/machines',{headers: headers})
            }
            else {
                console.log('success is false');
            }
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            this.setState({
                list: data
            });
            //console.log(this.state);
        })
    }

    render(){
        let list = this.state.list;
        console.log('YOEHOOEEE', list);
        return(
            <MachinesListRenderer list={list} /> 
        );
    }
}
class MachinesListRenderer extends Component{
    render(){
        let list = this.props.list;
        console.log('wajooo', list);
        let machines = list.map(
            m => {
                return(
                    <div className="col">
                        <h1>{m.name}</h1>
                        <h2>{m.statusName}</h2>
                        <h3>{m.secLeft}</h3>
                    </div>
                )
            } 
        )
        console.log(machines);
        //let machines = this.props.list;
        return(
            machines
        )
    }
}

class Machine extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: null,
            _name: null,
            statusName: null,
            secLeft: null,
            bookings: null
        }
    }
    render(){
        return(
            <div>
                <h1>{this.state._name}</h1>
                <h2>{this.state.statusName}</h2>
                <h3>{this.state.secLeft}</h3>
            </div>
        );
    }
}

class Calendar extends Component{
}

class Day extends Component{
}

class Main extends Component {
    // <div className="col"> <MachinesListRenderer list={<MachinesList />} /> </div>
    render() {
        return (
            <div className="flex-grid">
                <MachinesList />
            </div>
        );
    }
}

export default Main;
