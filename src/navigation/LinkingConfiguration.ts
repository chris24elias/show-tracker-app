import * as Linking from 'expo-linking'

import routes from './routes'

export default {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      [routes.root]: {
        screens: {
          [routes.watchingTab]: {
            screens: {
              [routes.watching]: 'watching'
            }
          },
          [routes.searchTab]: {
            screens: {
              [routes.search]: 'search'
            }
          }
        }
      }
    }
  }
}
