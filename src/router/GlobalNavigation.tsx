import * as React from 'react';
import { Switch, Route } from 'react-router';
import ELK from '../components/ELK';


class GlobalNavigation extends React.Component {
    public render(){
        return(
            <Switch>                
                <Route exact path="/" component={ELK} />
            </Switch>
        );
    }
}

export default GlobalNavigation