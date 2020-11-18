import React from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from '../../hooks';

const CrimeTable = observer(() => {
  const { crimes } = useRootStore();
  return (
    <table className="table-fixed border-gray-500 w-full">
      <thead>
        <tr>
          <th className="bg-white border w-1/12">ID</th>
          <th className="bg-white border w-1/12">Month</th>
          <th className="bg-white border text-left pl-2 w-4/12">Category</th>
          <th className="bg-white border w-4/12 text-left pl-2">Street</th>
        </tr>
      </thead>
      <tbody className="text-sm bg-white">
        {crimes.visible.map((crime, index) => (
          <tr
            className={`${
              index % 2 === 0 ? 'bg-gray-300' : ''
            } border-b border-gray-400`}
            key={crime.id}>
            <td className="border-r border-l border-gray-400 text-center">
              {crime.id}
            </td>
            <td className="border-r border-gray-400 text-center">
              {crime.month}
            </td>
            <td className="border-r border-gray-400 pl-2">
              {crime.categoryName}
            </td>
            <td className="border-r pl-2">{crime.streetName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default CrimeTable;
