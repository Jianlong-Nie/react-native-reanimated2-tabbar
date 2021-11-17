import React, { ReactElement, cloneElement, useMemo } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { t } from "react-native-tailwindcss";
import { ICON_SIZE, PADDING, SEGMENT } from "./icons/Constants";

interface TabItemProps {
  children: ReactElement;
  onPress: () => void;
  //   active: Animated.Value<number>;
  index: number;
  isFocused: boolean;
  active: number;
  preActive: number;
}

function TabItem({ children, onPress, active, preActive }: TabItemProps) {
  return (
    <TouchableOpacity {...{ onPress }}>
      <View
        style={[
          t.flex,
          t.justifyCenter,
          t.itemsCenter,
          {
            height: ICON_SIZE + PADDING * 2,
            width: SEGMENT - 10,
          },
        ]}
      >
        <View
          style={[
            {
              width: ICON_SIZE,
              height: ICON_SIZE,
            },
            t.itemsCenter,
          ]}
        >
          <View style={[StyleSheet.absoluteFill]}>{children}</View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default TabItem;
