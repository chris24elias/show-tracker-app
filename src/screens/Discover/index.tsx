import { Box, FlatList, Heading } from 'native-base'
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, Text, useWindowDimensions } from 'react-native'
import { FlatGrid } from 'react-native-super-grid'

import api from '../../api'
import PageLoader from '../../components/PageLoader'
import SearchBar from '../../components/SearchBar'
import ShowCard from '../../components/ShowCard'
import useSetState from '../../hooks/useSetState'
import routes from '../../navigation/routes'
import {
  useAiringTodayShows,
  useOnTheAirShows,
  usePopularShows,
  useTopRatedShows
} from '../../queries'
import { Page } from '../../theme'
import LayoutAnimations from '../../utils/LayoutAnimations'
import type { TMDBSearchResponse, TMDBSearchResult } from '../../utils/types'
import DiscoverSection from './DiscoverSection'

interface SearchProps {
  navigation: any
}

type QueryFormData = {
  query: string
}

type State = {
  results: TMDBSearchResult[]
  page: number
  totalResults: number
  totalPages: number
  searchFocused: boolean
}

const defaultState: State = {
  results: [],
  page: 1,
  totalResults: 0,
  totalPages: 0,
  searchFocused: false
}

const Search: React.FC<SearchProps> = ({ navigation }) => {
  const { width, height } = useWindowDimensions()
  const SEARCH_CARD_HEIGHT = width * 0.43
  const popularQuery = usePopularShows()
  const topRatedQuery = useTopRatedShows()
  const onAirQuery = useOnTheAirShows()
  const airingToday = useAiringTodayShows()
  const queries = [topRatedQuery, popularQuery, onAirQuery, airingToday]
  const { control, handleSubmit, watch } = useForm<QueryFormData>({
    defaultValues: { query: '' }
  })
  const isFirstRender = useRef(true)
  const [state, setState] = useSetState<State>(defaultState)
  const query = watch('query')

  useEffect(() => {
    isFirstRender.current = false
  }, [])

  useEffect(() => {
    if (query === '') {
      // LayoutAnimations.ease2();
      setState(defaultState)
    }
  }, [query, setState])

  const onSearchBlurFocus = (val) => {
    // LayoutAnimations.ease2();
    setState({
      searchFocused: val
    })
  }

  const searchShows = async (formData: QueryFormData) => {
    const response = await api.searchTmdbShows(formData.query)
    const tmdbResults: TMDBSearchResponse = response.data
    LayoutAnimations.ease2()
    setState({
      results: tmdbResults.results
    })
  }

  const getPosterForItem = (item: TMDBSearchResult) => {
    if (!item.poster_path) {
      return 'https://www.trroofingsheets.co.uk/wp-content/uploads/2016/05/default-no-image-1.png'
    }
    return api.getUrlForImagePath(item.poster_path)
  }

  let isLoading = false
  let isError = false

  queries.forEach((q) => {
    if (q.isError) {
      isError = true
    }
    if (q.isLoading) {
      isLoading = true
    }
  })

  if (isLoading) {
    return <PageLoader />
  }

  if (isError) {
    return <Text>Error</Text>
  }
  const popular = popularQuery?.data.data.results
  const topRated = topRatedQuery?.data.data.results
  const onAir = onAirQuery?.data.data.results
  const airing = airingToday?.data?.data.results

  return (
    <Page safeAreaTop>
      {/* <AppHeader title="Search" /> */}
      <Box flexDirection="row" marginY={4} marginX={3} justifyContent="space-between">
        <Heading>Discover</Heading>
        {/* <IconButton
            onPress={onOpen}
            icon={<Icon as={<AntDesign name="filter" />} size="sm" color="white" />}
          /> */}
      </Box>
      <Box px="3">
        <SearchBar
          control={control}
          name="query"
          onSubmitEditing={() => {
            handleSubmit(searchShows)()
          }}
          onFocus={() => onSearchBlurFocus(true)}
          onBlur={() => {
            onSearchBlurFocus(false)
          }}
        />
      </Box>

      <Box flex={1}>
        {state.searchFocused || query.length > 0 ? (
          <Box position="absolute" height="100%" width="100%" bg="mainBg.500" zIndex={4}>
            <FlatGrid
              itemDimension={SEARCH_CARD_HEIGHT}
              data={state.results}
              renderItem={({ item, index }) => (
                <ShowCard
                  key={String(index)}
                  poster={getPosterForItem(item)}
                  title={item.name}
                  year={item.first_air_date}
                  size={SEARCH_CARD_HEIGHT}
                  onPress={() =>
                    navigation.navigate(routes.showDetails, {
                      tmdbId: item.id
                    })
                  }
                />
              )}
            />
          </Box>
        ) : null}

        <FlatList
          mb={3}
          data={[
            { id: '1', title: 'Popular', data: popular },
            {
              id: '2',
              title: 'Top Rated',
              data: topRated
            },
            {
              id: '3',
              title: 'New Epsiodes',
              data: onAir
            },
            {
              id: '4',
              title: 'Airing Today',
              data: airing
            }
          ]}
          keyExtractor={(item) => `row_${item.id}`}
          renderItem={({ item }) => {
            return <DiscoverSection data={item.data} title={item.title} />
          }}
        />
      </Box>
    </Page>
  )
}

export default Search

const styles = StyleSheet.create({})
