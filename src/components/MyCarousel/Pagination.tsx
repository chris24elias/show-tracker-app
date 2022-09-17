import React from "react";
import { View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export type IPaginationProps = {
  dotsLength: number;
  progressValue: Animated.SharedValue<Number>;
};

const dotSize = 10;
const inactiveDotScale = 0.6;
const inactiveDotOpacity = 0.6;

const Pagination: React.FC<IPaginationProps> = ({
  dotsLength,
  progressValue,
}) => {
  return (
    <View style={{ flexDirection: "row", position: "absolute", bottom: "5%" }}>
      {new Array(dotsLength).fill("").map((_, i) => {
        return (
          <PaginationDot
            key={String(i)}
            {...{ dotsLength, progressValue, index: i }}
          />
        );
      })}
    </View>
  );
};

export { Pagination };

const PaginationDot = ({ dotsLength, progressValue, index }) => {
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      progressValue.value,
      [index - 1, index, index + 1],
      [inactiveDotScale, 1, inactiveDotScale],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      progressValue.value,
      [index - 1, index, index + 1],
      [inactiveDotOpacity, 1, inactiveDotOpacity],
      Extrapolate.CLAMP
    );

    return {
      borderRadius: 1,
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={style}>
      <View
        style={{
          height: dotSize,
          width: dotSize,
          borderRadius: dotSize / 2,
          marginRight: 10,
          //   backgroundColor: "white",
          //   marginHorizontal: 8,
          backgroundColor: "rgba(255, 255, 255, 0.92)",
        }}
      />
    </Animated.View>
  );
};
