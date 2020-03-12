import React from 'react';
const usePlayerModel = () => ({ chips: 1500 });

const withBettingPanelProps = Component => props => {
  const { chips } = usePlayerModel();

  return (
    <Component chips={chips} {...props} />
  );
};

export default withBettingPanelProps;