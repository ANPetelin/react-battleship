import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Field.css'

function GetTable (gameOn, width, height, onShot, shots, ships, isProtectView, onLose, onMoveShip, installShip, turnShip) {
    useEffect (() => {
        if (isGameOver) onLose();
    });
    const isPoint = (point, i, j) => point[0] === i && point[1] === j;
    let rows = [];
    for (let i = 0; i < width; i++) {
        let cells =[];
        for (let j = 0; j < height; j++) {
            let cls;
            const isShip = ships.some(s => s.some(p => isPoint(p, i, j)));
            let isAttacked = false;
            if (isShip) {
                isAttacked = shots.some(s => isPoint(s, i, j));                
                if (isAttacked) {
                    const isDestroyed = ships.some(ship => ship.some(point=>(isPoint(point, i, j))) && 
                    ship.every(point => shots.some(shot => point[0] === shot[0] && point[1] === shot[1])))
                    cls = isDestroyed ? 'destroyed' : 'attacked';                                  
                } 
                else cls = isProtectView ? '' : 'ship';
            }
            const newCell = 
                (<td key = {j} className = {cls} 
                    onClick = {() => gameOn ? onShot(i, j) : installShip()}
                    onMouseOver = {() => onMoveShip(i, j)}
                    onDoubleClick ={() =>turnShip()} >
                        {shots.some(s => isPoint(s, i, j)) && isAttacked ? '🔥' :
                        shots.some(s => isPoint(s, i, j)) ? '●' : ''}
                </td>);
            cells.push(newCell);          
        }
        rows.push(<tr key = {i}>{cells}</tr>)
    }
    // Вычисляем все ли корабли подбиты.
    let isGameOver = ships.every(ship => ship.every(point => shots.some(s => s[0] === point[0] && s[1] === point[1])));          
    return <table className = 'field'><tbody>{rows}</tbody></table>;
}

function Field (props) {
    return (
        <div>
            {GetTable(props.gameOn,
                        props.width, 
                        props.height, 
                        props.onShot, 
                        props.shots, 
                        props.ships,
                        props.isProtectView, 
                        props.onLose,                        
                        props.onMoveShip,
                        props.installShip,
                        props.turnShip )}
        </div>
    );
}
Field.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onShot: PropTypes.func,
    isProtectView: PropTypes.bool
}
Field.defaultProps = {
    width: 10,
    height: 10,
    isProtectView: false
}
export default Field;