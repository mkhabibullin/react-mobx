import * as React from 'react';
import './style.css'
import ReactGA from 'react-ga';

class GA extends React.Component<any,any> {  
    
    onFirstClick = () => {
        ReactGA.event({
            category: 'User interaction',
            action: 'Check-In',
            label: 'Android',
            value: new Date().getTime()
          });
    }

    onSecondClick = () => {
        ReactGA.event({
            category: 'User interaction',
            action: 'Check-In',
            label: 'IOS',
            value: new Date().getTime()
          });
    }

    render() {                
        return <div>
            <button onClick={this.onFirstClick}>First</button>
            <button onClick={this.onSecondClick}>Second</button>
        </div>;
    }
}

export default GA