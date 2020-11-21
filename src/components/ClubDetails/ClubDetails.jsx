import React from 'react';
import { observer } from 'mobx-react';
import isEmpty from 'lodash.isempty';
import { useSelectedClub } from '../../hooks';

const ClubDetails = observer(() => {
  const club = useSelectedClub();

  return !isEmpty(club) ? (
    <div className="flex border-b border-gray-400  bg-white px-3 py-6">
      <div className="mr-3">
        <img className="h-16" alt={`${club.name} logo`} src={club.crestUrl} />
      </div>
      <div className="leading-tight flex flex-col justify-center">
        <div className="text-2xl font-bold">{club.name}</div>
        <div className="text-sm">
          <div>{club.venue}</div>
          <div>{club.address}</div>
        </div>
      </div>
    </div>
  ) : null;
});

export default ClubDetails;
