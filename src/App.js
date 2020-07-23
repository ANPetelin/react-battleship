import React from 'react';
import './App.css';
import Field from './Field';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      shots: [],
      ships: [[[2,2],[2,3]],[[4,2],[4,3],[4,4]]]
    }
  }
  onShot (i,j) {
    this.setState({shots: this.state.shots.concat([[i, j]])});
  }
  render() {
    return (
      <div>
        <Field
        onShot = {this.onShot.bind(this)}
        shots = {this.state.shots}
        ships = {this.state.ships}/>
      </div>
    );
  }
}

export default App;
