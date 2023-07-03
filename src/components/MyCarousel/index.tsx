import { LinearGradient } from 'expo-linear-gradient'
import { Box } from 'native-base'
import React, { useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'

import { Colors } from '../../theme'
import { Pagination } from './Pagination'

interface MyCarouselProps {
  data: any[]
  containerSize: number
  containerWidth: number
}

const MyCarousel: React.FC<MyCarouselProps> = ({ data = [], containerSize, containerWidth }) => {
  const progressValue = useSharedValue<number>(0)
  const [activeSlide, setActiveSlide] = useState(0)

  const renderItem = ({ item: { path, height, aspect_ratio }, index }) => {
    return (
      <Box
        style={{
          height: '100%',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Image
          source={{ uri: path }}
          style={{
            position: 'absolute',
            height: containerWidth / aspect_ratio,
            width: containerWidth,
            alignSelf: 'center'
          }}
          // resizeMode="cover"
          // resizeMode="contain"
        />
      </Box>
    )
  }

  const bgColor = (opactiy = '1') => `${Colors.mainBg[500]}${opactiy}`

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
        width={containerWidth}
        // height={350}
        // autoPlay={true}
        loop={false}
        data={data}
        // scrollAnimationDuration={1000}
        renderItem={renderItem}
        onProgressChange={(_, absoluteProgress) => (progressValue.value = absoluteProgress)}
      />

      <LinearGradient
        pointerEvents="none"
        // Background Linear Gradient
        colors={[bgColor('00'), bgColor('00'), bgColor('20'), bgColor('')]}
        // locations={[0, 0, 0.8]}
        style={{
          position: 'absolute',
          zIndex: 2,
          height: '100%',
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: '15%'
        }}
      >
        <Pagination dotsLength={data.length} progressValue={progressValue} />
      </LinearGradient>
    </Box>
  )
}

export default MyCarousel

const styles = StyleSheet.create({})
