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
        fetch('/api/start-session')
        .then(response => response.json())
        .then(data => {
            if (data.success == true){
                console.log(data.sessionId);
                let headers = {Session: data.sessionId}
                fetch('/api/machines',{headers: headers})
                .then(response => response.json())
                .then(data => {
                    //console.log(data);
                    this.setState(data)
                })
            }
            else {
                console.log('success is false');
            }
        })
    }

    render(){
        const { list } = this.state;
        return(
            <div> {list} </div> //this shit is all broken. fetching is slower than redering maybe? 
        );
    }
}
class MachinesListRenderer extends Component{
    render(){
        return(
            this.props.list.map(function(machine){
                return (
                    <div className="col">
                        <h1>{machine._name}</h1>
                        <h2>{machine.statusName}</h2>
                        <h3>{machine.secLeft}</h3>
                    </div>
                );
            })
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
}

class Calendar extends Component{
}

class Day extends Component{
}

class Main extends Component {
  render() {
    return (
        <div className="flex-grid">
            <div className="col"> <MachinesList /> </div>
            <div className="col"><Lorem /></div>
            <div className="col"><Lorem /></div>
        </div>
    );
  }
}

export default Main;
