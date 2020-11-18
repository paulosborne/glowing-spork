import { getRoot, types } from 'mobx-state-tree';
import CrimeLocation from './CrimeLocation';
import get from 'lodash.get';

const Crime = types
  .model('Crime', {
    id: types.identifierNumber,
    category: types.string,
    location_type: types.string,
    location: CrimeLocation,
    context: types.string,
    month: types.string,
    outcome_status: types.maybeNull(
      types.model({
        category: types.string,
        date: types.string,
      }),
    ),
  })
  .views(self => ({
    get streetName() {
      return get(self, 'location.street.name');
    },
    get categoryName() {
      const { crimes } = getRoot(self);
      return crimes.categories.get(self.category).name;
    },
    get outcomeCategory() {
      return get(self, 'outcome_status.category', '');
    },
  }));

export default Crime;
