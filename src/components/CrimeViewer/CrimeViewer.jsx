import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import isEmpty from 'lodash.isempty';
import format from 'date-fns/format';
import { useRootStore, useSelectedClub } from '../../hooks';
import CrimeCard from '../CrimeCard/CrimeCard';
import CrimeTable from '../CrimeTable/CrimeTable';
import Panel from '../Panel/Panel';
import Loader from 'react-loader-spinner';

const CrimeViewer = observer(() => {
  const { crimes, date } = useRootStore();
  const [loaded, setLoaded] = useState(false);
  const club = useSelectedClub();

  useEffect(() => {
    const setLocation = async () =>
      await crimes.setCrimeLocation(club.postcode);
    setLocation();
  }, [crimes, club.postcode]);

  useEffect(() => {
    const getCrimes = async () => {
      setLoaded(false);
      await crimes.getCrimesAtLocation(date.getFullYear(), date.getMonth() + 1);
      setLoaded(true);
    };

    getCrimes();
  }, [date, crimes, crimes.coordinates.longitude]);

  return (
    <div>
      <div>
        {!loaded && (
          <Panel className="justify-center">
            <div>
              <Loader type="ThreeDots" height={20} width={30} color="gray" />
            </div>
          </Panel>
        )}

        {loaded && isEmpty(crimes.visible) && (
          <Panel className="justify-center">
            <div>No crimes reported for {format(date, 'MMMM YYY')}.</div>
          </Panel>
        )}

        <div className="flex flex-col md:hidden">
          {loaded &&
            crimes.visible.map((crime, index) => (
              <CrimeCard key={crime.id} crime={crime} />
            ))}
        </div>

        <div className="hidden md:flex">
          {loaded && !isEmpty(crimes.visible) && <CrimeTable />}
        </div>
      </div>
    </div>
  );
});

export default CrimeViewer;
