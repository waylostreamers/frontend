import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Album from './Album';


class App extends Component {
    render() {
        return (
            <Router basename={process.env.REACT_APP_BASENAME}>
                <div>
                    <h2>WAYLOSTREAMS.COM</h2>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="navbar-nav mr-auto">
                            <li><Link to={'/'} className="nav-link"> Home </Link></li>
                            <li><Link to={'/Album'} className="nav-link">Album</Link></li>
                        </ul>
                    </nav>
                    <hr />
                    <Switch>
                        <Route path='/Album' component={Album} />
                        <Route path='/' component={Home} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
