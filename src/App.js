import React from 'react';
import PropTypes from 'prop-types'
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            header: [],
            trackdata: [],
            message: "Welcome to WayloStreams..",
            content: "A great website...",
            data:
                [{"id":"waylo:track:0","title":"Oberheim","artist":"Sean Wayland"},
                    {"id":"waylo:track:1","title":"Club Sandwich","artist":"Sean Wayland"}]

        }

       console.log(this.state.trackdata)
        console.log(this.state.header)



    }

    componentDidMount() {
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'https://qmlx4jv1uj.execute-api.us-west-2.amazonaws.com/latest/'
        fetch(proxyUrl + targetUrl)
            .then((response) => response.json())
            .then(result => {
                this.setState({ header: result });
            });

        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'https://qmlx4jv1uj.execute-api.us-west-2.amazonaws.com/latest/tracks'
        fetch(proxyUrl + targetUrl)
            .then((response) => response.json())
            .then(result => {
                this.setState({ trackdata: result});
            });
    }

    render() {

        const songs = this.state.trackdata.tracks

        if(!this.state.trackdata){return <p>loading ....</p>}
        if(!this.state.header){return <p>loading ....</p>}



        return (
            <div>
                {/*<Header/>*/}

                <h1>{this.state.header.message}</h1>

                {/*<h2>{this.state.content}</h2>*/}




                <table>
                    <tbody>
                    WAYLOSTREAMS TRACKS
                    {this.state.data.map((track, i) => <TableRow key = {i}
                                                                  data = {track} />)}
                    </tbody>
                </table>

                {/***
                <table>
                    <tbody>
                    WAYLOSTREAMS TRACKS
                    {songs.map((track, i) => <TableRow key = {i}
                                                                 data = {track} />)}
                    </tbody>
                </table>
                 ***/}


                <div><pre>{JSON.stringify(songs, null, 2) }</pre></div>




            </div>
        );
    }
}

class Content extends React.Component {
    render() {
        return (
            <div>
                <div>{this.state.data.artist}</div>

            </div>
        );
    }
}


class TableRow extends React.Component {
    render() {
        return (
            <tr>
                <td>id: {this.props.data.id}  </td>
                <td>artist: {this.props.data.artist}  </td>
                <td>title: {this.props.data.title}  </td>
            </tr>
        );
    }
}


class TableRowApi extends React.Component {
    render() {
        return (
            <tr>
                <td>id: {this.state.trackdata.id}  </td>
                <td>artist: {this.state.trackdata.artist}  </td>
                <td>title: {this.state.trackdata.title}  </td>
            </tr>
        );
    }
}

export default App;
