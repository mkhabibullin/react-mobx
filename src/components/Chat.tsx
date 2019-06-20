import React, { Component } from 'react';
import { HubConnection } from '@aspnet/signalr';
import { inject, observer } from 'mobx-react';

@inject("chatHub")
class Chat extends Component<any, any> {
    constructor(props) {
        super(props);
    
        this.state = {
          nick: '',
          message: '',
          messages: [],
          hubConnection: null,
        };
      }
    
      componentDidMount = () => {
        const nick = window.prompt('Your name:', 'John');
    
        this.setState({ nick }, () => {

            this.chatHub.on('send', (nick, receivedMessage) => {
              const text = `${nick}: ${receivedMessage}`;
              const messages = this.state.messages.concat([text]);
              this.setState({ messages })})

        });
      };
    
      sendMessage = () => {
        this.chatHub
          .invoke('send', this.state.nick, this.state.message)
          .catch(err => console.error(err));    
          this.setState({message: ''});
      };
      
      get chatHub(): HubConnection { return this.props['chatHub']; }
    
      render() {
        return (
          <div>
            <br />
            <input
              type="text"
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
            />
    
            <button onClick={this.sendMessage}>Send</button>
    
            <div>
              {this.state.messages.map((message, index) => (
                <span style={{display: 'block'}} key={index}> {message} </span>
              ))}
            </div>
          </div>
        );
      }
}

export default Chat;