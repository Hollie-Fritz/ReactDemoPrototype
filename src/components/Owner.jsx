// import React from 'react'

// let Owner = () => {

//     return (
//         <>
//         <div> hello you are an owner</div>
//         </>
//     )
// }

// export default Owner;

import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import PersistResForm from "../owner/PersistResForm";

function Owner() {
  return (
    <div className="Owner">
      <PersistResForm />
    </div>
  );
}
export default Owner;
