import React, { Component } from 'react';
import './Main.css';

const fetchDomain = 'http://localhost:5000'
const fetchSession = fetchDomain + '/api/start-session'
const fetchMachines = fetchDomain + '/api/machines'
const fetchBookings = fetchDomain + '/api/bookings'

class LaundryInfo extends Component{
    constructor(){
        super()

        this.dates = [
            this.nowPlusDays(0), 
            this.nowPlusDays(1), 
            this.nowPlusDays(2), 
            this.nowPlusDays(3), 
            this.nowPlusDays(4), 
            this.nowPlusDays(5)
        ]
        
        this.state = {
            datePickSelected: 0
        }
    }
    
    nowPlusDays(i){
        let d = new Date(); 
        d.setDate(d.getDate() + i)
        return d
    }

    renderDatePick(i){
        return(
            <DatePick 
                value={this.state.datePickDates[i]} 
                selected={i == this.state.datePickSelected ? true : false} 
                onClick={() => this.setState({datePickSelected: i})} 
            />
        )
    }

    render(){
        let list = this.state.list;
        let bookings = this.state.bookings;
        return(
            <div>
                <div className="flex-grid">
                    <MachinesRenderer/> 
                </div>
                <div className="flex-grid">
                    {this.renderDatePick(0)}
                    {this.renderDatePick(1)}
                    {this.renderDatePick(2)}
                    {this.renderDatePick(3)}
                    {this.renderDatePick(4)}
                    {this.renderDatePick(5)}
                    {this.renderDatePick(6)}
                </div>
                <div className="flex-grid">
                    <BookingsRenderer value={this.dates[this.datePickSelected]} /> 
                </div>
            </div>
        );
    }
}

class MachinesRenderer extends Component{
    constructor(){
        super()
        this.state = {
            list: [], //machine status
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
    }

    render(){
        console.log('wajooo', this.state.list);
        return(
            this.state.list.map(
                m => {
                    return(
                        <div className="col">
                            <Machine name={m.name} statusName={m.statusName} secLeft={m.secLeft}/>
                        </div>
                    )
                } 
            )
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

class DatePick extends Component{
    render(){
        return(
            <div>
                <h3> Date? {this.props.value} </h3>
                <h3> Selected? {this.props.selected} </h3>
            </div>
        );
    }
}

class BookingsRenderer extends Component{
    constructor(){
        super()
        this.state = {
            list: [], //machine status
        }
    }
    componentDidMount(){
        //getting machine status
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
        return(
            'bookings and shit, not done you'
        )
    }
}

class Main extends Component {
    // <div className="col"> <MachinesListRenderer list={<MachinesList />} /> </div>
    render() {
        return (
            <LaundryInfo />
        );
    }
}

export default Main;
