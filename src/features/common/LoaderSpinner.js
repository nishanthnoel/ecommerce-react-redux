// Spinner.jsx
// export default function LoaderSpinner() {
//   return (
//     <div className="sk-chase relative w-10 h-10 animate-sk-chase">
//       {[...Array(6)].map((_, i) => (
//         <div
//           key={i}
//           className={`sk-chase-dot absolute left-0 top-0 w-full h-full animate-sk-chase-dot`}
//           style={{ animationDelay: `${-1.1 + i * 0.1}s` }}
//         >
//           <div
//             className="absolute w-1/4 h-1/4 bg-white rounded-full animate-sk-chase-dot-before"
//             style={{ animationDelay: `${-1.1 + i * 0.1}s` }}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

import React from "react";
import { Grid } from "react-loader-spinner";

const Loader = () => {
  return (
    // Tailwind classes for positioning, centering, z-index, and background
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
      <Grid
        height="80"
        width="80"
        color="rgb(79, 70, 229)"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
