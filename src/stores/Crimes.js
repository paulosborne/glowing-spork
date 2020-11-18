import { flow, types } from 'mobx-state-tree';
import Crime from './entities/Crime';
import CrimeCategory from './entities/CrimeCategory';
import PoliceData from '../services/PoliceData';
import PostCodeIO from '../services/PostCodeIO';
import Coordinates from './entities/Coordinates';

const Crimes = types
  .model('Crimes', {
    data: types.optional(types.array(Crime), []),
    categories: types.optional(types.map(CrimeCategory), {}),
    postcode: types.maybeNull(types.string),
    coordinates: types.optional(Coordinates, {}),
  })
  .views(self => ({
    get categoryList() {
      return Array.from(self.categories.values());
    },
    get selectedCategories() {
      return Array.from(self.categories.values())
        .filter(({ selected }) => selected)
        .map(({ url }) => url);
    },
    get visible() {
      return self.data.filter(crime =>
        self.selectedCategories.includes(crime.category),
      );
    },
  }))
  .actions(self => ({
    /**
     * Sets the coordinates
     * @param {object} params
     * @param {number} params.longitude
     * @param {number} params.latitude
     */
    setCoordinates({ longitude, latitude } = {}) {
      self.coordinates.setLatitude(latitude);
      self.coordinates.setLongitude(longitude);
    },

    /**
     * Gets additional information about a postcode
     * @param {string} postcode
     */
    getCoordinates: flow(function* (postcode) {
      const { data } = yield PostCodeIO.get(`/postcodes/${postcode}`);
      self.setCoordinates(data.result);
    }),

    /**
     * Fetches all crimes at the given coordinates for the given date.
     * @param {string} month
     * @param {number} longitude
     * @param {number} latitude
     */
    getCrimesAtLocation: flow(function* (year, month) {
      if (!self.coordinates.isValid) {
        return;
      }
      try {
        const { data } = yield PoliceData.get('/crimes-at-location', {
          params: {
            date: `${year}-${month}`,
            lng: self.coordinates.longitude,
            lat: self.coordinates.latitude,
          },
        });
        self.data.replace(data);
      } catch (err) {
        console.log({ err });
      }
    }),

    /**
     * Fetches the crime categories for the given year & month
     * @param {number} year
     * @param {number} month
     */
    getCrimeCategories: flow(function* (year, month) {
      const { data } = yield PoliceData.get(
        `/crime-categories?date=${year}-${month}`,
      );

      self.categories.clear();
      data.forEach(datum => self.categories.set(datum.url, datum));
    }),

    /**
     * Returns the category matching the given url
     * @param {string} url
     */
    getCategory(url) {
      return self.categories.get(url);
    },

    /**
     * Sets the current location for crime
     * @param {string} postcode
     */
    setCrimeLocation: flow(function* (postcode) {
      yield self.getCoordinates(postcode);
    }),
  }));

export default Crimes;
