import React, { ReactElement, cloneElement, useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { t } from "react-native-tailwindcss";
import { DURATION, ICON_SIZE, PADDING, SEGMENT } from "./icons/Constants";
import Weave from "./Weave";

interface TabItemProps {
  children: ReactElement;
  onPress: () => void;
  //   active: Animated.Value<number>;
  index: number;
  isFocused: boolean;
  active: number;
  preActive: number;
}

function TabItem({
  children,
  onPress,
  index,
  isFocused,
  active,
  preActive,
}: TabItemProps) {
  const goRight = active > preActive;
  const animatedStyle = useAnimatedStyle(() => {
    let width = ICON_SIZE;
    if (isFocused) {
      width = withTiming(ICON_SIZE + 8, {
        duration: DURATION,
        easing: Easing.linear,
      });
    } else {
      width = withTiming(0, {
        duration: DURATION,
        easing: Easing.linear,
      });
    }
    return { width };
  }, [isFocused]);
  const style = useMemo<StyleProp<ViewStyle>>(() => {
    if (index === preActive) {
      if (goRight) {
        return { alignItems: "flex-end" };
      } else {
        return { alignItems: "flex-start" };
      }
    }
    if (index === active) {
      if (goRight) {
        return { alignItems: "flex-start" };
      } else {
        return { alignItems: "flex-end" };
      }
    }
    return { alignItems: "flex-end" };
  }, [goRight, index, preActive, active]);
  return (
    <TouchableWithoutFeedback {...{ onPress }}>
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
        <Weave {...{ active, index, preActive }} />
        <Animated.View
          style={[
            {
              width: ICON_SIZE,
              height: ICON_SIZE,
            },
            style,
          ]}
        >
          <View style={[StyleSheet.absoluteFill]}>{children}</View>
          <Animated.View
            style={[t.overflowHidden, t.bgWhite, style, animatedStyle]}
          >
            {cloneElement(children, { active: true })}
          </Animated.View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default TabItem;
