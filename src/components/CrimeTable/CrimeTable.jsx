import React from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from '../../hooks';
import isEmpty from 'lodash.isempty';

const CrimeTable = observer(() => {
  const { crimes } = useRootStore();
  return (
    <div className="w-full">
      <div className="overflow-hidden border-b border-gray-400">
        <table className="min-w-full divide-y divide-gray-400">
          <thead>
            <tr className="bg-white divide-x divide-gray-300  text-xs text-gray-600 uppercase tracking-wider">
              <th className="px-3 py-2 font-medium w-32 border-l">Case ID</th>
              <th className="px-3 py-2 font-medium text-left">Case Details</th>
            </tr>
          </thead>
          <tbody className="text-sm bg-white divide-y divide-x divide-gray-300">
            {crimes.visible.map((crime, index) => (
              <tr
                className={`${index % 2 === 0 ? 'bg-gray-200' : ''} divide-x`}
                key={crime.id}>
                <td className="px-3 py-3 text-center">{crime.id}</td>
                <td className="pl-2">
                  <div className="flex items-center">
                    <div className="flex flex-col flex-1 leading-snug">
                      <div>{crime.categoryName}</div>
                      <div className="text-gray-600">{crime.streetName}</div>
                    </div>
                    {!isEmpty(crime.outcomeCategory) && (
                      <div className="bg-orange-500 py-1 px-2 text-white shadow border-b border-orange-600 uppercase text-xs font-medium rounded-full">
                        {crime.outcomeCategory}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default CrimeTable;
