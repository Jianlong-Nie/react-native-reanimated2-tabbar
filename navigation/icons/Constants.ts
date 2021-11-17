import { Dimensions, PixelRatio } from "react-native";

const { width } = Dimensions.get("window");

export interface IconProps {
  active?: boolean;
}

const numberOfIcons = 5;
const horizontalPadding = 48;
export const DURATION = 450;
export const PADDING = 16;
export const SEGMENT = PixelRatio.roundToNearestPixel(width / numberOfIcons);
export const ICON_SIZE = 24;
export const Colors = {
  primary: "#F36B7F",
  border: "#616164",
};
