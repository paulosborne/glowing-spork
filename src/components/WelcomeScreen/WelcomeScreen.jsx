import React from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from '../../hooks';

const WelcomeScreen = observer(() => {
  const { clubs } = useRootStore();

  return (
    <div className="mx-3 p-3 ">
      <div className="text-xl text-gray-800 mb-3">
        To begin, please select a club.
      </div>
      <div className="bg-white border border-gray-400 shadow-sm flex flex-wrap items-center justify-between space-y-4 px-3 py-4">
        {clubs.sortedByName.map(club => (
          <div
            key={club.id}
            className="w-32 py-3"
            onClick={() => clubs.selectClub(club.id)}>
            <img alt={club.name} src={club.crestUrl} />
          </div>
        ))}
      </div>
    </div>
  );
});

export default WelcomeScreen;
