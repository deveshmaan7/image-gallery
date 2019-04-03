import React, {Component, Fragment} from 'react';
import Navigation from './containers/Nav';
import Gallery from './containers/Gallery';
import Time from './components/Time'


class App extends Component {
    render() {
        return (
            <Fragment>
                <Navigation/>
                <Time/>
                <Gallery/>
            </Fragment>
        );
    }
}

export default App;
