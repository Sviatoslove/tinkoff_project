import { COLORS, COLORSKeys } from "./constants";
import getRandomNum from "./getRandomNum";

export const colorsKeys = [...COLORSKeys];

export const getRandomColor = () => COLORS[colorsKeys.splice(getRandomNum(0, colorsKeys.length -1), 1).toString()]