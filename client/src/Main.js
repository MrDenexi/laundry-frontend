import React, { Component } from 'react';
import './Main.css';
import icon from './machine.png';

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
            this.nowPlusDays(5),
            this.nowPlusDays(6)
        ]
        
        this.state = {
            datePickSelected: 0,
            bookings: [], //raw json from bookings fetch
            machineIds: [], //machine ids from bookingsfetch
            groupedBookings: [] //array of array of objects, grouped by machineId.
        }
    }
    
    //Datepick stuff
    nowPlusDays(i){
        let d = new Date(); 
        d.setDate(d.getDate() + i)
        return d
    }
    renderDatePick(i){
        return(
            <DatePick 
                value={this.dates[i]} 
                selected={i === this.state.datePickSelected ? true : false} 
                onClick={() => this.setState({datePickSelected: i})} 
            />
        )
    }

    render(){
        return(
            <div>
                <div className="flex-grid">
                    {/*<MachinesRenderer/>*/}
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
                    <BookingsRenderer value={this.dates[this.state.datePickSelected]} />
                </div>
            </div>
        );
    }
}

class MachinesRenderer extends Component{
    constructor(){
        super()
        this.state = {
            list: [], //all raw json from fetch
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
                <img src={icon} alt='' />
                <h3>{this.props.statusName}</h3>
                <h3>Estimated time left: <br/> {this.props.secLeft}</h3>
            </div>
        );
    }
}

class DatePick extends Component{
    render(){
        let days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        let day = days[this.props.value.getDay()];
        let date = this.props.value.getDate();

        let className = this.props.selected ? 'datepick selected' : 'datepick';

        return(
            <div className={className} onClick={this.props.onClick} >
                <div className='day'> {day} </div>
                <div className='date'> {date} </div>
            </div>
        );
    }
}


class BookingsRenderer extends Component{
    constructor(props){
        super(props)
        this.state = {
            bookings: [], //raw json from bookings fetch
            machineIds: [], //machine ids from bookingsfetch
            groupedBookings: [] //array of array of objects, grouped by machineId.
        }
    }
    componentDidMount(){
        //getting machine status
        this.fetchBookings();
    }
    componentDidUpdate(nextProps){
        if (nextProps.value != this.props.value){
            this.setState({
                bookings: [], //raw json from bookings fetch
                machineIds: [], //machine ids from bookingsfetch
                groupedBookings: [] //array of array of objects, grouped by machineId.
            })
            this.fetchBookings();
        }
    }

    fetchBookings(){
        let dateFrom = this.props.value.toISOString().split("T")[0];
        let headers = {DateFrom: dateFrom}
        fetch(fetchBookings,{headers: headers})
        .then(response => response.json())
        .then(data => {
            this.setState({
                bookings: data
            });
            this.groupBookings();
        })
        .catch((error) => console.log(error));
    }

    groupBookings(){
        this.state.bookings.forEach(
            (booking) => {
                console.log('booking; ', booking);
                let machineIds = this.state.machineIds;
                let idIndex = machineIds.indexOf(booking.machineId);
                let groupedBookings = this.state.groupedBookings;
                console.log('groupedbooking; ', groupedBookings);
                if (idIndex === -1) {              
                    let machineIds_ = machineIds;
                    machineIds_.push(booking.machineId);
                    let groupedBookings_ = groupedBookings;
                    console.log('___', groupedBookings_);
                    groupedBookings_.push([]);
                    this.setState({
                        machineIds: machineIds_,
                        groupedBookings: groupedBookings_
                    }, () => {
                        console.log('just setstate');
                        idIndex = machineIds.indexOf(booking.machineId);
                        this.addBookingToGroup(booking, idIndex);
                    });
                }
                else{
                    this.addBookingToGroup(booking, idIndex);
                }
            }
        )
    }
    addBookingToGroup(booking, index){
        let newGroupedBookings = this.state.groupedBookings;
        newGroupedBookings[index].push(booking);
        this.setState({
            groupedBookings: newGroupedBookings
        });
    }

    render(){
        let restime;
        if (this.state.groupedBookings.length > 1) restime = this.state.groupedBookings[0][0].reservationTime;
        return(
            <div>
                {this.props.value.toISOString().split("T")[0]}
                <br/>
                {this.state.groupedBookings.length}
                <br/>
                {restime}
            </div>
        )
    }
}

class Main extends Component {
    render() {
        return (
            <LaundryInfo />
        );
    }
}

export default Main;
