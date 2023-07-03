import type { User } from 'firebase/auth'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

import { auth, firestore } from '../api/initFirebase'
import { LogError, LogState } from '../utils/Logger'

interface AuthStore {
  user: User | null | false
  remoteConfig: any
  checkAuth: (user: User | null) => Promise<any>
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<any>
  signup: (name: string, email: string, password: string) => Promise<any>
  changePassword: (newPassword: string, confimPassword: string) => Promise<any>
}

// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().checkAuth(user)
})

const useAuthStore = create<AuthStore>()(
  devtools(
    subscribeWithSelector(
      ///
      (set, get) => ({
        user: null,
        remoteConfig: undefined,

        checkAuth: async (user) => {
          // Log('checking auth');
          // const user = await api.auth.isLoggedIn();
          LogState('checked auth', user)
          if (user !== null) {
            set({
              user
            })
          } else {
            set({
              user: false
            })
          }
        },
        login: async (email, password) => {
          try {
            LogState('attempting login')
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            if (!userCredentials) {
              return Promise.reject(new Error('Something went wrong'))
            }
            LogState('login succuessful', userCredentials)

            set({
              user: userCredentials.user
            })
            return Promise.resolve(true)
          } catch (error) {
            return Promise.reject(new Error(error))
          }
        },
        logout: async () => {
          try {
            // logout from firebase
            LogState('logging out')
            await signOut(auth)
            LogState('log out successful')
            set({
              user: false
            })
          } catch (error) {
            LogError('log out error', error)
          }
        },
        signup: async (name, email, password) => {
          try {
            // validate info
            LogState('signing up user')
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            LogState('sign up successful', userCredentials)

            LogState('intializing user')

            const docRef = doc(firestore, `users/${userCredentials.user.uid}`)
            setDoc(docRef, {
              name,
              email,
              signed_up_at: serverTimestamp()
            })

            set({
              user: userCredentials.user
            })

            return Promise.resolve(true)
          } catch (error) {
            LogError('ERROR SIGNING UP ', error)
            return Promise.reject(new Error(error))
          }
        },
        changePassword: async (newPassword, confirmPassword) => {}
      })
    )
  )
)

export default useAuthStore
