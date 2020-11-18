import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import isEmpty from 'lodash.isempty';
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
    <div className="flex flex-col w-full sm:flex-row">
      <div className="flex-1">
        {!loaded && (
          <Panel className="m-1 justify-center">
            <div>
              <Loader type="ThreeDots" height={20} width={30} color="gray" />
            </div>
          </Panel>
        )}

        {loaded && isEmpty(crimes.visible) && (
          <Panel className="m-1 justify-center">
            <div>No crimes reported for this period.</div>
          </Panel>
        )}

        <div className="flex flex-col md:hidden">
          {loaded &&
            crimes.visible.map((crime, index) => (
              <CrimeCard key={crime.id} crime={crime} />
            ))}
        </div>

        <div className="hidden md:flex m-1">
          {loaded && !isEmpty(crimes.visible) && <CrimeTable />}
        </div>
      </div>
    </div>
  );
});

export default CrimeViewer;
