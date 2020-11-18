import { useEffect } from 'react';
import { observer } from 'mobx-react';
import isEmpty from 'lodash.isempty';
import { useRootStore } from './hooks';
import {
  ClubDetails,
  CrimeCategories,
  CrimeViewer,
  Header,
  WelcomeScreen,
  MapViewer,
} from './components';

const { REACT_APP_GOOGLE_API_KEY } = process.env;

export default observer(() => {
  const { date, clubs, crimes } = useRootStore();
  const year = date.getFullYear();
  const month = date.getMonth();

  useEffect(() => {
    const fetchTeams = async () => {
      await clubs.fetchByCompetitionId(2021, year);
      await crimes.getCrimeCategories(year, month + 1);
    };
    fetchTeams();
  }, [clubs, year, month, crimes]);

  return (
    <div className="bg-gray-200 h-screen">
      <Header />
      {!isEmpty(clubs.selected) && (
        <div className="flex flex-col h-screen">
          <div>
            <ClubDetails />
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full bg-white sm:w-64">
              <CrimeCategories />
            </div>
            <div className="w-full">
              <MapViewer
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `410px` }} />}
                containerElement={<div style={{ height: `410px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
              <div className="flex">
                <CrimeViewer />
              </div>
            </div>
          </div>
        </div>
      )}
      {isEmpty(clubs.selected) && <WelcomeScreen />}
    </div>
  );
});
