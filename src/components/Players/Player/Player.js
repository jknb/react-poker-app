import React from 'react';
import classes from './Player.module.css';
import Hand from '../../Hand/Hand';

const Player = (props) => {
  const tableWidth = 640 / 2;
  const tableHeight = 340 / 2;
  const sin = Math.sin(props.rotateAngle);
  const cos = Math.cos(props.rotateAngle);
  
  const translationY = 80 + Math.sqrt(
    Math.pow(tableWidth, 2) * Math.pow(sin, 2) + Math.pow(tableHeight, 2) * Math.pow(cos, 2)
  );

  return (
    <div 
      className={classes.Player}
      style={{transform: 
        `rotate(${props.rotateAngle}rad) 
        translateY(${translationY}px) 
        rotate(-${props.rotateAngle}rad)`}}>
      <div>{props.name}</div>
      <Hand hand={props.hand} />
      <div>Chips: {props.chips}</div>
    </div>
  );
};

export default Player;