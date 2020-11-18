import { types } from 'mobx-state-tree';

const CrimeLocation = types.model('CrimeLocation', {
  latitude: types.string,
  longitude: types.string,
  street: types.model({
    name: types.string,
  }),
});

export default CrimeLocation;
