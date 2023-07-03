import { CheckIcon, Select } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'

import type { SavedShowStatus } from '../../utils/types'

interface ShowStatusProps {
  status: SavedShowStatus
  onStatusChange: any
}
// 'watching' | 'completed' | 'on hold' | 'dropped' | 'plan to watch';

const ShowStatus: React.FC<ShowStatusProps> = ({ status, onStatusChange }) => {
  return (
    <Select
      // alignSelf="center"
      selectedValue={status}
      width={150}
      // minWidth={200}
      // accessibilityLabel="Select your favorite programming language"
      h={'12'}
      placeholder="Select..."
      borderColor="secondary.500"
      onValueChange={(itemValue) => onStatusChange(itemValue)}
      _selectedItem={{
        bg: 'secondary.500',
        endIcon: <CheckIcon size={4} color="white" />
      }}
      fontSize={'md'}
      fontWeight="semibold"
    >
      <Select.Item label="Watching" value="watching" />
      <Select.Item label="Completed" value="completed" />
      <Select.Item label="On Hold" value="on hold" />
      <Select.Item label="Dropped" value="dropped" />
      <Select.Item label="Plan to Watch" value="plan to watch" />
    </Select>
  )
}

export default ShowStatus

const styles = StyleSheet.create({})
