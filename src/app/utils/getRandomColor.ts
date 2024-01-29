import localStorageService from '../services/localStorage.service';
import { COLORS, COLORSKeys } from './constants';
import getRandomNum from './getRandomNum';

const getColorsLocal = () => {
  let colorsKeys = localStorageService.getColors();
  if (colorsKeys) return colorsKeys;
  return [...COLORSKeys];
};

export let colorsKeys:any = []

export const getRandomColor = () => {
  colorsKeys = [...getColorsLocal()];
  return COLORS[
    colorsKeys.splice(getRandomNum(0, colorsKeys.length - 1), 1).toString()
  ];
};
