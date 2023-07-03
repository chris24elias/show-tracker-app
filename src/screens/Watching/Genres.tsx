import { Box, Text, useTheme } from 'native-base'
import React from 'react'
import Steve from 'react-native-steve'
import { useQuery } from 'react-query'

import api from '../../api'

export type IGenresProps = {}

const Genres: React.FC<IGenresProps> = ({}) => {
  const { data: genres } = useQuery('TVGenres', api.getTVGenres)
  const theme = useTheme()

  return (
    <Box mt="3">
      <Steve
        isRTL={false}
        data={genres || []}
        renderItem={({ item }) => {
          return (
            <Box
              p="2"
              borderWidth="1"
              borderColor="secondary.500"
              borderRadius="10"
              marginRight="2"
              mb="2"
            >
              <Text>{item.name}</Text>
            </Box>
          )
        }}
        containerStyle={{
          paddingHorizontal: theme.sizes['3']
        }}
        keyExtractor={(item) => item.id}
      />
    </Box>
  )
}

export { Genres }
