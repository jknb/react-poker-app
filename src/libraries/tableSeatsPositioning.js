export const getRotateAngle = (index, playersLength) => {
  const offSet = 2 * Math.PI / playersLength;
  return offSet * index;
}

export const getTranslationY = (index, playersLength) => {
  const tableWidth = 640 / 2;
  const tableHeight = 340 / 2;
  const sin = Math.sin(2 * Math.PI / playersLength * index);
  const cos = Math.cos(2 * Math.PI / playersLength * index);

  return Math.sqrt(
    Math.pow(tableWidth, 2) * Math.pow(sin, 2) + Math.pow(tableHeight, 2) * Math.pow(cos, 2)
  );
}