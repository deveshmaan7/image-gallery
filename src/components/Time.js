import React, { Component, Fragment } from 'react';
import '../assets/css/Time.css';

class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hour: '',
            minute: '',
            sec: ''

        }
        this.checkTime = this.checkTime.bind(this)
        this.getTime = this.getTime.bind(this)

    }


    componentDidMount() {
        this.getTime();
    }

    checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

     getTime() {
        let today = new Date();
        let hour = today.getHours();
        let minute = today.getMinutes();
        let sec = today.getSeconds();
        // add a zero in front of numbers<10
         minute = this.checkTime(minute);
         sec = this.checkTime(sec);
        this.setState({
            hour,minute,sec
        })
         setTimeout(() => {
            this.getTime()
        }, 500);
    }


render () {
    return (
        <Fragment>
            <h3>{this.state.hour}:{this.state.minute}:{this.state.sec}</h3>
        </Fragment>
    );
    }
}

export default Time;
