import { types } from 'mobx-state-tree';
import { match } from 'postcode';

const Club = types
  .model('Club', {
    id: types.identifierNumber,
    name: types.string,
    shortName: types.string,
    crestUrl: types.string,
    address: types.string,
    founded: types.maybeNull(types.number),
    clubColors: types.string,
    venue: types.string,
  })
  .views(self => ({
    get postcode() {
      return match(self.address)[0];
    },
  }));

export default Club;
