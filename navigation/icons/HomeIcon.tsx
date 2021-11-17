import * as React from "react";
import Animated from "react-native-reanimated";
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg";
import { color, t } from "react-native-tailwindcss";
import { Colors, IconProps, ICON_SIZE } from "./Constants";

function HomeIcon({ active = false }: IconProps) {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} fill="none">
      <Path
        d="M7.135 18.773v-3.057c0-.78.637-1.414 1.423-1.414h2.875c.377 0 .74.15 1.006.414.267.265.417.625.417 1v3.057c-.002.325.126.637.356.867.23.23.544.36.87.36h1.962a3.46 3.46 0 002.443-1 3.41 3.41 0 001.013-2.422V7.867c0-.735-.328-1.431-.895-1.902L11.934.675a3.097 3.097 0 00-3.949.072L1.467 5.965A2.474 2.474 0 00.5 7.867v8.702C.5 18.464 2.047 20 3.956 20h1.916c.68 0 1.231-.544 1.236-1.218l.027-.009z"
        fill={active ? Colors.primary : "white"}
        stroke={active ? Colors.primary : Colors.border}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default HomeIcon;
