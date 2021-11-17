import * as React from "react";
import Animated from "react-native-reanimated";
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg";
import { color } from "react-native-tailwindcss";
import { Colors, IconProps, ICON_SIZE } from "./Constants";

function CategoryIcon({ active = false }: IconProps) {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} fill="none">
      <G
        strokeWidth={2}
        fill={active ? Colors.primary : "white"}
        stroke={active ? Colors.primary : Colors.border}
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M1 1h6a4 4 0 014 4v14a3 3 0 00-3-3H1V1zM21 1h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V1z" />
      </G>
    </Svg>
  );
}

export default CategoryIcon;
