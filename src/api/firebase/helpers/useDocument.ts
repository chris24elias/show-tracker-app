import React, { useState, useEffect } from "react";
import { LogError } from "../../../utils/Logger";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { firestore } from "../../initFirebase";

interface UseDocumentProps {
  doc: string;
  collection: string;
}

interface Options {
  subscribe?: boolean;
}

const defaultOptions = {
  subscribe: false,
};

const useDocument = <T>(
  docPath: string,
  options?: Options
): { document: T; loading: boolean } => {
  const [document, setDocument] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { subscribe }: Options = { ...defaultOptions, ...options };

  const handleError = (error) => {
    setLoading(false);
    LogError("use document error", error);
  };

  useEffect(() => {
    const ref = doc(firestore, docPath);
    let unsubscribe = () => {};

    const handleData = (snapshot) => {
      const obj = { ...snapshot.data(), id: doc };
      setDocument(obj);
      setLoading(false);
    };

    if (subscribe) {
      unsubscribe = onSnapshot(ref, handleData, handleError);
    } else {
      getDoc(ref).then(handleData).catch(handleError);
    }

    return unsubscribe;
  }, [doc, subscribe]);

  return {
    document,
    loading,
  };
};

export default useDocument;
