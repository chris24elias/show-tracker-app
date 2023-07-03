import type {
  DocumentData,
  FieldPath,
  Query,
  QueryConstraint,
  QuerySnapshot,
  WhereFilterOp
} from 'firebase/firestore'
import {
  collection,
  limit as LIMIT,
  onSnapshot,
  orderBy as ORDERBY,
  query,
  where
} from 'firebase/firestore'

import { firestore } from '../../initFirebase'
import type { Constraint, OrderBy } from '.'

interface Options {
  constraints?: Constraint | Constraint[]
  limit?: number
  orderBy?: OrderBy
}

const createListener = (
  collectionPath: string,
  options: Options,
  callback: (data: any) => void
) => {
  const { limit = 0, constraints, orderBy } = options

  if (!collectionPath) {
    console.warn('MUST SPECIFY COLLECTION NAME')
    return () => {}
  }

  const constructQuery = (): Query<DocumentData> => {
    let ref = collection(firestore, collectionPath)

    const arr = []

    if (constraints) {
      if (Array.isArray(constraints)) {
        constraints.forEach((c) => {
          if (c) {
            arr.push(where(c.fieldPath, c.opStr, c.value))
          }
        })
      } else if (typeof query === 'object') {
        arr.push(where(constraints.fieldPath, constraints.opStr, constraints.value))
      }
    }

    if (orderBy) {
      arr.push(ORDERBY(orderBy.fieldPath, orderBy.directionStr))
    }
    if (limit) {
      arr.push(LIMIT(limit))
    }

    return query(ref, ...arr)
  }

  const handleData = (querySnapshot: QuerySnapshot) => {
    const items = querySnapshot?.docs.map((doc: any, index) => {
      const obj = doc.data()

      return {
        id: doc.id,
        ...obj
      }
    })
    if (callback) {
      callback(items || [])
    }
  }

  const ref = constructQuery()

  const unsubscribe = onSnapshot(ref, handleData)

  return unsubscribe
}

export default createListener

class CollectionListener {
  ref
  constraints: QueryConstraint[] = []

  constructor(path: string) {
    this.ref = collection(firestore, path)
  }

  where(fieldPath: string, opStr: WhereFilterOp, value: any) {
    this.constraints.push(where(fieldPath, opStr, value))
    return this
  }

  orderBy(fieldPath: string | FieldPath, directionStr?: 'asc' | 'desc' | undefined) {
    this.constraints.push(ORDERBY(fieldPath, directionStr))
    return this
  }

  limit(n: number) {
    this.constraints.push(LIMIT(n))
    return this
  }

  subscribe(callback: (data: any) => void) {
    const handleData = (querySnapshot: QuerySnapshot) => {
      const items = querySnapshot?.docs.map((doc: any, index) => {
        const obj = doc.data()

        return {
          id: doc.id,
          ...obj
        }
      })
      if (callback) {
        callback(items || [])
      }
    }

    const ref = query(this.ref, ...this.constraints)

    const unsubscribe = onSnapshot(ref, handleData)
    return unsubscribe
  }
}

export const createListener2 = (collectionPath: string) => {
  return new CollectionListener(collectionPath)
}

// const ref = collection(firestore, "savedShows");
// const q = query(
//   ref,
//   where("owner", "==", "123123123"),
//   orderBy("name", "asc"),
//   limit(10)
// );
// const unsub = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
//   const items = querySnapshot?.docs.map((doc: any, index) => {
//     const obj = doc.data();
//     return {
//       id: doc.id,
//       ...obj,
//     };
//   });
//   console.log("test", items);
// });

// const unsub2 = createListener2("savedShows")
//   .where("owner", "==", "123123123")
//   .orderBy("name", "asc")
//   .limit(10)
//   .subscribe((data) => console.log("Test", data));
