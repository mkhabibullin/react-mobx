import * as React from 'react';
import { Switch, Route } from 'react-router';
import Chat from '../components/Chat';
import Birds from '../components/Birds';
import FileUploaderApp from '../containers/FileUploaderApp';

class GlobalNavigation extends React.Component {
    public render(){
        return(
            <Switch>                
                <Route exact path="/" component={Chat} />
                <Route exact path="/birds" component={Birds} />
                <Route path="/files" component={FileUploaderApp} />
            </Switch>
        );
    }
}

export default GlobalNavigation