import React from 'react';
import PropTypes from 'prop-types'
import './App.css';

const mystyle = {
    color: "blue",
    cursor: "pointer"
};

class Album extends React.Component {

    constructor() {
        super();
        this.state = {
            trackdata: null
        }

    }

    getTrackUrl= (id) => {

        fetch(`https://qmlx4jv1uj.execute-api.us-west-2.amazonaws.com/latest/track?track_id=${id}`)
            .then(res => res.json())
            .then(({ url }) => {
                this.setState(state => {
                    /** newTracks returns a new array of tracks with one with an updated URL **/
                    const newTracks =  state.trackdata.map( track => {
                        return track.id === id ? { ...track, url } : track

                    })
                    /** return an updated state with url added to trackdata of track **/
                    return { trackdata:newTracks}


                })
            })
    }



    componentDidMount() {
        fetch('https://qmlx4jv1uj.execute-api.us-west-2.amazonaws.com/latest/tracks')
            .then(res => res.json())
            .then(({ tracks }) => {
                this.setState({ trackdata: tracks })
            })

    }

    render() {
        if (!this.state.trackdata) {
            return <p>loading ....</p>
        }

        return (
            <div>
                <h1>Welcome to Waylostreams...</h1>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Artist</th>
                        <th>Title</th>
                        <th>URL</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.trackdata.map((track, i) => (
                        <TableRow
                            key = {i}
                            data = {track}
                            onClick = {this.getTrackUrl}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

const TableRow = props => {


    return (

        <tr  onClick = {() => props.onClick(props.data.id)}  >
            <td>{props.data.id}:  :</td>
            <td>{props.data.artist}:  :</td>
            <td style={mystyle}>{props.data.title}
             : Click to play</td>

            <td>{props.data.url && (<audio onContextMenu="return false;" controls autobuffer onPlay="log_stream1()" controls
                                           controlsList="nodownload noremoteplayback">
                <source src= {props.data.url} type="audio/mp3"></source>
            </audio>) }</td>
        < /tr>
    );
}



export default Album;
