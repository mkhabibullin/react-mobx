import * as React from 'react';
import './style.css'
import ReactGA from 'react-ga';

class GA extends React.Component<any,any> {  
    
    onFirstClick = () => {
        ReactGA.event({
            category: 'Android',
            action: 'Check-In',
            label: this.getLabel()
          });
    }

    onSecondClick = () => {
        ReactGA.event({
            category: 'IOS',
            action: 'Check-In',
            label: this.getLabel()
          });
    }

    getLabel = () => this.uuidv4() + ' ' + new Date().toISOString()

    uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
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