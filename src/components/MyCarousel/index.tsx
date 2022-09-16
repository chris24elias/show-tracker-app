import { Box } from "native-base";
import React, { useState } from "react";
import { Image, StyleSheet, useWindowDimensions } from "react-native";
// import Carousel, { Pagination } from 'react-native-snap-carousel';
import Carousel from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../theme";

interface MyCarouselProps {
  data: any[];
  containerSize: number;
  containerWidth: number;
}

const MyCarousel: React.FC<MyCarouselProps> = ({
  data = [],
  containerSize,
  containerWidth,
}) => {
  const renderItem = ({ item: { path, height, aspect_ratio }, index }) => {
    return (
      <Box
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: path }}
          style={{
            position: "absolute",
            height: containerWidth / aspect_ratio,
            width: containerWidth,
            alignSelf: "center",
          }}
          // resizeMode="cover"
          // resizeMode="contain"
        />
      </Box>
    );
  };

  const [activeSlide, setActiveSlide] = useState(0);

  const bgColor = (opactiy = "1") => `${Colors.mainBg[500]}${opactiy}`;
  return (
    <Box style={{ height: containerSize }}>
      {/* <Carousel
        layout="default"
        // ref={ref => this.carousel = ref}
        data={data}
        sliderWidth={containerWidth}
        itemWidth={containerWidth}
        renderItem={renderItem}
        onSnapToItem={(index) => {
          // this.setState({activeIndex:index})
          setActiveSlide(index);
        }}
        style={{
          backgroundColor: 'white',
          height: '100%'
        }}
        inactiveSlideScale={1}
      /> */}

      <Carousel
        loop
        width={containerWidth}
        // height={350}
        // autoPlay={true}
        data={data}
        // scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={renderItem}
      />

      <LinearGradient
        pointerEvents="none"
        // Background Linear Gradient
        colors={[bgColor("00"), bgColor("00"), bgColor("20"), bgColor("")]}
        // locations={[0, 0, 0.8]}
        style={{
          position: "absolute",
          zIndex: 2,
          height: "100%",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: "15%",
        }}
      >
        {/* <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          containerStyle={{
            position: "absolute",
            //   backgroundColor: 'rgba(0, 0, 0, 0.75)',
            alignSelf: "center",
            bottom: 0,
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: "rgba(255, 255, 255, 0.92)",
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        /> */}
      </LinearGradient>
    </Box>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({});
