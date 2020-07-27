import React from 'react';
import './App.css';
import Field from './Field';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      ships: [[[0,0],[0,1],[0,2],[0,3]],
              [[2,0],[2,1],[2,2]],
              [[4,0],[4,1]],
              [[6,0]]],
      shipsPlayerOne: [],
      shots: [],
      playerOne: true, 
      countShips: 0 
    }
  }
  onShot (i,j) {
    if (this.state.playerOne) {
    this.setState({shots: this.state.shots.concat([[i, j]])});
    }
    else 
    alert('Игрок не может стрелять');
  }
  onLose () {
    if (this.state.playerOne) {
      console.log('Игрок проиграл');
      this.setState ({playerOne: false})
    }
  }
  onMoveShip (i, j) {
    console.log(i + ',' + j);
    // let newShip = this.state.ships[this.state.countShips];
    // let newShipsPlayerOne = this.state.shipsPlayerOne;
    // for (let i = 0; i < newShip.length; i++) {
    //   if (i === 0) {
    //     newShip[i][0] = i;
    //     newShip[i][1] = j;
    //   }      
    //   else {
    //     newShip[i][0] = newShip[i-1][0];
    //     newShip[i][1] = newShip[j-1][0]+1;
    //   }
    // }
    // newShipsPlayerOne = newShipsPlayerOne.concat([newShip]);
    // this.setState ({shipsPlayerOne: newShipsPlayerOne})
  }
  render() {
    return (
      <div>
        <Field
        onShot = {this.onShot.bind(this)}
        shots = {this.state.shots}
        ships = {this.state.shipsPlayerOne}
        onLose = {this.onLose.bind(this)}
        onMoveShip = {this.onMoveShip.bind(this)}/>
      </div>
    );
  }
}

export default App;
