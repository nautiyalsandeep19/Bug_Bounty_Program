import React from 'react';
import Scope from './Scope';
import { useSelector } from 'react-redux';

const Policy = () => {

  const policyDetails = useSelector((state)=>state.program.programData?.policy)

  return (
    <>
    <div className="space-y-6 text-gray-800 ">
         
         {
          policyDetails ? <p>{policyDetails}</p> :"no policy found"
         }
         </div>
    <Scope/>
    </>
  );
};

export default Policy;
