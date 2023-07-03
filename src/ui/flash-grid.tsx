import { FlashList } from '@shopify/flash-list'
import React from 'react'
import type { FlatGridProps } from 'react-native-super-grid'
import { FlatGrid } from 'react-native-super-grid'

const FlashGrid = (props: FlatGridProps) => {
  return <FlatGrid customFlatList={FlashList} estimatedItemSize={props.itemDimension} {...props} />
}

export { FlashGrid }
