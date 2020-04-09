import React from 'react';
import PropTypes from 'prop-types'
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      trackdata: null
    }
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
            </tr>
          </thead>
          <tbody>
            { this.state.trackdata.map((track, i) => (
              <TableRow
                key = {i}
                data = {track}
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
    <tr>
      <td>{props.data.id}</td>
      <td>{props.data.artist}</td>
      <td>{props.data.title}</td>
    </tr>
  );
}

export default App;
