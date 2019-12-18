import React, { useContext } from 'react';
import { PlayersLengthContext } from '../../App';
import classes from './Dealer.module.css';
import { getRotateAngle, getTranslationY } from '../../utils/tableSeatsPositioning';

const Dealer = (props) => {
  const playersLength = useContext(PlayersLengthContext);
  const rotateAngle = getRotateAngle(props.dealerIndex, playersLength);
  const translationY = getTranslationY(props.dealerIndex, playersLength) - 70;

  return (
    <div
      className={classes.Dealer}
      style={{
        transform:
          `rotate(${rotateAngle}rad) 
          translateY(${translationY}px) 
          rotate(-${rotateAngle}rad)`
      }}
    >
      D
    </div>
  );
}

export default Dealer;