import { Box, FlatList, Text } from 'native-base'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'

interface TopTabsProps {
  selectedFilter: string
  onFilterChange: (filter: string) => void
}

const TopTabs: React.FC<TopTabsProps> = ({ selectedFilter, onFilterChange }) => {
  const tabs = ['All', 'Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch']
  return (
    <Box>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={tabs}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 5
        }}
        extraData={selectedFilter}
        keyExtractor={({ item }, index) => String(index)}
        renderItem={({ item }) => {
          const isSelected = selectedFilter === item
          return (
            <Pressable onPress={() => onFilterChange(item)}>
              <Box
                marginX={1}
                borderRadius={12}
                borderWidth={1}
                borderColor="primary.500"
                padding={3}
                bg={isSelected ? 'secondary.500' : 'transparent'}
              >
                <Text>{item}</Text>
              </Box>
            </Pressable>
          )
        }}
      />
    </Box>
  )
}

export default TopTabs

const styles = StyleSheet.create({})
