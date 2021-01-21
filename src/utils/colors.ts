import colorObject from 'src/theme/colors';

export const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export const getRandomBrandColor = () => {
  const colors = Object.keys(colorObject);
  const colorsCount = colors.length;
  const color = colors[Math.floor(Math.random() * colorsCount)];
  return (colorObject as any)[color];
};
