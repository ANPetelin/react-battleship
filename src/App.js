import React from 'react';
import './App.css';
import Field from './Field';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      gameOn: false,
      ships: [[[,], [,], [,], [,]],
      [[,], [,], [,]], [[,], [,], [,]],
      [[,], [,]], [[,], [,]], [[,], [,]],
      [[,]], [[,]], [[,]], [[,]]],
      shipsPlayerOne: [],
      shots: [],
      playerOne: true,
      countShips: 0,
      horizontShip: true
    }
  }
  onShot(i, j) {
    // if (this.state.playerOne) {
    // this.setState({shots: this.state.shots.concat([[i, j]])});
    // }
    // else 
    // alert('Игрок не может стрелять');
    this.setState({ shots: this.state.shots.concat([[i, j]]) });
  }
  onLose() {
    if (this.state.playerOne) {
      console.log('Игрок проиграл');
      this.setState({ playerOne: false })
    }
  }
  onMoveShip(r, c) {
    if (this.state.countShips <= 9) {
      let newShip = this.state.ships[this.state.countShips];
      let newShipsPlayerOne = this.state.shipsPlayerOne;
      for (let i = 0; i < newShip.length; i++) {
        if (i === 0) {
          newShip[i][0] = r;
          newShip[i][1] = c;
        }
        else {
          newShip[i][0] = newShip[i - 1][0];
          newShip[i][1] = newShip[i - 1][1] + 1;
        }
      }
      newShipsPlayerOne = newShipsPlayerOne.concat([newShip]);
      this.setState({ shipsPlayerOne: newShipsPlayerOne });
    }
  }
  installShip() {
    this.setState({ countShips: ++this.state.countShips, horizontShip: true });
  }
  turnShip() {
    let newShip = this.state.shipsPlayerOne[this.state.countShips];
    if (newShip.length > 1) {
    if (this.state.horizontShip) {
      for (let i = 1; i < newShip.length; i++) {
          newShip[0][0] = newShip[i - 1][0] + i;
          newShip[0][1] = newShip[i - 1][1] - i;        
      }
    }
    else {
      for (let i = 1; i < newShip.length; i++) {
        newShip[0][0] = newShip[i - 1][0] - i;
        newShip[0][1] = newShip[i - 1][1] + i;      
    }
    }
      let newShipsPlayerOne = this.state.shipsPlayerOne.slice(0, this.state.countShips).concat([newShip], this.state.shipsPlayerOne.slice(-this.state.countShips+1));
      console.log(newShipsPlayerOne);
      //this.setState({ shipsPlayerOne: newShipsPlayerOne });
    }
  }
  render() {
    return (
      <div>
        <Field
          gameOn = {this.state.gameOn}
          onShot = {this.onShot.bind(this)}
          shots = {this.state.shots}
          ships = {this.state.shipsPlayerOne}
          onLose = {this.onLose.bind(this)}
          onMoveShip = {this.onMoveShip.bind(this)}
          installShip = {this.installShip.bind(this)}
          turnShip = {this.turnShip.bind(this)}
          />
      </div>
    );
  }
}

export default App;
