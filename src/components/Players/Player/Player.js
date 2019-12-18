import React, { useContext } from 'react';
import { PlayersLengthContext } from '../../../App';
import classes from './Player.module.css';
import Hand from '../../Hand/Hand';
import { getRotateAngle, getTranslationY } from '../../../utils/tableSeatsPositioning';

const Player = (props) => {
  const playersLength = useContext(PlayersLengthContext);
  const rotateAngle = getRotateAngle(props.seatIndex, playersLength);
  const translationY = 80 + getTranslationY(props.seatIndex, playersLength);
  // const translationY = getTranslationY(props.seatIndex, playersLength);

  return (
    <div
      className={classes.Player}
      style={{
        transform:
          `rotate(${rotateAngle}rad) 
          translateY(${translationY}px) 
          rotate(-${rotateAngle}rad)`
      }}
    >
      <div>{props.name}</div>
      <Hand hand={props.hand} />
      <div>Chips: {props.chips}</div>
    </div>
  );
};

export default Player;