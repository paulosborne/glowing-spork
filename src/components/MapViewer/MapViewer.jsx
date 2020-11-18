import React, { useEffect, useState } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { observer } from 'mobx-react';
import { useRootStore, useSelectedClub } from '../../hooks';

const MapWithAMarker = withScriptjs(
  withGoogleMap(
    observer(props => {
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
          await crimes.getCrimesAtLocation(
            date.getFullYear(),
            date.getMonth() + 1,
          );
          setLoaded(true);
        };

        getCrimes();
      }, [date, crimes, crimes.coordinates.longitude]);

      return (
        <div>
          {loaded && (
            <GoogleMap
              defaultZoom={17}
              defaultCenter={{
                lat: Number(crimes.coordinates.latitude),
                lng: Number(crimes.coordinates.longitude),
              }}>
              <MarkerClusterer
                key={1}
                averageCenter
                enableRetinaIcons
                gridSize={60}>
                {crimes.visible.map((crime, index) => (
                  <Marker
                    key={crime.id}
                    position={{
                      lat: Number(crime.location.latitude),
                      lng: Number(crime.location.longitude),
                    }}
                  />
                ))}
              </MarkerClusterer>
            </GoogleMap>
          )}
        </div>
      );
    }),
  ),
);

export default MapWithAMarker;
