import React from 'react'
import { ActivityIndicator } from 'react-native'

import { Page } from '../theme'
import AppHeader from './AppHeader'

interface PageLoaderProps {
  title?: string
}

const PageLoader: React.FC<PageLoaderProps> = ({ title = '' }) => {
  return (
    <Page>
      <AppHeader showBack title={title} />
      <ActivityIndicator style={{ flex: 1, alignSelf: 'center' }} />
    </Page>
  )
}

export default PageLoader
