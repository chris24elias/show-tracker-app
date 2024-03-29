import { AntDesign } from '@expo/vector-icons'
import { Box, Button, Heading, Icon, Pressable, Row, Text } from 'native-base'
import React, { useMemo } from 'react'
import { ActivityIndicator, ScrollView, useWindowDimensions } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'

import { Image } from '@/ui/image'

import { addShow, updateStatus } from '../../api/firebase/myShows'
import FloatingBackButton from '../../components/FloatingBackButton'
import MyCarousel from '../../components/MyCarousel'
import ShowCard from '../../components/ShowCard'
import VideoPlayer from '../../components/VideoPlayer'
import routes from '../../navigation/routes'
import { useShowDetails, useShowImages, useShowRecommendations } from '../../queries'
import useDataStore from '../../stores/data'
import { Page } from '../../theme'
import type { Recommendation } from '../../utils/types'
import ShowStatus from './ShowStatus'

interface SavedShowDetailsProps {
  navigation: any
  route: any
}

const SavedShowDetails: React.FC<SavedShowDetailsProps> = ({ navigation, route }) => {
  const { tmdbId } = route.params || {}

  const { height, width } = useWindowDimensions()
  const myShows = useDataStore((state) => state.myShows)
  const savedShow = useMemo(() => myShows.find((s) => s.tmdbId === tmdbId), [myShows, tmdbId])
  const { data, isLoading } = useShowDetails(tmdbId)
  const { data: recommendations = [], isLoading: reccsLoading } = useShowRecommendations(tmdbId)
  const { data: showImages, isLoading: isLoading3 } = useShowImages(tmdbId)
  const scrollY = useSharedValue<number>(0)
  const isScrolling = useSharedValue(false)
  const status = savedShow?.status
  const containerSize = height * 0.45

  const onAddToList = () => {
    const { poster_path, name, first_air_date } = data
    addShow({
      status: 'watching',
      tmdbId,
      poster_path,
      name,
      first_air_date
    })
  }

  const onSeasonPress = (id: string) => {
    navigation.navigate('SeasonDetails', { tvId: tmdbId, seasonId: id })
  }

  const onStatusChange = (newStatus) => {
    updateStatus(savedShow?.id, newStatus)
  }

  const onRecommendationPress = (r: Recommendation) => {
    navigation.push(routes.showDetails, {
      tmdbId: r.id
    })
  }

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
    onBeginDrag: (e) => {
      isScrolling.value = true
    },
    onEndDrag: (e) => {
      isScrolling.value = false
    }
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scrollY.value, [-100, 0, 280], [1.4, 1.1, 1], Extrapolate.CLAMP)
        },
        {
          translateY: interpolate(scrollY.value, [0, 280], [0, -100], Extrapolate.CLAMP)
        }
      ],
      opacity: interpolate(scrollY.value, [0, 280], [1, 0], Extrapolate.CLAMP),
      zIndex: scrollY.value > 2 ? -2 : 2
    }
  })

  if (isLoading || reccsLoading || isLoading3) {
    return (
      <Page>
        <FloatingBackButton />
      </Page>
    )
  }

  const { genres, name, vote_average, episode_run_time, first_air_date, overview, seasons } = data

  const backdrops = showImages?.backdrops || []
  const posters = showImages?.posters || []
  const videos = data?.videos?.results

  return (
    <Page safeAreaBottom>
      <FloatingBackButton />

      <Animated.View
        style={[
          {
            position: 'absolute',
            height: containerSize,
            width: '100%',
            overflow: 'hidden'
          },
          animatedStyle
        ]}
      >
        <MyCarousel data={posters} containerSize={containerSize} containerWidth={width} />
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: containerSize * 1.1 }}
        onScroll={scrollHandler}
      >
        <Box px={5} flexDirection="row">
          <Box flex={2} justifyContent="center">
            <Heading fontSize="3xl" mb="2">
              {name}
            </Heading>
            <Row mt="2" alignItems="center" justifyContent="space-between">
              <Rating rating={vote_average} />

              <Text fontSize="md" color="primary.500">
                {first_air_date?.slice(0, 4)} • {episode_run_time ? episode_run_time[0] : ''} min
                per episode
              </Text>
            </Row>

            <Row mt="4">
              {status ? (
                // <Button bg="secondary.500">Watching</Button>
                <ShowStatus status={status} onStatusChange={onStatusChange} />
              ) : (
                <Button bg="primary.500" onPress={onAddToList}>
                  Add to list
                </Button>
              )}
            </Row>
          </Box>
        </Box>
        <Box flexDirection="row" justifyContent="center" alignItems="center" px={5} marginTop={3}>
          <Genres genres={genres} />
        </Box>
        <Box px={5} marginTop={3}>
          <Description description={overview} />
          <Seasons seasons={seasons} onSeasonPress={onSeasonPress} />
        </Box>
        <Box px={5} marginTop={6}>
          <Heading size="lg" marginBottom={3}>
            Videos
          </Heading>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {videos &&
              videos.map((video) => {
                if (video.site === 'YouTube') {
                  return <VideoPlayer key={video.id} video={video} />
                }
              })}
          </ScrollView>
        </Box>
        <Box px={5} marginTop={6}>
          <Heading size="lg" marginBottom={2}>
            Recommendations
          </Heading>
          {reccsLoading ? (
            <ActivityIndicator />
          ) : (
            <Recommendations
              recommendations={recommendations}
              onRecommendationPress={onRecommendationPress}
            />
          )}
        </Box>
      </Animated.ScrollView>
    </Page>
  )
}

const Rating = ({ rating }) => {
  return (
    <Box flexDirection="row" justifyContent="center" alignItems="center" marginRight={2}>
      <Icon as={<AntDesign name="star" />} color="yellow.500" marginRight={2} />
      <Text fontWeight="bold">{rating?.toFixed(2)}</Text>
    </Box>
  )
}

const Genres = ({ genres }) => {
  return (
    // <Box flexDirection="row" flexWrap="wrap">
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {genres.map(({ name, id }) => {
        return (
          <Box
            key={id}
            borderColor="primary.500"
            borderWidth={2}
            padding={2}
            marginRight={3}
            my="2"
            borderRadius={8}
          >
            <Text color="white">{name}</Text>
          </Box>
        )
      })}
    </ScrollView>
    // </Box>
  )
}

const Description = ({ description }) => {
  return <Text>{description}</Text>
}

const Seasons = ({ seasons, onSeasonPress }) => {
  return (
    <Box marginTop={6}>
      <Heading size="lg" marginBottom={2}>
        Seasons
      </Heading>
      <Box mt="3">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {seasons.map((s) => {
            return <Season key={s.id} {...s} onSeasonPress={() => onSeasonPress(s.season_number)} />
          })}
        </ScrollView>
      </Box>
    </Box>
  )
}

const Season = ({
  air_date,
  episode_count,
  id,
  name,
  overview,
  poster_path,
  season_number,
  onSeasonPress
}) => {
  const poster = poster_path
    ? `https://image.tmdb.org/t/p/w${500}${poster_path}`
    : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081'

  const size = 125
  const year = air_date ? `(${air_date?.slice(0, 4) || ''})` : ''

  return (
    <Pressable
      onPress={onSeasonPress}
      // justifyContent="center"
      // alignItems="center"
      marginRight={5}
      style={{
        width: size
      }}

      // borderWidth={1}
      // borderRadius={8}
      // padding={5}
      // borderColor="primary.500"
    >
      <Image
        source={{ uri: poster }}
        style={{
          height: size * 1.41,
          width: size,
          borderRadius: 12
        }}
        contentFit="cover"
      />
      <Box mt="2">
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="white"
          marginRight={2}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Text>
        <Text fontSize="xs" fontWeight="light" color="primary.500">
          {episode_count} Episodes{year ? ` - ${year}` : ''}
        </Text>
      </Box>
    </Pressable>
  )
}

// const Seasons = ({ seasons }) => {
//   return (
//     <Box marginTop={6}>
//       <Heading size="lg" marginBottom={2}>
//         Seasons
//       </Heading>
//       {seasons.map((s) => {
//         return <Season key={s.id} {...s} />;
//       })}
//     </Box>
//   );
// };

// const Season = ({
//   air_date,
//   episode_count,
//   id,
//   name,
//   overview,
//   poster_path,
//   season_number,
// }) => {
//   return (
//     <Box
//       flexDirection="row"
//       justifyContent="center"
//       alignItems="center"
//       marginY={3}
//       borderWidth={1}
//       borderRadius={8}
//       padding={5}
//       borderColor="primary.500"
//     >
//       <Box flex={1}>
//         <Box flex={1} flexDirection="row" alignItems="center">
//           <Text fontSize="lg" color="white" marginRight={2}>
//             {name}
//           </Text>
//           <Text color="primary.500">{`(${air_date?.slice(0, 4) || ""})`}</Text>
//         </Box>

//         <ProgressBar />
//       </Box>
//       <Text fontSize="lg">0/{episode_count}</Text>
//       <Icon size="sm" as={<Feather name="chevron-right" />} color="white" />
//     </Box>
//   );
// };

const ProgressBar = () => {
  return (
    <Box
      marginTop={3}
      width="80%"
      height={2}
      borderWidth={1}
      borderColor="primary.500"
      borderRadius={8}
      overflow="hidden"
    >
      <Box height="100%" width="0%" bg="secondary.500" />
    </Box>
  )
}

const Recommendations = ({
  recommendations,
  onRecommendationPress
}: {
  recommendations: Recommendation[]
  onRecommendationPress: any
}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {recommendations.map((r) => {
        return (
          <ShowCard
            style={{
              marginRight: 15
            }}
            key={r.id}
            size={100}
            onPress={() => onRecommendationPress(r)}
            poster={r.poster_path}
            title={r.name}
            year={r.first_air_date}
          />
        )
      })}
    </ScrollView>
  )
}

export default SavedShowDetails
