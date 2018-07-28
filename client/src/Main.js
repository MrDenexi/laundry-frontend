import React, { Component } from 'react';
import './Main.css';

const fetchDomain = 'http://localhost:5000'
const fetchSession = fetchDomain + '/api/start-session'
const fetchMachines = fetchDomain + '/api/machines'
const fetchBookings = fetchDomain + '/api/bookings'

class MachinesList extends Component{ //fetch api
    constructor(){
        super()
        this.state = {
            session: null,
            list: [], //machine status
            bookings: [] //the whole calendar thingy
        }
    }

    componentDidMount(){
        //getting machine status
        fetch(fetchSession)
        .then(response => response.json())
        .then(data => {
            if (data.success === true){
                console.log(data.sessionId);
                let headers = {Session: data.sessionId}
                return fetch(fetchMachines,{headers: headers})
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
        .catch((error) => console.log(error));

        //getting bookings
        let dateTo = new Date();
        dateTo.setDate(dateTo.getDate() + 7);
        let dateHeaders = {Datefrom: '2018-07-24', Dateto: '2018-07-27' }
        fetch(fetchBookings+'?dateFrom=2018-07-24')
        .then(response => response.json())
        .then(data => {
            this.setState({
                bookings: data
            });
        })
        .catch((error) => console.log(error));
    }

    render(){
        let list = this.state.list;
        let bookings = this.state.bookings;
        return(
            <MachinesListRenderer list={list} bookings={bookings} /> 
        );
    }
}
class MachinesListRenderer extends Component{
    render(){
        let list = this.props.list;
        let bookings = this.props.list;
        console.log('wajooo', list);
        let machines = list.map(
            m => {
                return(
                    <div className="col">
                        <Machine name={m.name} statusName={m.statusName} secLeft={m.secLeft}/>
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
    render(){
        return(
            <div>
                <h1>{this.props.name}</h1>
                <h2>{this.props.statusName}</h2>
                <h3>{this.props.secLeft}</h3>
            </div>
        );
    }
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
