import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import create from 'zustand'
import { persist } from 'zustand/middleware'

import api from '../api'
import type { SavedShow } from '../utils/types'

interface DataStore {
  config:
    | {
        base_url: string
        poster_sizes: string[]
      }
    | undefined
  myShows: SavedShow[]
  setMyShows: (data: any) => void
  getImageConfig: () => void
}

const isFetching: React.MutableRefObject<boolean | null> = React.createRef()

const useDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      config: undefined,
      myShows: [],
      setMyShows: (data: any) => {
        set({
          myShows: data
        })
      },
      getImageConfig: async () => {
        try {
          const result = await api.getImageApiConfig()
          // console.log("IMAGE CONFIG RESULT", result.data);
          // const { base_url, poster_sizes } = result.data.images;
          set({
            config: result.data.images
          })
        } catch (error) {
          console.log('error getting image config', error)
        }
      }
    }),
    {
      name: 'Data-storage', // unique name
      getStorage: () => AsyncStorage, // (optional) by default the 'localStorage' is used
      onRehydrateStorage: () => {
        return () => {}
      }
    }
  )
)

// const logError = (error) => {
//   if (error.response) {
//     // The request was made and the server responded with a status code
//     // that falls out of the range of 2xx
//     console.log(error.response.data);
//     console.log(error.response.status);
//     console.log(error.response.headers);
//   } else if (error.request) {
//     // The request was made but no response was received
//     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//     // http.ClientRequest in node.js
//     console.log(error.request);
//   } else {
//     // Something happened in setting up the request that triggered an Error
//     console.log("Error", error.message);
//   }
//   console.log(error.config);
// };

export default useDataStore
useDataStore.getState().getImageConfig()
