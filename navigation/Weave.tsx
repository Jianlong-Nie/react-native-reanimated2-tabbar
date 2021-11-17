import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  eq,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { color } from "react-native-tailwindcss";
import { Colors, DURATION, ICON_SIZE, PADDING } from "./icons/Constants";

interface WeaveProps {
  active: number;
  index: number;
  preActive: number;
}

const SIZE = ICON_SIZE + PADDING * 2;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  weave: {
    borderRadius: SIZE / 2,
    width: SIZE,
    height: SIZE,
    borderWidth: 4,
    borderColor: Colors.primary,
  },
});

export default ({ active, index, preActive }: WeaveProps) => {
  let isActive = active === index;
  if (preActive === active) {
    if (preActive === 0) {
      isActive = false;
    }
  }
  const currentScale = useSharedValue(0.1);
  const animatedStyle = useAnimatedStyle(() => {
    currentScale.value = isActive
      ? withTiming(1.5, {
          duration: 350,
          easing: Easing.linear,
        })
      : withTiming(0.1, {
          duration: 350,
          easing: Easing.linear,
        });

    const opacity = interpolate(
      currentScale.value / 1.5,
      [0, 0.5, 1],
      [0, 0.8, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [{ scale: currentScale.value }],
    };
  });
  // const activeTransition = withTransition(isActive, { duration: 250 });
  // // scale=0 doesn't work on Android
  // const scale = mix(activeTransition, 0.1, 1.5);
  // // Because scale=0 doesn't work we need this interpolation
  // const opacity = interpolate(activeTransition, {
  //   inputRange: [0, 0.5, 1],
  //   outputRange: [0, 1, 0],
  // });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.weave, animatedStyle]} />
    </View>
  );
};
