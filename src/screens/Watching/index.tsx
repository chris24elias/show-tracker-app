import { AntDesign } from '@expo/vector-icons'
import { Actionsheet, Box, CheckIcon, Heading, Icon, IconButton, useDisclose } from 'native-base'
import React, { useMemo, useState } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { FlatGrid } from 'react-native-super-grid'

import ShowCard from '../../components/ShowCard'
import routes from '../../navigation/routes'
import useDataStore from '../../stores/data'
import LayoutAnimations from '../../utils/LayoutAnimations'
import type { SavedShow } from '../../utils/types'
import TopTabs from './TopTabs'

interface WatchingProps {
  navigation: any
}

type QueryFormData = {
  query: string
}

// const SEARCH_CARD_HEIGHT = 180;

// const filterToStatus = (filter: string) => {
//   switch(filter){
//     case "All":
//       return "";
//       case "Watching" :
//         return "watching"
//   }
// }

const sortShows = (shows: SavedShow[], sort: 'Date Added' | 'Alphabetical' | 'Year') => {
  if (sort === 'Alphabetical') {
    return shows.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
  }

  if (sort === 'Year') {
    return shows.sort((a, b) => {
      if (a.first_air_date < b.first_air_date) {
        return -1
      }
      if (a.first_air_date > b.first_air_date) {
        return 1
      }
      return 0
    })
  }

  if (sort === 'Date Added') {
    return shows.sort((a, b) => {
      const ta = a?.date_added?.seconds

      const tb = b?.date_added?.seconds
      return tb - ta
    })
  }

  return shows
}

const ActionSheetOptions = ['Date Added', 'Alphabetical', 'Year']

const Watching: React.FC<WatchingProps> = ({ navigation }) => {
  const { width } = useWindowDimensions()
  const { isOpen, onOpen, onClose } = useDisclose()
  const [activeSort, setSort] = useState<'Date Added' | 'Alphabetical' | 'Year'>('Date Added')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const SEARCH_CARD_HEIGHT = width * 0.29
  const myShows = useDataStore((state) => state.myShows)

  const filteredAndSortedShows = useMemo(() => {
    let shows = myShows
    // const sortedShows = sortShows(myShows, activeSort);
    if (selectedFilter && selectedFilter !== 'All') {
      shows = shows.filter((s) => s.status === selectedFilter.toLowerCase())
    }

    return sortShows(shows, activeSort)
  }, [myShows, selectedFilter, activeSort])

  const onFilterChange = (newStatus: string) => {
    LayoutAnimations.ease2()
    setSelectedFilter(newStatus)
  }

  const renderItem = ({ item }) => {
    return (
      <ShowCard
        // style={{ height: 250 }}
        size={SEARCH_CARD_HEIGHT}
        poster={item.poster_path}
        title={item.name}
        year={item.first_air_date}
        onPress={() =>
          navigation.navigate(routes.showDetails, {
            tmdbId: item.tmdbId
          })
        }
      />
    )
  }

  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {/* <Actionsheet.Item endIcon={<CheckIcon size={4} />}>Date Added</Actionsheet.Item>
          <Actionsheet.Item>Alphabetical</Actionsheet.Item>
          <Actionsheet.Item>Year</Actionsheet.Item> */}
          {ActionSheetOptions.map((option, i) => {
            const isSelected = activeSort === option
            return (
              <Actionsheet.Item
                key={String(i)}
                onPress={() => setSort(option)}
                endIcon={isSelected ? <CheckIcon size={4} /> : null}
                bg={isSelected ? 'primary.500' : 'transparent'}
              >
                {option}
              </Actionsheet.Item>
            )
          })}
        </Actionsheet.Content>
      </Actionsheet>
      <Box flex={1} bg="mainBg.500" safeAreaTop>
        <Box flexDirection="row" marginY={4} marginX={3} justifyContent="space-between">
          <Heading>My Shows</Heading>
          <IconButton
            onPress={onOpen}
            icon={<Icon as={<AntDesign name="filter" />} size="md" color="white" />}
          />
        </Box>
        <TopTabs selectedFilter={selectedFilter} onFilterChange={onFilterChange} />

        <Box marginTop={5} />
        <FlatGrid
          keyExtractor={(item) => item.id}
          itemDimension={SEARCH_CARD_HEIGHT}
          data={filteredAndSortedShows}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </Box>
    </>
  )
}

export default Watching

const styles = StyleSheet.create({})
