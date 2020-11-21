import React from 'react';
import { observer } from 'mobx-react';
import { useRootStore, useSelectedClub } from '../../hooks';

const ClubScroller = observer(() => {
  const { clubs } = useRootStore();
  const selected = useSelectedClub();

  return (
    <div className="bg-gray-200">
      <div className="shadow border-b border-gray-400">
        <div>
          <ul className="grid grid-gap-2 grid-cols-max grid-rows-1 grid-flow-col overflow-x-scroll border-b border-gray-500 divide-x divide-gray-300">
            {clubs.sortedByName.map(club => (
              <li
                key={club.id}
                className={`w-32 ${
                  selected.id === club.id
                    ? 'bg-gradient-to-b  from-blue-600 via-blue-700 to-blue-700 text-white text-shadow'
                    : 'bg-gradient-to-b  from-white via-white to-gray-300'
                }`}
                onClick={() => clubs.selectClub(club.id)}>
                <div className="flex flex-col items-center my-4 cursor-pointer">
                  <div>
                    <img className="h-20" alt={club.name} src={club.crestUrl} />
                  </div>
                  <div className="text-center mt-4 leading-tight">
                    <div className="font-medium whitespace-nowrap">
                      {club.shortName}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default ClubScroller;
