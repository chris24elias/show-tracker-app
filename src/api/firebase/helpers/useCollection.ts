import type {
  CollectionReference,
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot
} from 'firebase/firestore'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { useEffect, useRef } from 'react'

import useSetState from '../../../hooks/useSetState'
import { firestore } from '../../initFirebase'
import type { OrderBy, Query } from '.'

interface Options {
  subscribe: boolean
  query?: Query | Query[]
  limit?: number
  orderBy?: OrderBy
}

const defaultOptions: Options = {
  subscribe: false
}

interface State {
  data: any[]
  loading: boolean
  isEnd: boolean
}

const useCollection = (collectionPath: string, options?: Options) => {
  const [state, setState] = useSetState<State>({
    data: [],
    loading: false,
    isEnd: false
  })
  const { data, loading, isEnd } = state
  const finalOptions = { ...defaultOptions, ...options }
  const { limit = 0, query, subscribe, orderBy } = finalOptions
  const unSubRef = useRef<any>(null)
  const lastDocRef = useRef<DocumentSnapshot | null>(null)

  useEffect(() => {
    getData()
    return () => {
      if (unSubRef.current) {
        const unsub = unSubRef.current
        unsub()
      }
    }
  }, []); //eslint-disable-line

  const getData = (startAfter: DocumentSnapshot | null = null, append = false) => {
    if (!collectionPath) {
      console.warn('MUST SPECIFY COLLECTION NAME')
      return
    }
    setState({
      loading: true
    })
    try {
      const ref = constructQuery(startAfter)

      if (subscribe) {
        const unsubscribe = onSnapshot(ref, (querySnapshot) => {
          handleData(querySnapshot, append)
        })
        unSubRef.current = unsubscribe
      } else {
        getDocs(ref).then((querySnapshot) => {
          handleData(querySnapshot, append)
        })
      }
    } catch (error) {
      console.warn('ERROR', error)
      setState({
        loading: false
      })
    }
  }

  const constructQuery = (
    startAfter: DocumentSnapshot | null = null
  ): CollectionReference<DocumentData> => {
    let ref: any = collection(firestore, collectionPath)

    if (query) {
      if (Array.isArray(query)) {
        query.forEach((q) => {
          if (q) {
            ref = ref.where(q.fieldPath, q.opStr, q.value)
          }
        })
      } else if (typeof query === 'object') {
        ref = ref.where(query.fieldPath, query.opStr, query.value)
      }
    }

    if (orderBy) {
      ref = ref.orderBy(orderBy.fieldPath, orderBy.directionStr)
    }
    if (limit) {
      ref = ref.limit(limit)
    }

    if (startAfter) {
      ref = ref.startAfter(startAfter)
    }
    return ref
  }

  const handleData = (querySnapshot: QuerySnapshot, append: boolean) => {
    const items = querySnapshot?.docs.map((doc: any, index) => {
      const obj = doc.data()
      if (index === querySnapshot.size - 1) {
        lastDocRef.current = doc
      }
      return {
        id: doc.id,
        ...obj
      }
    })

    let newData: any[] = []
    if (append) {
      newData = [...data, ...items]
    } else {
      newData = items
    }

    setState({
      data: newData,
      loading: false,
      isEnd: items.length < limit
    })
  }

  // ACTIONS

  const refresh = () => {
    getData()
  }

  const getNext = () => {
    if (isEnd) {
      console.warn('END REACHED, no more items to fetch')
      return
    }
    getData(lastDocRef.current, true)
  }

  return {
    data,
    loading,
    refresh,
    getNext,
    isEnd
  }
}

export default useCollection
