import React from 'react';
import { observer } from 'mobx-react';
import isEmpty from 'lodash.isempty';
import { useRootStore, useSelectedClub } from '../../hooks';

const ClubPicker = observer(() => {
  const { clubs } = useRootStore();
  const club = useSelectedClub();

  const handleChangeClub = ({ target: { value } }) => {
    clubs.selectClub(Number(value));
  };

  return (
    <div>
      <select value={isEmpty(club) ? '' : club.id} onChange={handleChangeClub}>
        <option value="0">Select Club</option>
        {clubs.sortedByName.map(team => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
    </div>
  );
});

export default ClubPicker;
