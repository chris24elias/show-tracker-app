// import { useEffect, useState } from "react";
// import api from "../api";
// import { TraktShowObjectDetails } from "../utils/types";

// const useTraktShowDetails = (traktId: string | number) => {
//   const [showDetails, setShowDetails] = useState<
//     TraktShowObjectDetails | undefined
//   >(undefined);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (traktId) {
//       try {
//         api.getShowDetails(traktId).then((response) => {
//           setShowDetails(response.data);
//           setLoading(false);
//         });
//       } catch (error) {
//         setLoading(false);
//       }
//     }
//   }, [traktId]);

//   return {
//     data: showDetails,
//     loading,
//   };
// };

// export default useTraktShowDetails;
