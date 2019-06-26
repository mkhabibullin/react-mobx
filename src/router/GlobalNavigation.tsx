import * as React from 'react';
import { Switch, Route } from 'react-router';
import Chat from '../components/Chat';
import Birds from '../components/Birds';
import Files from '../components/Files';
import GA from '../components/GA';


class GlobalNavigation extends React.Component {
    public render(){
        return(
            <Switch>                
                <Route exact path="/" component={Chat} />
                <Route exact path="/birds" component={Birds} />
                <Route path="/files" component={Files} />
                <Route path="/GA" component={GA} />
            </Switch>
        );
    }
}

export default GlobalNavigation