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
      horizontShip: true, 
      isProtectView: null
    }
  }
  onShot(i, j) {
    if (this.state.playerOne) {
      this.setState({ shots: this.state.shots.concat([[i, j]]) });
    }
    else
      alert('Игрок не может стрелять');
  }
  onLose() {
    if (this.state.playerOne) {
      console.log('Игрок проиграл');
      this.setState({ playerOne: false })
    }
  }
  onMoveShip(r, c) {
    if (this.state.countShips <= 9) {
      let newShip = this.state.ships[this.state.countShips].slice();
      let newShipsPlayerOne = this.state.shipsPlayerOne.slice();
      for (let i = 0; i < newShip.length; i++) {
        if (i === 0) {
          newShip[i][0] = r;
          newShip[i][1] = c;
        }
        else {
          if (this.state.horizontShip) {
            newShip[i][0] = newShip[i - 1][0];
            newShip[i][1] = newShip[i - 1][1] + 1;
          }
          else {
            newShip[i][0] = newShip[i - 1][0] + 1;
            newShip[i][1] = newShip[i - 1][1];
          }
        }
      }
      newShipsPlayerOne.splice(this.state.countShips, 1, newShip);
      this.setState({ shipsPlayerOne: newShipsPlayerOne });
    }
  }
  installShip() {
    this.setState({ countShips: ++this.state.countShips, horizontShip: true });
  }
  turnShip() {
    let newShip = this.state.shipsPlayerOne[this.state.countShips].slice();
    if (newShip.length > 1) {
      if (this.state.horizontShip) {
        for (let i = 1; i < newShip.length; i++) {
          newShip[i][0] = newShip[0][0] + i;
          newShip[i][1] = newShip[0][1];
        }
      }
      else {
        for (let i = 1; i < newShip.length; i++) {
          newShip[i][0] = newShip[0][0];
          newShip[i][1] = newShip[0][1] + i;
        }
      }
      let newShipsPlayerOne = this.state.shipsPlayerOne.slice();
      newShipsPlayerOne.splice(this.state.countShips, 1, newShip);
      this.setState({ shipsPlayerOne: newShipsPlayerOne, horizontShip: !this.state.horizontShip });
    }
  }

  arrangeShipsRandom() {
    let newShipsRandom = this.state.ships.slice();
    let newArrayShips = [];
    for (let i = 0; i < newShipsRandom.length; i++) {
      let direction = Math.random();
      for (let j = 0; j < newShipsRandom[i].length; j++) {
        if (j === 0) {
          newShipsRandom[i][j] =
            [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        }
        else {
          if (direction < 0.5) {
            newShipsRandom[i][j][0] = newShipsRandom[i][j - 1][0] + 1;
            newShipsRandom[i][j][1] = newShipsRandom[i][j - 1][1];
          }
          else {
            newShipsRandom[i][j][0] = newShipsRandom[i][j - 1][0];
            newShipsRandom[i][j][1] = newShipsRandom[i][j - 1][1] + 1;
          }
        }
      }
      let fellOut = newShipsRandom[i].some(i => i[0] < 0 || i[0] >= 10 || i[1] < 0 || i[1] >= 10);
      let proximity = false;
      newArrayShips.forEach(item => {
        item.forEach(item2 => {
          if (newShipsRandom[i].some
            (j => (j[0] >= item2[0] - 1 && j[0] <= item2[0] + 1) && 
            (j[1] >= item2[1] - 1 && j[1] <= item2[1] + 1))) {
            proximity = true;
          }
        })
      })
      if (fellOut || proximity) --i;
      else newArrayShips = newArrayShips.concat([newShipsRandom[i]]);
    }
    this.setState({ shipsPlayerOne: newArrayShips });
  }
  start () {
    this.setState({ gameOn: true, isProtectView: true, playerOne: true });
  }
  render() {
    return (
      <div>
        <Field
          gameOn={this.state.gameOn}
          onShot={this.onShot.bind(this)}
          shots={this.state.shots}
          ships={this.state.shipsPlayerOne}
          onLose={this.onLose.bind(this)}
          onMoveShip={this.onMoveShip.bind(this)}
          installShip={this.installShip.bind(this)}
          turnShip={this.turnShip.bind(this)}
          isProtectView={this.state.isProtectView}
        />
        <br></br>
        <div><button onClick={this.arrangeShipsRandom.bind(this)}>
          Расставить корабли автоматически</button></div>
          <br></br>
        <div><button onClick={this.start.bind(this)}>
          Старт</button></div>
      </div>
    );
  }
}

export default App;
