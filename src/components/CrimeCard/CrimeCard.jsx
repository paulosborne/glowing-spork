import React from 'react';
import isEmpty from 'lodash.isempty';

const CrimeCard = ({ crime }) => (
  <div className="flex flex-col md:flex-row justify-between bg-white p-2 mb-1 border border-gray-400">
    <div>
      <strong>ID:</strong> {crime.id}
    </div>
    <div>
      <strong>Month:</strong> {crime.month}
    </div>
    <div>
      <strong>Category:</strong>
      {crime.categoryName}
    </div>
    <div>
      <strong>Street</strong>: {crime.streetName}
    </div>
    <div>
      <strong>Outcome:</strong>
      {!isEmpty(crime.outcomeCategory) ? crime.outcomeCategory : 'Unknown'}
    </div>
  </div>
);

export default CrimeCard;
