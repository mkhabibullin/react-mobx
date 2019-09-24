import React, { Component } from 'react';
import { HubConnection } from '@aspnet/signalr';
import { inject, observer } from 'mobx-react';

@inject("logger")
@observer
class ELK extends Component<any, any> {
    constructor(props) {
        super(props);
      }

      sendMessage = () => {
        try {
          throw Error('Test error');
        } catch (e) {
          const apm = this.props['logger'];
          apm.captureError(new Error('Test'));
          // apm.captureError(e);
          throw e;
        }
      };
    
      render() {
        return (
          <div>
    
            <button onClick={this.sendMessage}>generate exception</button>
          </div>
        );
      }
}

export default ELK;
