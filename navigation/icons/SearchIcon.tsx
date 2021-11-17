import * as React from "react";
import Animated from "react-native-reanimated";
import Svg, { SvgProps, Mask, Path, G, Circle } from "react-native-svg";
import { Colors, IconProps, ICON_SIZE } from "./Constants";

function SearchIcon({ active = false }: IconProps) {
  return (
    <Svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      fill={active ? Colors.primary : "white"}
      stroke={active ? Colors.primary : Colors.border}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Circle cx={11} cy={11} r={8} />
      <Path d="M21 21l-4.35-4.35" />
    </Svg>
  );
}

export default SearchIcon;
