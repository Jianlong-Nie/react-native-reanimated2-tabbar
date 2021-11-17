import React, { useEffect } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { color } from "react-native-tailwindcss";
import {
  Colors,
  DURATION,
  ICON_SIZE,
  PADDING,
  SEGMENT,
} from "./icons/Constants";

interface PariculesProps {
  preActive: number;
  active: number;
}

const size = 6;
const topParticules = [0, 1, 2];
const bottomParticules = [0, 1];
const HEIGHT = ICON_SIZE + PADDING * 2;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
  },
  particules: {
    justifyContent: "center",
    height: HEIGHT,
  },

  particule: {
    backgroundColor: Colors.primary,
    position: "absolute",
    left: 0,
    top: 0,
    width: size,
    height: size,
    borderRadius: size / 2,
  },
});

export default ({ active, preActive }: PariculesProps) => {
  const isHide = active === preActive && preActive === 0;
  const { width } = useWindowDimensions();
  const itemWidth = SEGMENT;
  const distance =
    itemWidth * Math.abs(active - preActive) === 0
      ? itemWidth
      : itemWidth * Math.abs(active - preActive);
  const middle = HEIGHT / 2 - size / 2 - 10;
  const x = (width / 5) * active + width / 5 / 2;
  const current1X = useSharedValue(0);
  const current2X = useSharedValue(0);
  const current3X = useSharedValue(0);
  const current4X = useSharedValue(0);
  const current5X = useSharedValue(0);

  const animatedStyle1 = useAnimatedStyle(() => {
    current1X.value = withTiming(x - 10, {
      duration: DURATION,
      easing: Easing.linear,
    });
    const progress =
      Math.abs(current1X.value - itemWidth * (preActive + 0.5)) / distance;
    const scale = interpolate(progress, [0, 0.5, 1], [0.75, 1, 0.75]);
    const top = interpolate(
      progress,
      [0, 0.5, 1],
      [middle, PADDING / 2 - 10, middle],
      Extrapolate.CLAMP
    );
    return {
      opacity: progress === 0 || progress >= 0.85 || isHide ? 0 : 1,
      transform: [
        { translateX: current1X.value },
        { translateY: top },
        { scale },
      ],
    };
  }, [x]);
  const animatedStyle2 = useAnimatedStyle(() => {
    current2X.value = withTiming(x, {
      duration: DURATION,
      easing: Easing.linear,
    });
    const progress =
      Math.abs(current2X.value - itemWidth * (preActive + 0.5)) / distance;
    const scale = interpolate(progress, [0, 0.5, 1], [0.75, 1.5, 0.75]);
    const top = interpolate(
      progress,
      [0, 0.5, 1],
      [middle, PADDING / 2 - 10, middle],
      Extrapolate.CLAMP
    );
    return {
      opacity: progress === 0 || progress > 0.9 || isHide ? 0 : 1,
      transform: [
        { translateX: current2X.value },
        { translateY: top },
        { scale },
      ],
    };
  }, [x]);
  const animatedStyle3 = useAnimatedStyle(() => {
    current3X.value = withTiming(x + 10, {
      duration: DURATION,
      easing: Easing.linear,
    });
    const progress =
      Math.abs(current3X.value - itemWidth * (preActive + 0.5)) / distance;
    const scale = interpolate(progress, [0, 0.5, 1], [0.75, 1, 0.75]);
    const top = interpolate(
      progress,
      [0, 0.5, 1],
      [middle, PADDING / 2 - 10, middle],
      Extrapolate.CLAMP
    );
    return {
      opacity: progress === 0 || progress >= 0.85 || isHide ? 0 : 1,
      transform: [
        { translateX: current3X.value },
        { translateY: top },
        { scale },
      ],
    };
  }, [x]);

  const animatedStyle4 = useAnimatedStyle(() => {
    current4X.value = withTiming(x, {
      duration: DURATION,
      easing: Easing.linear,
    });
    const progress =
      Math.abs(current4X.value - itemWidth * (preActive + 0.5)) / distance;
    const scale = interpolate(progress, [0, 0.5, 1], [0.75, 1.2, 0.75]);
    const top = interpolate(
      progress,
      [0, 0.5, 1],
      [middle, HEIGHT - PADDING / 2 - 14, middle],
      Extrapolate.CLAMP
    );
    return {
      opacity: progress === 0 || progress >= 0.85 || isHide ? 0 : 1,
      transform: [
        { translateX: current4X.value },
        { translateY: top },
        { scale },
      ],
    };
  }, [x]);

  const animatedStyle5 = useAnimatedStyle(() => {
    current5X.value = withTiming(x - 10, {
      duration: DURATION,
      easing: Easing.linear,
    });
    const progress =
      Math.abs(current5X.value - itemWidth * (preActive + 0.5)) / distance;
    const scale = interpolate(progress, [0, 0.5, 1], [0.75, 1.2, 0.75]);
    const top = interpolate(
      progress,
      [0, 0.5, 1],
      [middle, HEIGHT - PADDING / 2 - 14, middle],
      Extrapolate.CLAMP
    );

    return {
      opacity: progress === 0 || progress >= 0.8 || isHide ? 0 : 1,
      transform: [
        { translateX: current5X.value },
        { translateY: top },
        { scale },
      ],
    };
  }, [x]);
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.particules}>
        {topParticules.map((particule, index) => {
          let content = (
            <Animated.View
              key={particule}
              style={[styles.particule, animatedStyle1]}
            />
          );
          switch (index) {
            case 0:
              content = content = (
                <Animated.View
                  key={particule}
                  style={[styles.particule, animatedStyle1]}
                />
              );
              break;
            case 1:
              content = content = (
                <Animated.View
                  key={particule}
                  style={[styles.particule, animatedStyle2]}
                />
              );
              break;
            case 2:
              content = (
                <Animated.View
                  key={particule}
                  style={[styles.particule, animatedStyle3]}
                />
              );
              break;
            default:
              break;
          }

          return content;
        })}
        {bottomParticules.map((particule) => {
          let content = (
            <Animated.View
              key={particule}
              style={[styles.particule, animatedStyle1]}
            />
          );
          switch (particule) {
            case 0:
              content = content = (
                <Animated.View
                  key={particule}
                  style={[styles.particule, animatedStyle4]}
                />
              );
              break;
            case 1:
              content = content = (
                <Animated.View
                  key={particule}
                  style={[styles.particule, animatedStyle5]}
                />
              );
              break;

            default:
              break;
          }

          return content;
        })}
      </View>
    </View>
  );
};
