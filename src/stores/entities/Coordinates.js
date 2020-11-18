import { types } from 'mobx-state-tree';

const Coordinates = types
  .model('Coordinates', {
    longitude: types.maybeNull(types.number),
    latitude: types.maybeNull(types.number),
  })
  .views(self => ({
    get isValid() {
      return self.longitude !== null && self.latitude !== null;
    },
  }))
  .actions(self => ({
    setLongitude(value) {
      self.longitude = value;
    },
    setLatitude(value) {
      self.latitude = value;
    },
  }));

export default Coordinates;
