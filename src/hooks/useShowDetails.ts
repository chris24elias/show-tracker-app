import { useEffect, useState } from 'react';
import api from '../api';
import { TMDBShowDetails } from '../utils/types';

const useShowDetails = (tmdbId: number) => {
  const [showDetails, setShowDetails] = useState<TMDBShowDetails>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tmdbId) {
      try {
        api.getTmdbShowDetails(tmdbId).then((response) => {
          setShowDetails(response.data);
          setLoading(false);
        });
      } catch (error) {
        setLoading(false);
      }
    }
  }, [tmdbId]);

  return {
    data: showDetails,
    loading
  };
};

export default useShowDetails;
