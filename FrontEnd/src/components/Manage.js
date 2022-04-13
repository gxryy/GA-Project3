import React from "react";
import { useParams } from "react-router-dom";

const Manage = () => {
  const params = useParams();
  console.log(params.id);

  return (
    <div>
      <h1>The booking ref is {params.id}</h1>
      <h1>Manage component</h1>
    </div>
  );
};

export default Manage;
