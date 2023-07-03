import React, { useCallback, useState } from 'react'
import { Pressable } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'

export default function VideoPlayer({ video }) {
  const [playing, setPlaying] = useState(false)

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false)
      //   Alert.alert("video has finished playing!");
    }
  }, [])

  const size = 180
  return (
    <Pressable
      style={{
        height: size,
        width: size * 1.77777777778,
        borderWidth: 1,
        marginRight: 15
        // borderRadius: 12,
      }}
      onPress={() => {
        if (!playing) {
          setPlaying(true)
        }
      }}
      //   pointerEvents={playing ? "box-none" : "auto"}
    >
      {/* <View pointerEvents={playing ? "auto" : "none"}> */}
      <YoutubePlayer
        height={size}
        play={playing}
        //   webViewStyle={{ borderRadius: 12 }}
        videoId={video.key}
        onChangeState={onStateChange}
      />
      {/* </View> */}
    </Pressable>
  )
}
