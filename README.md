# react-native-reanimated2-tabbar
最终效果
![Nov-17-2021 13-47-52.gif](https://upload-images.jianshu.io/upload_images/9126595-401d988db9f7b8b3.gif?imageMogr2/auto-orient/strip)
这里记录下所有实现过程以及踩过的坑：
#####创建项目(这里用的是expo，react-native一样的)
```
expo init react-native-reanimated2demo
```
这里我选择的磨板是```Choose a template: › tabs (TypeScript)```
#####添加react-native-reanimated2
```
expo install react-native-reanimated
```
####安装react-native-svg
```
expo install react-native-svg
```
#####添加需要的svg icon
![Nov-17-2021 14-19-05.gif](https://upload-images.jianshu.io/upload_images/9126595-8f6af281180be5d2.gif?imageMogr2/auto-orient/strip)
在figma或者sketch等设计软件里面复制图标的svg代码，然后用[svg转svg组件工具](https://react-svgr.com/playground/)生成react-native组件：
![image.png](https://upload-images.jianshu.io/upload_images/9126595-436a381e3acd1986.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
注意左侧选择react-native以及TypeScript，比如我这边最终生成的HomeIcon的代码如下：
```
import * as React from "react";
import Animated from "react-native-reanimated";
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg";

function HomeIcon() {
  return (
    <Svg width={20} height={20} fill="none">
      <Path
        d="M7.135 18.773v-3.057c0-.78.637-1.414 1.423-1.414h2.875c.377 0 .74.15 1.006.414.267.265.417.625.417 1v3.057c-.002.325.126.637.356.867.23.23.544.36.87.36h1.962a3.46 3.46 0 002.443-1 3.41 3.41 0 001.013-2.422V7.867c0-.735-.328-1.431-.895-1.902L11.934.675a3.097 3.097 0 00-3.949.072L1.467 5.965A2.474 2.474 0 00.5 7.867v8.702C.5 18.464 2.047 20 3.956 20h1.916c.68 0 1.231-.544 1.236-1.218l.027-.009z"
        fill="none"
        stroke="red"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default HomeIcon;
```
其中我们可以看到，fill以及stroke属性，这两个就是我们选中时候和没选中时候的颜色值，这里我们换成我们自己想要的颜色值，Svg size属性呢就是大小，这里替换成我们需要的大小，我们还需要一个属性来判断当前icon是不是选中的状态，最终代码如下：
```
import * as React from "react";
import Animated from "react-native-reanimated";
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg";
import { color, t } from "react-native-tailwindcss";
import { IconProps, ICON_SIZE } from "./Constants";

function HomeIcon({ active = false }: IconProps) {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} fill="none">
      <Path
        d="M7.135 18.773v-3.057c0-.78.637-1.414 1.423-1.414h2.875c.377 0 .74.15 1.006.414.267.265.417.625.417 1v3.057c-.002.325.126.637.356.867.23.23.544.36.87.36h1.962a3.46 3.46 0 002.443-1 3.41 3.41 0 001.013-2.422V7.867c0-.735-.328-1.431-.895-1.902L11.934.675a3.097 3.097 0 00-3.949.072L1.467 5.965A2.474 2.474 0 00.5 7.867v8.702C.5 18.464 2.047 20 3.956 20h1.916c.68 0 1.231-.544 1.236-1.218l.027-.009z"
        fill={active ? color.primary : color.white}
        stroke={active ? color.primary : color.unActive}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default HomeIcon;
```
这里Constants内容：
```
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
export const ICON_SIZE = SEGMENT - horizontalPadding;

export const Colors = {
  primary: "#0AC66F",
  border: "#616164",
};
```
####安装react-native-tailwindcss（非必须）
```
yarn add react-native-tailwindcs
```
####实现自定义的tabbar以及tabbarItem
```
import React, { useState } from "react";
import { View } from "react-native";
import { t } from "react-native-tailwindcss";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import HomeIcon from "./icons/HomeIcon";
import CategoryIcon from "./icons/CategoryIcon";
import SearchIcon from "./icons/SearchIcon";
import FinanceIcon from "./icons/FinanceIcon";
import MoreIcon from "./icons/MoreIcon";
import TabItem from "./TabItem";
import { Colors } from "./icons/Constants";
export const bottomHeight = 70;

function BottomCustomTab({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [active, setActive] = useState(0);
  const [preActive, setPreActive] = useState(0);

  return (
    <React.Fragment>
      <View
        style={[
          t.absolute,
          t.flexRow,
          t.bgWhite,
          t.bottom0,
          t.justifyAround,
          t.wFull,
          t.shadowMd,
          t.roundedTLg,
          t.pX4,
          {
            height: bottomHeight,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const isFocused = active === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key || undefined,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
            setPreActive(active);
            setActive(index);
          };
          let Icon = <HomeIcon />;
          switch (route.name) {
            case "Home":
              Icon = <HomeIcon active={isFocused} />;
              break;
            case "Calendar":
              Icon = <CategoryIcon active={isFocused} />;
              break;
            case "FindCourse":
              Icon = <SearchIcon active={isFocused} />;
              break;
            case "Finance":
              Icon = <FinanceIcon active={isFocused} />;
              break;
            case "UserCenter":
              Icon = <MoreIcon active={isFocused} />;
              break;
            default:
              break;
          }

          return (
            <TabItem
              onPress={onPress}
              index={index}
              isFocused={isFocused}
              active={active}
              preActive={preActive}
            >
              {Icon}
            </TabItem>
          );
        })}
      </View>
    </React.Fragment>
  );
}

export default BottomCustomTab;

```
```
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

```
到目前为止，我们已经实现了自定义tabbar，[代码](https://github.com/zhuchuanwu/react-native-customtabbar)
效果如下：
![Nov-17-2021 15-18-26.gif](https://upload-images.jianshu.io/upload_images/9126595-7289c8c2aa7913d3.gif?imageMogr2/auto-orient/strip)
下面是我们的重点：实现动画效果
####实现颜色从一个item转移到另一个item的效果
######整体思路：在icon上面做文章，底下一层未选中的icon，上面悬浮一层选中的icon，选中的icon通过动画来控制其width，从而实现颜色渐变的效果，我们来试下：
修改TabItem，在icon下面添加选中的icon：
```
 <View style={[StyleSheet.absoluteFill]}>{children}</View>
  {cloneElement(children, { active: true })}
```
目前的效果：
![image.png](https://upload-images.jianshu.io/upload_images/9126595-ef23ed43faef8f66.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
因为选中icon全部遮盖住了下面的icon：
修改tabbar
![image.png](https://upload-images.jianshu.io/upload_images/9126595-0c92221a1da45495.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
去掉所有icon的动态选中效果，
添加动画style：
```
const animatedStyle = useAnimatedStyle(() => {
    return {
      width: isFocused
        ? withTiming(ICON_SIZE, {
            duration: DURATION,
            easing: Easing.linear,
          })
        : withTiming(0, {
            duration: DURATION,
            easing: Easing.linear,
          }),
    };
  });
```
```
 <Animated.View style={[t.overflowHidden, animatedStyle]}>
            {cloneElement(children, { active: true })}
          </Animated.View>
```
注意一定要有：t.overflowHidden这个style，就是{overflow:"hidden"}
为了判断颜色应该从右边进入还是左边进入，我们需要判断active和preActive的大小，
![Nov-17-2021 15-49-53.gif](https://upload-images.jianshu.io/upload_images/9126595-473ee6d617ce0343.gif?imageMogr2/auto-orient/strip)
####实现粒子效果
```
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
import { DURATION, ICON_SIZE, PADDING, SEGMENT } from "./icons/Constants";

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
    backgroundColor: color.primary,
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
```
####添加波浪效果
```
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
```







