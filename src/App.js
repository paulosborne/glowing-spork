import { useEffect } from 'react';
import { observer } from 'mobx-react';
import isEmpty from 'lodash.isempty';
import { useRootStore } from './hooks';
import {
  ClubDetails,
  CrimeViewer,
  CrimeCategories,
  Header,
  MapViewer,
  MonthNavigator,
  ClubScroller,
} from './components';
import { format } from 'date-fns';

const { REACT_APP_GOOGLE_API_KEY } = process.env;

export default observer(() => {
  const { date, clubs, crimes } = useRootStore();
  const year = date.getFullYear();
  const month = date.getMonth();

  useEffect(() => {
    const fetchTeams = async () => {
      await clubs.fetchByCompetitionId(2021, year);
      await crimes.getCrimeCategories(year, month + 1);
      if (clubs.selected === null) {
        clubs.selectRandom();
      }
    };
    fetchTeams();
  }, [clubs, year, month, crimes]);

  return (
    <div className="bg-gray-200 h-screen">
      <Header />
      {!isEmpty(clubs.selected) && (
        <div>
          <ClubScroller />
          <MonthNavigator />

          <div className="flex">
            <div className="w-full">
              <div className="border-b border-gray-400">
                <ClubDetails />
                <div
                  className={`${crimes.frequencyColor} text-center text-white text-lg border-b border-gray-500 py-1 px-4 font-medium`}>
                  {crimes.data.length} crimes were committed in{' '}
                  {format(date, 'MMMM yyyy')}
                </div>
              </div>
              <div className="border-b border-gray-400">
                <MapViewer
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                  loadingElement={<div style={{ height: `300px` }} />}
                  containerElement={<div style={{ height: `300px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </div>
              <div className="flex">
                <div className="hidden sm:flex">
                  <CrimeCategories />
                </div>
                <div className="flex-1">
                  <CrimeViewer />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
