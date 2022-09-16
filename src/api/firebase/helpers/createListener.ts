import {
  collection,
  DocumentData,
  CollectionReference,
  QuerySnapshot,
  onSnapshot,
  Query,
  where,
  query,
  orderBy as ORDERBY,
  limit as LIMIT,
} from "firebase/firestore";
import { Constraint, OrderBy } from ".";
import { firestore } from "../../initFirebase";

interface Options {
  constraints?: Constraint | Constraint[];
  limit?: number;
  orderBy?: OrderBy;
}

const createListener = (
  collectionPath: string,
  options: Options,
  callback: (data: any) => void
) => {
  const { limit = 0, constraints, orderBy } = options;

  if (!collectionPath) {
    console.warn("MUST SPECIFY COLLECTION NAME");
    return () => {};
  }

  const constructQuery = (): Query<DocumentData> => {
    let ref = collection(firestore, collectionPath);

    const arr = [];

    if (constraints) {
      if (Array.isArray(constraints)) {
        constraints.forEach((c) => {
          if (c) {
            arr.push(where(c.fieldPath, c.opStr, c.value));
          }
        });
      } else if (typeof query === "object") {
        arr.push(
          where(constraints.fieldPath, constraints.opStr, constraints.value)
        );
      }
    }

    if (orderBy) {
      arr.push(ORDERBY(orderBy.fieldPath, orderBy.directionStr));
    }
    if (limit) {
      arr.push(LIMIT(limit));
    }

    return query(ref, ...arr);
  };

  const handleData = (querySnapshot: QuerySnapshot) => {
    const items = querySnapshot?.docs.map((doc: any, index) => {
      const obj = doc.data();

      return {
        id: doc.id,
        ...obj,
      };
    });
    if (callback) {
      callback(items || []);
    }
  };

  const ref = constructQuery();

  const unsubscribe = onSnapshot(ref, handleData);

  return unsubscribe;
};

export default createListener;
