import React from 'react';
import PropTypes from 'prop-types';
import './Field.css'

function GetTable (width, height, onShot, shots, ships, isProtectView) {
    const isPoint = (point, i, j) => point[0] === i && point[1] === j;
    let rows = [];
    for (let i = 0; i < width; i++) {
        let cells =[];
        for (let j = 0; j < height; j++) {
            let cls;
            const isShip = ships.some(s => s.some(p => isPoint(p, i, j)));
            if (isShip) {
                const isAttacked = shots.some(s => isPoint(s, i, j));                
                if (isAttacked) {
                    const isDestroyed = ships.some(ship => ship.some(point=>(isPoint(point, i, j)))&&ship.every(point=>shots.some(shot=>point[0] === shot[0] && point[1] === shot[1])))
                    if (isDestroyed) 
                        cls = 'destroyed';
                    else 
                        cls = 'attacked';
                } 
                else cls = isProtectView ? '' : 'ship';
            }
            const newCell = 
                (<td key = {j} className = {cls} onClick = {() => onShot(i, j)}>
                    {shots.some(s => isPoint(s, i, j)) ? '●' : ''}
                </td>);
            cells.push(newCell);
        }
        rows.push(<tr key = {i}>{cells}</tr>)
    }
    return <table className = 'field'><tbody>{rows}</tbody></table>;
}

function Field (props) {
    return (
        <div>
            {GetTable(props.width, props.height, props.onShot, props.shots, props.ships, props.isProtectView)}
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
    isProtectView: true
}
export default Field;